"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import { appointmentActions } from "@/store/slices/appointmentSlice";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import { DayPicker } from "react-day-picker";
import { formatDate } from "@/lib/utils/formatDate";
import { convertStringToDateType } from "@/lib/utils/convertStringToDateType";
import { getItemsByUserId } from "@/lib/api/getItemsByUserId";
import { ReservedDatesType } from '@/types/ReservedDates/ReservedDatesType';
import { ReturnReservedDatesType } from '@/types/Api/ReturnReservedDatesType';
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

const CalendarClient: React.FC = () => {
  const { selectedTerm } = useAppSelector((state: RootState) => state?.appointment);
  const { actionBarberId} = useAppSelector((state: RootState) => state?.barber);
  const [workingPeriods, setWorkingPeriods] = useState<{ start_date: Date; end_date: Date }[]>([]);
  const [fullyBookedDates, setFullyBookedDates] = useState<Date[]>([]);
  const [checkDate, setCheckDate] = useState<string[]>([]);
  const [selected, setSelected] = useState<Date | undefined>(undefined);
  const [visibleMonth, setVisibleMonth] = useState<Date>(new Date());
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  

  const dispatch = useAppDispatch();
  const today = resetToMidnight(new Date());
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  maxDate.setHours(23, 59, 59, 999);
  
  // Refs to prevent infinite loops
  const isInitializingRef = useRef(false);
  const lastDispatchedDateRef = useRef<string | null>(null);
  const hasInitializedRef = useRef(false);

  // Optionally, fully booked dates (days on which all slots are booked). Fill this from API if you have it.
  const createReservedDates = (data: ReservedDatesType[])  => {
    const reservedDatesStr: string[] = [];
    const datesDate = data.map((date: ReservedDatesType) => {
      const dateToParse = date.reserved_date.split('/').reverse().join('-');
      reservedDatesStr.push(dateToParse);
      const reservedDate = convertStringToDateType({ date: dateToParse });
      return reservedDate.date as Date;
    });
    
    setCheckDate(reservedDatesStr);
    setFullyBookedDates(datesDate);
  }

  // load periods and optionally fullyBookedDates
  useEffect(() => {
    const getReservedDates = async () => {
      if (!actionBarberId) {
        setFullyBookedDates([]);
        return;
      }
      const response = await getItemsByUserId({
        userId: actionBarberId, 
        date: ''
      }, 'GET_RESERVED_DATES');
      const reservedDatesResponse = response as ReturnReservedDatesType;
      if(!reservedDatesResponse.success) {
        setFullyBookedDates([]);
      }
      createReservedDates(reservedDatesResponse.data as ReservedDatesType[] ?? []);
    }
    const getWorkingPeriods = async () => {
      if (!actionBarberId) {
        setWorkingPeriods([]);
        return;
      }
      const response: any = await getItemsByUserId({ userId: actionBarberId, date: '' }, 'GET_WORKING_HOURS_BY_USER_ID');
      const items = response?.data ?? [];

      const periods = items.flatMap((period: any) => {
        const { start_date } = convertStringToDateType({ start_date: period.start_date });
        const { end_date } = convertStringToDateType({ end_date: period.end_date });
        if (start_date && end_date && (start_date >= today || end_date >= today)) {
          return [{ start_date: resetToMidnight(start_date), end_date: resetToMidnight(end_date) }];
        }
        return [];
      });
      
      setWorkingPeriods(periods);
    };
    
    const loadData = async () => {
      await Promise.all([getReservedDates(), getWorkingPeriods()]);
      setIsDataLoaded(true);
      setIsLoadingState(false, dispatch);
    };
    
    loadData();
  }, [actionBarberId]);

  // Build a Set of available dates (strings 'YYYY-MM-DD' or ISO) for O(1) lookup
  const availableSet = useMemo(() => {
    const s = new Set<string>();
    for (const interval of workingPeriods) {
      let cur = resetToMidnight(interval.start_date);
      const end = resetToMidnight(interval.end_date);
      while (cur.getTime() <= end.getTime()) {
        s.add(cur.toISOString().slice(0, 10)); // use YYYY-MM-DD for compactness
        cur = addDays(cur, 1);
      }
    }
    return s;
  }, [workingPeriods]);

  // Set of fully booked strings for lookup
  const fullyBookedSet = useMemo(() => {
    const s = new Set<string>();
    for (const d of fullyBookedDates) {
      s.add(resetToMidnight(d).toISOString().slice(0, 10));
    }
    return s;
  }, [fullyBookedDates]);

  // Helper function to find the next available date starting from a given date
  const findNextAvailableDate = (startDate: Date): Date | null => {
    let current = resetToMidnight(startDate);
    const max = resetToMidnight(maxDate);
    
    // Limit search to 90 days to prevent infinite loops
    let attempts = 0;
    const maxAttempts = 90;
    
    while (current.getTime() <= max.getTime() && attempts < maxAttempts) {
      const key = current.toISOString().slice(0, 10);
      
      // Check if date is in available periods and not fully booked
      if (availableSet.size > 0) {
        if (availableSet.has(key) && !fullyBookedSet.has(key)) {
          return current;
        }
      } else {
        // If no periods defined, just check if not fully booked and within range
        if (!fullyBookedSet.has(key) && current >= today) {
          return current;
        }
      }
      
      current = addDays(current, 1);
      attempts++;
    }
    
    return null;
  };

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

  const validSelected = useMemo(() => {
    if (!isValidSelected(selected)) return undefined;
    return selected;
  }, [selected, availableSet, fullyBookedSet]);

  const fullDate = validSelected ? formatDate(validSelected) : null;

  // Initialize selected date when data is loaded
  useEffect(() => {
    if (!isDataLoaded || hasInitializedRef.current) {
      return;
    }

    if (isInitializingRef.current) {
      return;
    }

    isInitializingRef.current = true;
    hasInitializedRef.current = true;

    let dateToSet: Date | null = null;

    if (!selectedTerm.date) {
      // No date selected - find first available date starting from today
      dateToSet = findNextAvailableDate(today);
      if (!dateToSet) {
        // Fallback to today if no available date found
        dateToSet = today;
      }
    } else {
      // Date is selected - parse it
      const dateToParse = selectedTerm.date.split('/').reverse().join('-');
      const dateObj = convertStringToDateType({ date: dateToParse });
      const parsedDate = dateObj.date as Date | null;

      if (parsedDate) {
        const parsedDateKey = resetToMidnight(parsedDate).toISOString().slice(0, 10);
        
        // Check if the selected date is fully booked
        if (checkDate.includes(dateToParse) || fullyBookedSet.has(parsedDateKey)) {
          // Date is fully booked - find next available date
          const nextDate = addDays(resetToMidnight(parsedDate), 1);
          dateToSet = findNextAvailableDate(nextDate);
        } else {
          // Date is available - use it if it's valid
          if (!isDateDisabled(parsedDate)) {
            dateToSet = resetToMidnight(parsedDate);
          } else {
            // Date is disabled - find next available
            const nextDate = addDays(resetToMidnight(parsedDate), 1);
            dateToSet = findNextAvailableDate(nextDate);
          }
        }
      }
    }

    if (dateToSet) {
      setSelected(dateToSet);
      setVisibleMonth(new Date(dateToSet.getFullYear(), dateToSet.getMonth(), 1));
    }

    isInitializingRef.current = false;
  }, [isDataLoaded, selectedTerm.date, availableSet, fullyBookedSet, checkDate]);

  // Update selected date when selectedTerm.date changes (after initial load)
  useEffect(() => {
    if (!isDataLoaded || !hasInitializedRef.current || isInitializingRef.current) {
      return;
    }

    if (!selectedTerm.date) {
      return;
    }

    // Skip if this is the same date we already have selected
    const currentSelectedKey = selected ? resetToMidnight(selected).toISOString().slice(0, 10) : null;
    const dateToParse = selectedTerm.date.split('/').reverse().join('-');
    const dateObj = convertStringToDateType({ date: dateToParse });
    const parsedDate = dateObj.date as Date | null;
    
    if (parsedDate) {
      const parsedDateKey = resetToMidnight(parsedDate).toISOString().slice(0, 10);
      
      if (currentSelectedKey === parsedDateKey) {
        return; // Already selected
      }

      // Check if the selected date is fully booked
      if (checkDate.includes(dateToParse) || fullyBookedSet.has(parsedDateKey)) {
        // Date is fully booked - find next available date
        const nextDate = addDays(resetToMidnight(parsedDate), 1);
        const dateToSet = findNextAvailableDate(nextDate);
        if (dateToSet) {
          setSelected(dateToSet);
          setVisibleMonth(new Date(dateToSet.getFullYear(), dateToSet.getMonth(), 1));
        }
      } else {
        // Date is available - use it if it's valid
        if (!isDateDisabled(parsedDate)) {
          setSelected(resetToMidnight(parsedDate));
          setVisibleMonth(new Date(parsedDate.getFullYear(), parsedDate.getMonth(), 1));
        } else {
          // Date is disabled - find next available
          const nextDate = addDays(resetToMidnight(parsedDate), 1);
          const dateToSet = findNextAvailableDate(nextDate);
          if (dateToSet) {
            setSelected(dateToSet);
            setVisibleMonth(new Date(dateToSet.getFullYear(), dateToSet.getMonth(), 1));
          }
        }
      }
    }
  }, [selectedTerm.date, isDataLoaded, availableSet, fullyBookedSet, checkDate]);

  // Update Redux store when selected date changes (only if different from current)
  useEffect(() => {
    if (fullDate && !isInitializingRef.current) {
      // Only dispatch if the date is different from what we last dispatched
      // and different from what's currently in selectedTerm
      if (fullDate !== lastDispatchedDateRef.current && fullDate !== selectedTerm.date) {
        lastDispatchedDateRef.current = fullDate;
        dispatch(appointmentActions.setSelectedTerm({ ...selectedTerm, date: fullDate }));
      }
    }
  }, [fullDate, dispatch]);

  const handleSelect = (date: Date | undefined) => {
    if (date && !isDateDisabled(date)) {
      isInitializingRef.current = false; // Reset flag when user manually selects
      setSelected(date);
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

export default CalendarClient;