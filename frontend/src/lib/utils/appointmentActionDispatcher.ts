import { AppDispatch } from "@/store/store";
export const appointmentActionDispatcher = (data: {date: string; startAppointment: string}, action: string, dispatch: AppDispatch) => {
console.log(data);
console.log(action);
}