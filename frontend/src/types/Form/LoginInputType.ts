import { ValidationSchemaType } from "./ValidationSchemaType";
export interface LoginInputType {
    type: string;
    name: string;
    value: string;
    placeholder: string;
    onAction: (data: { [key: string]: string | File}, schema: ValidationSchemaType) => string | undefined;
}