import CreateAppointment from "@/components/Forms/Appointments/CreateAppointmentForm/CreateAppointmentForm";
import SelectedServices from "@/components/UI/Services/SelectedServices";
const CreateAppointmentPage = () => {
    return (
        <>
            <main className="center">
                <CreateAppointment />
            </main>
            <SelectedServices />
        </>
    );
};
export default CreateAppointmentPage;