"use client";
import { useEffect } from "react";
import Update from "@/components/Forms/Barber/UpdateForm/Update"
import ClientNavigation from "@/components/UI/ClientNavigation/ClientNavigation";
import Header from "@/components/UI/Header/Header";
import { clientsHeaderNav } from "@/datas/NavigationObjects";
import { RootState } from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks/typizedHooks";
//import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";


const UpdatePage: React.FC = () => {
    const {barbers, actionBarberId, loggedBarber} = useAppSelector((state: RootState) => state?.barber);
   // const dispatch = useAppDispatch();
    //useEffect(() => {}, [setIsLoadingState(false, dispatch)]);
    let showButton: boolean;
    if(loggedBarber?.role === 'owner') {
        showButton = true;
    } else if(loggedBarber?.role === 'user' && loggedBarber?.id === actionBarberId) {
        showButton = true;
    } else if(loggedBarber?.role === 'admin' && loggedBarber?.id === actionBarberId) {
        showButton = true;
    }else {
        showButton = false;
    }
    let updateUserHeaderNav;
    if(showButton) {
        updateUserHeaderNav = {
        ...clientsHeaderNav,
        liItem: [
            {...clientsHeaderNav.liItem[0]},
            {text: 'MENADŽERSKA TABLA', itemClass: 'clientHeaderLi', link: '/login/dashboard'},
            {text: 'PROMENI LOZINKU', itemClass: 'changePasswordLi', link: `/login/dashboard/user/changePassword?id=${actionBarberId}`}
        ]
    } 
    } else {
        updateUserHeaderNav = {
        ...clientsHeaderNav,
        liItem: [{text: 'MENADŽERSKA TABLA', itemClass: 'clientHeaderLi', link: '/login/dashboard'}]
        } 
    }
    
    return (
        <>
        <Header>
            <ClientNavigation  {...updateUserHeaderNav} />
        </Header>
        <main className="wrapp center">
            <h1>IZMENITE PODATKE</h1>
            <Update barbers={barbers} loggedBarber={loggedBarber} actionBarberId={actionBarberId} />
        </main>
        </>
    );
};
export default UpdatePage;