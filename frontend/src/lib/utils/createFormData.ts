export const createFormData = (e: React.FormEvent<HTMLFormElement>): Record<string, string> => {
    const form = e.currentTarget;
    const data: Record<string, string> = {};
    const elements = Array.from(form.elements) as Element[];
    elements.forEach((element) => {
        const isInputOrTextArea = element instanceof HTMLInputElement || 
        element instanceof HTMLTextAreaElement;
        if(!isInputOrTextArea) return;
        const name = element.name;
        const value = element.value;
        if (element instanceof HTMLInputElement && element.type === 'checkbox') {
          data[name] = element.checked ? (value ?? '1') : '0';
        } else {
           if(name) data[name] = value;
          }
        });
    return data;
}
