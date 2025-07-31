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
} as const;
export type ApiRoute = typeof apiRoutes[keyof typeof apiRoutes];