export const createFormData = (e: React.FormEvent<HTMLFormElement>): Record<string, string> => {
    const form = e.currentTarget;
    const data: Record<string, string> = {};
    const elements = Array.from(form.elements) as Element[];
    console.log(elements);
    elements.forEach((element) => {
        const isInputOrTextArea = element instanceof HTMLInputElement || 
        element instanceof HTMLTextAreaElement;
        if(!isInputOrTextArea) return;
        const name = element.name;
        const value = element.value;
        if (element instanceof HTMLInputElement && element.type === 'checkbox') {
      // value možeš držati kao "1" u HTML-u; ovde postavljamo "1" ili "0"
            data[name] = element.checked ? (value ?? '1') : '0';
       // return;
        } else {
                
                if(name) data[name] = value;
            }
            
        });
    return data;
    
    /*    const data: {username: string, password: string} = {
            username: (formData.get("username") as string) || "",
            password: (formData.get("password") as string) || "",
        };*/
}
/*
export const createFormData = (e: React.FormEvent<HTMLFormElement>): Record<string, string> => {
  const form = e.currentTarget;
  const data: Record<string, string> = {};

  // Uzmemo sva form elementa koja imaju name (input, textarea, select)
  const elements = Array.from(form.elements) as Element[];

  elements.forEach((el) => {
    // Preskačemo ako nema name (npr. button bez name)
    const name = (el as HTMLInputElement).name;
    if (!name) return;

    // Checkbox
    if (el instanceof HTMLInputElement && el.type === 'checkbox') {
      // value možeš držati kao "1" u HTML-u; ovde postavljamo "1" ili "0"
      data[name] = el.checked ? (el.value ?? '1') : '0';
      return;
    }

    // Radio (uzmemo checked radio)
    if (el instanceof HTMLInputElement && el.type === 'radio') {
      if (el.checked) {
        data[name] = el.value;
      }
      return;
    }

    // File -> možeš posebno obraditi ako treba, ovde samo preskačemo
    if (el instanceof HTMLInputElement && el.type === 'file') {
      // ako želiš da šalješ fajl, treba FormData + multipart; za sada preskači
      return;
    }

    // Select
    if (el instanceof HTMLSelectElement) {
      data[name] = el.value;
      return;
    }

    // Textual inputs & textarea
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
      data[name] = el.value;
      return;
    }
  });

  return data;
};
*/