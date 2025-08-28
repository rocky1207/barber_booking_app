export const formatTime = (selectedTime: string, num: number): {index: number, hour: number, minutes: number}[] => {
    console.log(selectedTime, num);
    const [strHour, strMinutes] = selectedTime.split(':');
    let hour: number = parseInt(strHour);
    let minutes: number = parseInt(strMinutes);
    const bla = 30;
    let objArr: {index: number, hour: number, minutes: number}[] = [];
    for(let i = 0; i < num; i++) {
        if(i > 0) {
            minutes += bla;
            if(minutes > 59) {
                hour += 1;
                minutes = 0;
            } 
        }
        
        
        const obj = {index: i+1, hour, minutes};
        
        objArr.push(obj);
    }
    console.log(objArr);
    return objArr;
    
}