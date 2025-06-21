export const apiRoutes = {
    GET_CLIENTS: '/getClients.php',
    UPDATE_USER: 'user/updateUser.php',
    DELETE_USER: 'user/deleteUser.php'
} as const;
export type ApiRoute = typeof apiRoutes[keyof typeof apiRoutes];