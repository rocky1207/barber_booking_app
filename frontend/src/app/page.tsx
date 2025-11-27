import Header from "@/components/UI/Header/Header";
import Logo from "@/components/UI/Logo/Logo";
import Info from "@/components/UI/Info/Info";
import Barbers from "@/components/UI/Barbers/Barbers";
import Footer from "@/components/UI/Footer/Footer";
import PageNavigation from "@/components/UI/PageNavigation/PageNavigation";
import { choosenAppointmentsNav } from "@/datas/NavigationObjects";
import { BasicBarberType } from "@/types/Barbers/BarbersType";
import { getUsersAndServices } from "@/lib/api/getUsersAndServices";



export default async function Home() {
  const {success, message, data} = await getUsersAndServices('GET_ALL_BARBERS');
  
  return (
    <>
      <Header />
      <Logo />
      <Info />
      <PageNavigation {...choosenAppointmentsNav} />
      <main className="wrapp">
        {!success ? <p className="textCenter">{message}</p> : 
        success && message && data?.length === 0 ? <p className="textCenter">{message}</p> : 
        <Barbers allBarbers={data as BasicBarberType[]} />}
      </main>
      <Footer />
    </>
  );
};
