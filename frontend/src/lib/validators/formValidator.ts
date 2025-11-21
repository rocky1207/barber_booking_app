import { ValidationSchemaType } from "@/types/Form/ValidationSchemaType";
export const formValidator = (data: { [key: string]: string | File }, schema:ValidationSchemaType):{status: boolean; message: string;} => {
  console.log(data);  
  for (const key in data) {
    const rules = schema[key];
    const value = data[key];
    if(typeof value === 'string' && rules.required && !value) return {status: false, message: 'Tekstualna polja moraju biti popunjena'};
    if (value instanceof File) {
      if (!value.name) continue;
      const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];
      const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
      if (!allowedTypes.includes(value.type) || value.size > maxSizeInBytes) {
          return {status: false, message: rules.fileErrorMessage || "Fajl nije validan." };
      }
    } else if (typeof value === 'string') {
        if (rules.pattern && !rules.pattern.test(value)) {
            return {status: false, message: rules.errorMessage || "Neispravan unos."}; 
        }
    }
    if (
      typeof data["newPassword"] === "string" &&
      typeof data["confirmPassword"] === "string"
    ) {
      if (data["newPassword"] !== data["confirmPassword"]) {
        return {
          status: false,
          message: "Unos nove lozinke mora biti identičan u oba polja!",
        };
      }
    }
  }
  return {status: true, message: 'Uspešna validacija'};
}
