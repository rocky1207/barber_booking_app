import { ValidationSchemaType } from "@/types/Form/ValidationSchemaType";
export const formValidator = (data: { [key: string]: string | File }, schema:ValidationSchemaType):{status: boolean; message: string;} => {
    for (const key in data) {
        const rules = schema[key];
        
      // const rules = schema[name];
        const value = data[key];
        if(rules.required && !value) return {status: false, message: 'Tekstualna polja moraju biti popunjena'};
        //const value = newValue;
        if (value instanceof File) {
          if (!value.name) continue;
    // Validacija fajla (tip, veličina, itd.)
          const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];
          const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB

          if (!allowedTypes.includes(value.type) || value.size > maxSizeInBytes) {
              return {status: false, message: rules.fileErrorMessage || "Fajl nije validan." };
          }
        } else if (typeof value === 'string') {
          console.log(value);
            if (rules.pattern && !rules.pattern.test(value)) {
                return {status: false, message: rules.errorMessage || "Neispravan unos."}; 
            }
            
           
        }
    }
     return {status: true, message: 'Uspešna validacija'};
}


/*
export const universalValidator = (data: { [key: string]: string }): void => {
  for (const key in data) {
    const value = data[key].trim();

    if (key === "username") {
      if (value.length < 3) {
        console.log("Korisničko ime mora imati bar 3 karaktera.");
      }
    } else if (key === "password") {
      if (value.length < 6) {
        console.log("Šifra mora imati bar 6 karaktera.");
      }
    } else if (key === "role") {
      if (!["admin", "user"].includes(value)) {
        console.log("Uloga mora biti 'admin' ili 'user'.");
      }
    } else {
      console.log(`Nepoznat input: ${key}`);
    }
  }
};



export const universalValidator = (
  data: { [key: string]: string },
  schema: ValidationSchema
): string[] => {
  const errors: string[] = [];

  for (const key in schema) {
    const rules = schema[key];
    const value = data[key]?.trim() || "";

    if (rules.required && !value) {
      errors.push(`${key} je obavezno polje.`);
      continue;
    }

    if (rules.minLength && value.length < rules.minLength) {
      errors.push(rules.errorMessage || `${key} je prekratak.`);
      continue;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      errors.push(rules.errorMessage || `${key} je predugačak.`);
      continue;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      errors.push(rules.errorMessage || `${key} ima pogrešan format.`);
      continue;
    }

    if (rules.validate && !rules.validate(value)) {
      errors.push(rules.errorMessage || `${key} nije validan.`);
    }
  }

  return errors;
};
*/