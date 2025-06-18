export const createFormData = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const data: Record<string, string> = {};
    const elements = Array.from(form.elements);
    elements.forEach((element) => {
        if(!(element instanceof HTMLInputElement)) return;
        const name = element.name;
        const value = element.value;
        if(name) data[name] = value;
    });
    return data;
    
    /*    const data: {username: string, password: string} = {
            username: (formData.get("username") as string) || "",
            password: (formData.get("password") as string) || "",
        };*/
}