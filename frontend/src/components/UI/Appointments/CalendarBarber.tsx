/*
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
import { getAppointmentsDatesByRange } from "@/lib/api/appointments/getAppointmentsDateByRange";
import calendarHelpers from '@/lib/utils/calendarHelpers';
import styles from './Appointments.module.css';

import 'react-day-picker/dist/style.css';

const CalendarBarber: React.FC = () => {
  const { selectedTerm } = useAppSelector((state: RootState) => state?.appointment);
  const { actionBarberId} = useAppSelector((state: RootState) => state?.barber);
  const [workingPeriods, setWorkingPeriods] = useState<{ start_date: Date; end_date: Date }[]>([]);
  const [nonWorkingDates, setNonWorkingDates] = useState<Date[]>([]);
  const [datesWithAppointments, setDatesWithAppointments] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<Date | undefined>(undefined);
  const [visibleMonth, setVisibleMonth] = useState<Date>(new Date());
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const dispatch = useAppDispatch();
  const today = calendarHelpers.resetToMidnight(new Date());
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  maxDate.setHours(23, 59, 59, 999);
  
  // Refs to prevent infinite loops
  const isInitializingRef = useRef(false);
  const lastDispatchedDateRef = useRef<string | null>(null);
  const hasInitializedRef = useRef(false);

  // Create non-working dates from reserved_dates (dates barber marked as non-working)
  const createNonWorkingDates = (data: ReservedDatesType[]) => {
    const datesDate = data.map((date: ReservedDatesType) => {
      const dateToParse = date.reserved_date.split('/').reverse().join('-');
      const reservedDate = convertStringToDateType({ date: dateToParse });
      return reservedDate.date as Date;
    });
    setNonWorkingDates(datesDate);
  }

  // Load dates with appointments (dates that have at least one booking)
  const loadDatesWithAppointments = async () => {
  if (!actionBarberId) {
    setDatesWithAppointments(new Set());
    return;
  }

  try {
    const startDateStr = formatDate(today);
    const endDateStr = formatDate(maxDate);
    
    const response = await getAppointmentsDatesByRange ({
      userId: actionBarberId,
      startDate: startDateStr,
      endDate: endDateStr
    });
    
    if (response.success && response.data && Array.isArray(response.data)) {
      const datesWithAppts = new Set<string>();
      
      response.data.forEach((dateStr: string) => {
        const dateToParse = dateStr.split('/').reverse().join('-');
        const dateObj = convertStringToDateType({ date: dateToParse });
        if (dateObj.date) {
          const dateKey = calendarHelpers.resetToMidnight(dateObj.date as Date).toISOString().slice(0, 10);
          datesWithAppts.add(dateKey);
        }
      });
      
      setDatesWithAppointments(datesWithAppts);
    } else {
      setDatesWithAppointments(new Set());
    }
  } catch (error) {
    console.error('Error loading appointment dates:', error);
    setDatesWithAppointments(new Set());
  }
};

  // load periods and non-working dates
  useEffect(() => {
    const getNonWorkingDates = async () => {
      if (!actionBarberId) {
        setNonWorkingDates([]);
        return;
      }
      const response = await getItemsByUserId({
        userId: actionBarberId, 
        date: ''
      }, 'GET_RESERVED_DATES');
      const reservedDatesResponse = response as ReturnReservedDatesType;
      if(!reservedDatesResponse.success) {
        setNonWorkingDates([]);
      }
      createNonWorkingDates(reservedDatesResponse.data as ReservedDatesType[] ?? []);
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
          return [{ start_date: calendarHelpers.resetToMidnight(start_date), end_date: calendarHelpers.resetToMidnight(end_date) }];
        }
        return [];
      });
      
      setWorkingPeriods(periods);
    };
    
    const loadData = async () => {
      await Promise.all([getNonWorkingDates(), getWorkingPeriods()]);
      await loadDatesWithAppointments();
      setIsDataLoaded(true);
      setIsLoadingState(false, dispatch);
    };
    
    loadData();
  }, [actionBarberId]);

  // Build a Set of available dates (strings 'YYYY-MM-DD' or ISO) for O(1) lookup
  
  const availableSet = useMemo(() => {
   return calendarHelpers.availableSet(workingPeriods)
  }, [workingPeriods]);


  // Set of non-working dates (dates barber marked as non-working)
  const nonWorkingSet = useMemo(() => {
    return calendarHelpers.nonWorkingSet(nonWorkingDates);
  }, [nonWorkingDates]);

  // disabled predicate for DayPicker
  // Disable dates that are:
  // 1. Outside allowed window
  // 2. Not in availableSet (non-working days barber set)
  // 3. NOT in datesWithAppointments (dates with NO appointments)
  

  // Proveri da li je selected datum validan (u dozvoljenom opsegu i ne disabled)
  //const isValidSelected = calendarHelpers.isValidSelected();

  const validSelected = useMemo(() => {
    if (!calendarHelpers.isValidSelected(selected, today, maxDate)) return undefined;
    return selected;
  }, [selected, availableSet, datesWithAppointments]);

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
      let current = calendarHelpers.resetToMidnight(today);
      const max = calendarHelpers.resetToMidnight(maxDate);
      let attempts = 0;
      
      while (current.getTime() <= max.getTime() && attempts < 90) {
        if (!calendarHelpers.isDateDisabled(current, today, maxDate, availableSet, datesWithAppointments)) {
          dateToSet = current;
          break;
        }
        current = calendarHelpers.addDays(current, 1);
        attempts++;
      }
      
      if (!dateToSet) {
        dateToSet = today;
      }
    } else {
      // Date is selected - parse it
      const dateToParse = selectedTerm.date.split('/').reverse().join('-');
      const dateObj = convertStringToDateType({ date: dateToParse });
      const parsedDate = dateObj.date as Date | null;

      if (parsedDate) {
        if (!calendarHelpers.isDateDisabled(parsedDate)) {
          dateToSet = calendarHelpers.resetToMidnight(parsedDate);
        } else {
          // Date is disabled - find next available
          let current = calendarHelpers.addDays(calendarHelpers.resetToMidnight(parsedDate), 1);
          const max = calendarHelpers.resetToMidnight(maxDate);
          let attempts = 0;
          
          while (current.getTime() <= max.getTime() && attempts < 90) {
            if (!calendarHelpers.isDateDisabled(current, today, maxDate, availableSet, datesWithAppointments)) {
              dateToSet = current;
              break;
            }
            current = calendarHelpers.addDays(current, 1);
            attempts++;
          }
        }
      }
    }

    if (dateToSet) {
      setSelected(dateToSet);
      setVisibleMonth(new Date(dateToSet.getFullYear(), dateToSet.getMonth(), 1));
    }

    isInitializingRef.current = false;
  }, [isDataLoaded, selectedTerm.date, availableSet, datesWithAppointments]);

  // Update selected date when selectedTerm.date changes (after initial load)
  useEffect(() => {
    if (!isDataLoaded || !hasInitializedRef.current || isInitializingRef.current) {
      return;
    }

    if (!selectedTerm.date) {
      return;
    }

    const currentSelectedKey = selected ? calendarHelpers.resetToMidnight(selected).toISOString().slice(0, 10) : null;
    const dateToParse = selectedTerm.date.split('/').reverse().join('-');
    const dateObj = convertStringToDateType({ date: dateToParse });
    const parsedDate = dateObj.date as Date | null;
    
    if (parsedDate) {
      const parsedDateKey = calendarHelpers.resetToMidnight(parsedDate).toISOString().slice(0, 10);
      
      if (currentSelectedKey === parsedDateKey) {
        return;
      }

      if (!calendarHelpers.isDateDisabled(parsedDate, today, maxDate, availableSet, datesWithAppointments)) {
        setSelected(calendarHelpers.resetToMidnight(parsedDate));
        setVisibleMonth(new Date(parsedDate.getFullYear(), parsedDate.getMonth(), 1));
      } else {
        // Date is disabled - find next available
        let current = calendarHelpers.addDays(calendarHelpers.resetToMidnight(parsedDate), 1);
        const max = calendarHelpers.resetToMidnight(maxDate);
        let attempts = 0;
        
        while (current.getTime() <= max.getTime() && attempts < 90) {
          if (!calendarHelpers.isDateDisabled(current, today, maxDate, availableSet, datesWithAppointments)) {
            setSelected(current);
            setVisibleMonth(new Date(current.getFullYear(), current.getMonth(), 1));
            break;
          }
          current = calendarHelpers.addDays(current, 1);
          attempts++;
        }
      }
    }
  }, [selectedTerm.date, isDataLoaded, availableSet, datesWithAppointments]);

  // Update Redux store when selected date changes (only if different from current)
  useEffect(() => {
    if (fullDate && !isInitializingRef.current) {
      if (fullDate !== lastDispatchedDateRef.current && fullDate !== selectedTerm.date) {
        lastDispatchedDateRef.current = fullDate;
        dispatch(appointmentActions.setSelectedTerm({ ...selectedTerm, date: fullDate }));
      }
    }
  }, [fullDate, dispatch]);

  const handleSelect = (date: Date | undefined) => {
    if (date && !calendarHelpers.isDateDisabled(date)) {
      isInitializingRef.current = false;
      setSelected(date);
    }
  };

  //const isActuallySelected = calendarHelpers.isActuallySelected(date, validSelected);

  return (
    <DayPicker
      mode="single"
      selected={validSelected}
      onSelect={handleSelect}
      month={visibleMonth}
      onMonthChange={setVisibleMonth}
      disabled={calendarHelpers.isDateDisabled}
      modifiers={{
        actuallySelected: (date) => calendarHelpers.isActuallySelected(date, validSelected)
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

export default CalendarBarber;
*/
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
import { getAppointmentsDatesByRange } from "@/lib/api/appointments/getAppointmentsDateByRange";
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

const CalendarBarber: React.FC = () => {
  const { selectedTerm } = useAppSelector((state: RootState) => state?.appointment);
  const { actionBarberId} = useAppSelector((state: RootState) => state?.barber);
  const [workingPeriods, setWorkingPeriods] = useState<{ start_date: Date; end_date: Date }[]>([]);
  const [nonWorkingDates, setNonWorkingDates] = useState<Date[]>([]);
  const [datesWithAppointments, setDatesWithAppointments] = useState<Set<string>>(new Set());
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

  // Create non-working dates from reserved_dates (dates barber marked as non-working)
  const createNonWorkingDates = (data: ReservedDatesType[]) => {
    const datesDate = data.map((date: ReservedDatesType) => {
      const dateToParse = date.reserved_date.split('/').reverse().join('-');
      const reservedDate = convertStringToDateType({ date: dateToParse });
      return reservedDate.date as Date;
    });
    setNonWorkingDates(datesDate);
  }

  // Load dates with appointments (dates that have at least one booking) - OPTIMIZED
  const loadDatesWithAppointments = async () => {
  if (!actionBarberId) {
    setDatesWithAppointments(new Set());
    return;
  }

  try {
    const startDateStr = formatDate(today);
    const endDateStr = formatDate(maxDate);
    
    const response = await getAppointmentsDatesByRange({
      userId: actionBarberId,
      startDate: startDateStr,
      endDate: endDateStr
    });
    
    if (response.success && response.data && Array.isArray(response.data)) {
      const datesWithAppts = new Set<string>();
      
      response.data.forEach((dateStr: string) => {
        const dateToParse = dateStr.split('/').reverse().join('-');
        const dateObj = convertStringToDateType({ date: dateToParse });
        if (dateObj.date) {
          const dateKey = resetToMidnight(dateObj.date as Date).toISOString().slice(0, 10);
          datesWithAppts.add(dateKey);
        }
      });
      
      setDatesWithAppointments(datesWithAppts);
    } else {
      setDatesWithAppointments(new Set());
    }
  } catch (error) {
    console.error('Error loading appointment dates:', error);
    setDatesWithAppointments(new Set());
  }
};

  // load periods and non-working dates
  useEffect(() => {
    const getNonWorkingDates = async () => {
      if (!actionBarberId) {
        setNonWorkingDates([]);
        return;
      }
      const response = await getItemsByUserId({
        userId: actionBarberId, 
        date: ''
      }, 'GET_RESERVED_DATES');
      const reservedDatesResponse = response as ReturnReservedDatesType;
      if(!reservedDatesResponse.success) {
        setNonWorkingDates([]);
      }
      createNonWorkingDates(reservedDatesResponse.data as ReservedDatesType[] ?? []);
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
      await Promise.all([getNonWorkingDates(), getWorkingPeriods()]);
      await loadDatesWithAppointments();
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
        s.add(cur.toISOString().slice(0, 10));
        cur = addDays(cur, 1);
      }
    }
    return s;
  }, [workingPeriods]);

  // Set of non-working dates (dates barber marked as non-working)
  const nonWorkingSet = useMemo(() => {
    const s = new Set<string>();
    for (const d of nonWorkingDates) {
      s.add(resetToMidnight(d).toISOString().slice(0, 10));
    }
    return s;
  }, [nonWorkingDates]);

  // disabled predicate for DayPicker
  // Disable dates that are:
  // 1. Outside allowed window
  // 2. Not in availableSet (non-working days barber set)
  // 3. NOT in datesWithAppointments (dates with NO appointments)
  const isDateDisabled = (date: Date): boolean => {
    const d = resetToMidnight(date);
    const key = d.toISOString().slice(0, 10);
    
    // always disable outside allowed window
    if (d < today || d > maxDate) return true;

    // Disable dates that are not in availableSet (non-working days barber set)
    if (availableSet.size > 0) {
      if (!availableSet.has(key)) return true;
    } else {
      // If no periods defined at all, disable all dates
      return true;
    }

    // Disable dates that DON'T have any appointments (dates with NO bookings)
    // So we enable dates that HAVE appointments (even if fully booked)
    if (!datesWithAppointments.has(key)) return true;

    // otherwise it's enabled (date has at least one appointment)
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
  }, [selected, availableSet, datesWithAppointments]);

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
      let current = resetToMidnight(today);
      const max = resetToMidnight(maxDate);
      let attempts = 0;
      
      while (current.getTime() <= max.getTime() && attempts < 90) {
        if (!isDateDisabled(current)) {
          dateToSet = current;
          break;
        }
        current = addDays(current, 1);
        attempts++;
      }
      
      if (!dateToSet) {
        dateToSet = today;
      }
    } else {
      // Date is selected - parse it
      const dateToParse = selectedTerm.date.split('/').reverse().join('-');
      const dateObj = convertStringToDateType({ date: dateToParse });
      const parsedDate = dateObj.date as Date | null;

      if (parsedDate) {
        if (!isDateDisabled(parsedDate)) {
          dateToSet = resetToMidnight(parsedDate);
        } else {
          // Date is disabled - find next available
          let current = addDays(resetToMidnight(parsedDate), 1);
          const max = resetToMidnight(maxDate);
          let attempts = 0;
          
          while (current.getTime() <= max.getTime() && attempts < 90) {
            if (!isDateDisabled(current)) {
              dateToSet = current;
              break;
            }
            current = addDays(current, 1);
            attempts++;
          }
        }
      }
    }

    if (dateToSet) {
      setSelected(dateToSet);
      setVisibleMonth(new Date(dateToSet.getFullYear(), dateToSet.getMonth(), 1));
    }

    isInitializingRef.current = false;
  }, [isDataLoaded, selectedTerm.date, availableSet, datesWithAppointments]);

  // Update selected date when selectedTerm.date changes (after initial load)
  useEffect(() => {
    if (!isDataLoaded || !hasInitializedRef.current || isInitializingRef.current) {
      return;
    }

    if (!selectedTerm.date) {
      return;
    }

    const currentSelectedKey = selected ? resetToMidnight(selected).toISOString().slice(0, 10) : null;
    const dateToParse = selectedTerm.date.split('/').reverse().join('-');
    const dateObj = convertStringToDateType({ date: dateToParse });
    const parsedDate = dateObj.date as Date | null;
    
    if (parsedDate) {
      const parsedDateKey = resetToMidnight(parsedDate).toISOString().slice(0, 10);
      
      if (currentSelectedKey === parsedDateKey) {
        return;
      }

      if (!isDateDisabled(parsedDate)) {
        setSelected(resetToMidnight(parsedDate));
        setVisibleMonth(new Date(parsedDate.getFullYear(), parsedDate.getMonth(), 1));
      } else {
        // Date is disabled - find next available
        let current = addDays(resetToMidnight(parsedDate), 1);
        const max = resetToMidnight(maxDate);
        let attempts = 0;
        
        while (current.getTime() <= max.getTime() && attempts < 90) {
          if (!isDateDisabled(current)) {
            setSelected(current);
            setVisibleMonth(new Date(current.getFullYear(), current.getMonth(), 1));
            break;
          }
          current = addDays(current, 1);
          attempts++;
        }
      }
    }
  }, [selectedTerm.date, isDataLoaded, availableSet, datesWithAppointments]);

  // Update Redux store when selected date changes (only if different from current)
  useEffect(() => {
    if (fullDate && !isInitializingRef.current) {
      if (fullDate !== lastDispatchedDateRef.current && fullDate !== selectedTerm.date) {
        lastDispatchedDateRef.current = fullDate;
        dispatch(appointmentActions.setSelectedTerm({ ...selectedTerm, date: fullDate }));
      }
    }
  }, [fullDate, dispatch]);

  const handleSelect = (date: Date | undefined) => {
    if (date && !isDateDisabled(date)) {
      isInitializingRef.current = false;
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

export default CalendarBarber;