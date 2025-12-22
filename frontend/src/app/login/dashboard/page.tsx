"use client";
import { useState } from "react";
import Home from "@/components/UI/Dashboard/Home/Home";
import { useAppSelector } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
import Header from "@/components/UI/Header/Header";
import UserNavigation from "@/components/UI/Dashboard/UserNavigation/UserNavigation";

const DashboardPage: React.FC = () => {
    const {barbers, actionBarberId, loggedBarber} = useAppSelector((state: RootState) => state?.barber);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const barberData = {
        barbers,
        actionBarberId,
    }
    return (
        <>
        {loggedBarber.suspended !== 0 ? 
        <p>Nemate više pristup aplikaciji</p>  : 
        <>
        <Header>
            <UserNavigation setErrorMessage={setErrorMessage} />
        </Header>
        {!errorMessage ?
        <main className="wrapp">
            <h1 className="marginBottom">MENADŽERSKA TABLA</h1>
            <Home {...barberData} />
        </main> : 
        <p className="center">{errorMessage}</p>}
        </>}
        </>
    );
};
export default DashboardPage;