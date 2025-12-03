"use client";
import { useState, useEffect, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import { appointmentActions } from "@/store/slices/appointmentSlice";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import { DayPicker } from "react-day-picker";
import { formatDate } from "@/lib/utils/formatDate";
import { convertStringToDateType } from "@/lib/utils/convertStringToDateType";
import { getItemsByUserId } from "@/lib/api/getItemsByUserId";
import styles from './Appointments.module.css';

import 'react-day-picker/dist/style.css';

const resetToMidnight = (d: Date) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

const addDays = (d: Date, days: number) => {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
};

const Calendar: React.FC = () => {
  const { selectedTerm } = useAppSelector((state: RootState) => state?.appointment);
  const { actionBarberId } = useAppSelector((state: RootState) => state?.barber);

  let initialState: Date;
  if (!selectedTerm.date) {
    initialState = new Date();
  } else {
    const dateToParse = selectedTerm?.date ? selectedTerm.date.split('/').reverse().join('-') : null;
    const { date } = dateToParse ? convertStringToDateType({ date: dateToParse }) : { date: new Date() };
    initialState = date as Date;
  }

  const [selected, setSelected] = useState<Date | undefined>(initialState);
  const [visibleMonth, setVisibleMonth] = useState<Date>(new Date(initialState.getFullYear(), initialState.getMonth(), 1));

  // raw items from API (period definitions the barber set as non-working or working, depending on your backend)
  const [rawItems, setRawItems] = useState<any[]>([]);
  // realDays = array of { start_date: Date, end_date: Date } that represent working periods (or non-working depending on your API)
  const [realDays, setRealDays] = useState<{ start_date: Date; end_date: Date }[]>([]);

  // Optionally, fully booked dates (days on which all slots are booked). Fill this from API if you have it.
  const [fullyBookedDates, setFullyBookedDates] = useState<Date[]>([]);

  const dispatch = useAppDispatch();
  const today = resetToMidnight(new Date());
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  maxDate.setHours(23, 59, 59, 999);

  // load periods and optionally fullyBookedDates
  useEffect(() => {
    const getHours = async () => {
      if (!actionBarberId) {
        setRawItems([]);
        setRealDays([]);
        return;
      }

      const response: any = await getItemsByUserId({ userId: actionBarberId, date: '' }, 'GET_WORKING_HOURS_BY_USER_ID');
      const items = response?.data ?? [];
      setRawItems(items);

      const periods = items.flatMap((period: any) => {
        const { start_date } = convertStringToDateType({ start_date: period.start_date });
        const { end_date } = convertStringToDateType({ end_date: period.end_date });
        if (start_date && end_date && (start_date >= today || end_date >= today)) {
          return [{ start_date: resetToMidnight(start_date), end_date: resetToMidnight(end_date) }];
        }
        return [];
      });

      setRealDays(periods);

      // --- OPTIONAL: load fullyBookedDates here if you have endpoint ---
      // Example:
      // const bookedRes: any = await getItemsByUserId({ userId: actionBarberId }, 'GET_FULLY_BOOKED_DATES_BY_USER_ID');
      // const bookedDates: Date[] = (bookedRes?.data ?? []).map((d: string) => resetToMidnight(new Date(d)));
      // setFullyBookedDates(bookedDates);

    };

    getHours();
    setIsLoadingState(false, dispatch);
  }, [actionBarberId]);

  // Build a Set of available dates (strings 'YYYY-MM-DD' or ISO) for O(1) lookup
  const availableSet = useMemo(() => {
    const s = new Set<string>();
    for (const interval of realDays) {
      let cur = resetToMidnight(interval.start_date);
      const end = resetToMidnight(interval.end_date);
      while (cur.getTime() <= end.getTime()) {
        s.add(cur.toISOString().slice(0, 10)); // use YYYY-MM-DD for compactness
        cur = addDays(cur, 1);
      }
    }
    return s;
  }, [realDays]);

  // Set of fully booked strings for lookup
  const fullyBookedSet = useMemo(() => {
    const s = new Set<string>();
    for (const d of fullyBookedDates) {
      s.add(resetToMidnight(d).toISOString().slice(0, 10));
    }
    return s;
  }, [fullyBookedDates]);

  // disabled predicate for DayPicker
  const isDateDisabled = (date: Date): boolean => {
    const d = resetToMidnight(date);
    const key = d.toISOString().slice(0, 10);

    // always disable outside allowed window
    if (d < today || d > maxDate) return true;

    // If we have any available periods defined, only dates inside them are allowed
    if (availableSet.size > 0) {
      // if date is not inside any available interval => disabled
      if (!availableSet.has(key)) return true;
    } else {
      // if no available periods defined at all, we can decide policy:
      // - disable all dates, or
      // - allow all dates within horizon
      // I'll default to disabling all (safer). Change if you prefer opposite.
      return true;
    }

    // If date is marked fully booked, disable
    if (fullyBookedSet.has(key)) return true;

    // otherwise it's enabled
    return false;
  };

  // Proveri da li je selected datum validan (u dozvoljenom opsegu i ne disabled)
  const isValidSelected = (date: Date | undefined): boolean => {
    if (!date) return false;
    const d = resetToMidnight(date);
    return !(d < today) && !(d > maxDate) && !isDateDisabled(d);
  };

  // Proveri da li je selected datum u trenutno vidljivom mesecu
  const isSelectedInVisibleMonth = (date: Date | undefined): boolean => {
    if (!date) return false;
    return date.getMonth() === visibleMonth.getMonth() &&
      date.getFullYear() === visibleMonth.getFullYear();
  };

  const validSelected = useMemo(() => {
    if (!isValidSelected(selected)) return undefined;
    if (!isSelectedInVisibleMonth(selected)) return undefined;
    return selected;
  }, [selected, visibleMonth, availableSet, fullyBookedSet]);

  const fullDate = validSelected ? formatDate(validSelected) : null;

  useEffect(() => {
    if (fullDate) {
      dispatch(appointmentActions.setSelectedTerm({ ...selectedTerm, date: fullDate }));
    }
  }, [fullDate]);

  const handleSelect = (date: Date | undefined) => {
    if (date && !isDateDisabled(date)) {
      setSelected(date);
    } else {
      setSelected(undefined);
    }
  };

  const isActuallySelected = (date: Date): boolean => {
    if (!validSelected) return false;
    const dateToCheck = resetToMidnight(date).toISOString().slice(0, 10);
    const selectedToCheck = resetToMidnight(validSelected).toISOString().slice(0, 10);
    return dateToCheck === selectedToCheck && !isDateDisabled(date);
  };

  return (
    <DayPicker
      mode="single"
      selected={validSelected}
      onSelect={handleSelect}
      month={visibleMonth}
      onMonthChange={setVisibleMonth}
      disabled={isDateDisabled}
      modifiers={{
        actuallySelected: isActuallySelected
      }}
      modifiersClassNames={{
        actuallySelected: styles.selected
      }}
      required
      captionLayout="label"
      footer={
        validSelected ? `Izabrani datum: ${fullDate}` : "Izaberite datum."
      }
      classNames={{
        root: styles.root,
        months: styles.months,
        nav: styles.nav,
        month: styles.month,
        month_caption: styles.month_caption,
        caption_label: styles.caption_label,
        weekdays: styles.weekdays,
        week: styles.week,
        today: styles.today,
        disabled: styles.disabledDay,
        footer: styles.footer
      }}
    />
  );
};

export default Calendar;
