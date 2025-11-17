export const convertFormDateType = (formEl: HTMLFormElement) => {
    const formElObj = new FormData(formEl);
    const fd = formElObj.entries();
    const obj = Object.fromEntries(fd) as Record<string, FormDataEntryValue>;
     const objArr = Object.entries(obj);
    const payload: Record<string, string> = {};
    for(const [key, value] of Object.entries(obj)) {
        if(value instanceof File) {
            payload[key] = '';
        } else {
            payload[key] = value;
        }
    };
    return payload;
}