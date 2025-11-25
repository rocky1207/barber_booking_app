"use client";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import { appointmentActions } from "@/store/slices/appointmentSlice";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import { DayPicker} from "react-day-picker";
import { formatDate } from "@/lib/utils/formatDate";
import { convertStringToDateType } from "@/lib/utils/convertStringToDateType";
import 'react-day-picker/dist/style.css';

const Calendar: React.FC = () => {
    const {selectedTerm} = useAppSelector((state: RootState) => state?.appointment);
    let initialState: Date;
    if(!selectedTerm.date) {
        initialState = new Date();
    } else {
        const dateToParse = selectedTerm?.date ? selectedTerm.date.split('/').reverse().join('-') : null;
        const {date} = dateToParse ? convertStringToDateType({date: dateToParse}) : {date: new Date()};
        initialState = date as Date;
    }
    const [selected, setSelected] = useState<Date>(initialState); 
    const [visibleMonth, setVisibleMonth] = useState<Date>(new Date(initialState.getFullYear(), initialState.getMonth(), 1));
    const dispatch = useAppDispatch();  
    useEffect(() => {
        setIsLoadingState(false, dispatch);
    }, []);
   
    const fullDate = formatDate(selected as Date);
    
    useEffect(() => {
        fullDate && dispatch(appointmentActions.setSelectedTerm({...selectedTerm, date: fullDate}));
    }, [fullDate]);
    
    return (
        <DayPicker
            mode="single"
            selected={selected as Date}
            onSelect={setSelected}
            month={visibleMonth}
            onMonthChange={(m) =>setVisibleMonth(m)}
            required
            captionLayout="label"
            hidden={{
                before: new Date(),
                after: new Date(new Date().setMonth(new Date().getMonth()+3))
            }}
            footer={
                selected ? `Izabrani datum: ${fullDate}` : "Izaberite datum."
            }
            classNames={{
               /* root: styles.root,
                month: styles.month,
                caption: styles.caption,
                day: styles.day,
                day_selected: styles.day_selected,
                nav: styles.nav,
                month_grid: styles.grid*/
            }}
        />
        
    );
};
export default Calendar;