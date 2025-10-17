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
    GET_CLIENT_APPOINTMENTS: 'appointment/getClientAppointments.php',
    DELETE_CLIENT_APPOINTMENT: 'appointment/deleteClientAppointment.php',
} as const;
export type ApiRoute = typeof apiRoutes[keyof typeof apiRoutes];