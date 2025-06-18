import { ValidationSchemaType } from "./ValidationSchemaType";
export interface LoginInputType {
    type: string;
    name: string;
    placeholder: string;
    defaultValue?: string;
}