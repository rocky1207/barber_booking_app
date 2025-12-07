import { BasicApiReturnType } from "./ApiReturnType"
import { ReservedDatesType } from "../ReservedDates/ReservedDatesType"
export interface ReturnReservedDatesType extends BasicApiReturnType {
    data: ReservedDatesType[]
}