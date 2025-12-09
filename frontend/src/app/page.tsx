import Header from "@/components/UI/Header/Header";
import Logo from "@/components/UI/Logo/Logo";
import Info from "@/components/UI/Info/Info";
import Barbers from "@/components/UI/Barbers/Barbers";
import LocationMap from "@/components/UI/LocationMap/LocationMap";
import Footer from "@/components/UI/Footer/Footer";
import { BasicBarberType } from "@/types/Barbers/BarbersType";
import { getUsersAndServices } from "@/lib/api/getUsersAndServices";
import { clientsHeaderNav } from "@/datas/NavigationObjects";

export default async function Home() {
  const {success, message, data} = await getUsersAndServices('GET_ALL_BARBERS');
  const logoClasses = {logoDiv: 'logoDiv-1', logoImage: 'logo-1'};
  return (
    <>
      <Header {...clientsHeaderNav} />
      <Logo {...logoClasses} />
      <Info />
      <main className="wrapp">
        {!success ? <p className="textCenter">{message}</p> : 
        success && message && data?.length === 0 ? <p className="textCenter">{message}</p> : 
        <Barbers allBarbers={data as BasicBarberType[]} />}
        <LocationMap/>
      </main>
      <Footer />
    </>
  );
};
