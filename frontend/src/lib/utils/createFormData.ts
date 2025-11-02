export const createFormData = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const data: Record<string, string> = {};
    const elements = Array.from(form.elements);
    console.log(elements);
    elements.forEach((element) => {
        const isInputOrTextArea = element instanceof HTMLInputElement || 
        element instanceof HTMLTextAreaElement;
        if(!isInputOrTextArea) return;
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