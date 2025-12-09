import CreateAppointment from "@/components/Forms/Appointments/CreateAppointmentForm/CreateAppointment";
import SelectedServices from "@/components/UI/Services/SelectedServices";
import Header from "@/components/UI/Header/Header";
import { clientsHeaderNav } from "@/datas/NavigationObjects";

interface Props {
    searchParams: Promise<{barberId: string; serviceId: string}>
}

const CreateAppointmentPage = async ({searchParams}: Props) => {
    const params = await searchParams;
    const updatedClientHeaderNav = {
        ...clientsHeaderNav,
        liItem: [
            {...clientsHeaderNav.liItem[0]},
            {link: `/services?barberId=${params.barberId}`, text: 'USLUGE', itemClass: 'clientHeaderLi'},
            {link: `/appointments?barberId=${params.barberId}&serviceId1=${params.serviceId}`, text: '<<', itemClass: 'separateLi'}
        ]
    };
    return (
        <>
        <Header {...updatedClientHeaderNav} />
        <main className="center">
            <CreateAppointment />
        </main>
        <SelectedServices />
        </>
    );
};
export default CreateAppointmentPage;