"use client";
import Update from "@/components/Forms/Barber/UpdateForm/Update"
import PageNavigation from "@/components/UI/PageNavigation/PageNavigation";
import { appointmentsPageNav } from "@/datas/NavigationObjects";

const UpdatePage: React.FC = () => {
    return (
        <>
        <PageNavigation {...appointmentsPageNav} />
        <main className="wrapp center">
            <h1>IZMENITE PODATKE</h1>
            <Update />
        </main>
        </>
    );
};
export default UpdatePage;