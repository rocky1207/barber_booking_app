import { parseISO, parse } from "date-fns";
export const convertStringToDateType = (data: Record<string, string>): Record<string, Date | null> => {
    let dateTypeObj: Record<string, Date | null> = {};
    for(const key in data) {
        if(key.includes('date')) dateTypeObj[key] = parseISO(data[key]);
        if(key.includes('time')) dateTypeObj[key] = parse(data[key].substring(0, 5), 'HH:mm', new Date);
    }
    return dateTypeObj;
}