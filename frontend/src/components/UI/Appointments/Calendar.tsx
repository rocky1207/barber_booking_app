"use client";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import { appointmentActions } from "@/store/slices/appointmentSlice";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import { DayPicker} from "react-day-picker";
import { formatDate } from "@/lib/utils/formatDate";
import 'react-day-picker/dist/style.css';

const Calendar: React.FC = () => {
    const [selected, setSelected] = useState<Date>(new Date());
    const {selectedTerm} = useAppSelector((state: RootState) => state?.appointment);
    const dispatch = useAppDispatch();
    useEffect(() => {
        setIsLoadingState(false, dispatch);
    }, []);
    
    const fullDate = formatDate(selected);
    console.log(fullDate);
    useEffect(() => {
        fullDate && dispatch(appointmentActions.setSelectedTerm({...selectedTerm, date: fullDate}));
    }, [fullDate]);
    console.log(selected);
    return (
        <DayPicker
            mode="single"
            selected={selected}
            onSelect={setSelected}
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