export const apiRoutes = {
    GET_CLIENTS: 'user/getClients.php',
    LOGIN_USER: 'auth/login.php',
    UPDATE_USER: 'user/updateUser.php',
    DELETE_USER: 'user/deleteUser.php',
    CHANGE_PASSWORD: '/user/changePassword.php',
    INSERT_SERVICE: 'service/insertService.php',
    GET_USER_SERVICES: 'service/getUserServices.php',
    GET_ALL_SERVICES: 'service/getAllServices.php',
    DELETE_SERVICE: 'service/deleteService.php',
    UPDATE_SERVICE: 'service/updateService.php',
    INSERT_APPOINTMENT: 'appointment/insertAppointment.php',
    GET_RESERVED_APPOINTMENTS: 'appointment/getReservedAppointments.php',
    GET_BARBER_APPOINTMENTS: 'appointment/getBarberAppointments.php',
    GET_CLIENT_APPOINTMENTS: 'appointment/getClientAppointments.php',
    DELETE_CLIENT_APPOINTMENT: 'appointment/deleteClientAppointment.php',
    GET_WORKING_HOURS_BY_USER_ID: 'working_hours/getWorkingHoursByUserId.php',
    GET_WORKING_HOURS_FOR_DATE: 'working_hours/getWorkingHoursForDate.php',
    DELETE_WORKING_HOURS_BY_ID:'working_hours/deleteWorkingHours.php',
    INSERT_WORKING_HOURS: 'working_hours/insertWorkingHours.php',
    

} as const;
export type ApiRoute = typeof apiRoutes[keyof typeof apiRoutes];