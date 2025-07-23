import api from "@/lib/axios";
import { apiRoutes } from "../apiRoutes/apiRoutes";

export const manageService = (action: string, actionId: string) => {
    console.log('manageService');
    const id = parseInt(actionId, 10);
    let request;
    if(action === 'DELETE') request = api.delete(apiRoutes.DELETE_SERVICE, {data:{id}});
};