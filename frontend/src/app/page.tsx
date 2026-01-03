import Header from "@/components/UI/Header/Header";
import Logo from "@/components/UI/Logo/Logo";
import Info from "@/components/UI/Info/Info";
import Barbers from "@/components/UI/Barbers/Barbers";
import LocationMap from "@/components/UI/LocationMap/LocationMap";
import Footer from "@/components/UI/Footer/Footer";
import { BasicBarberType } from "@/types/Barbers/BarbersType";
import { getUsersAndServices } from "@/lib/api/getUsersAndServices";
import { clientsHeaderNav } from "@/datas/NavigationObjects";
import ClientNavigation from "@/components/UI/ClientNavigation/ClientNavigation";

export default async function Home() {
  const {success, message, data} = await getUsersAndServices('GET_ALL_BARBERS');
  const logoClasses = {logoDiv: 'logoDiv-1', logoImage: 'logo-1'};
  return (
    <>
      <Header>
        <ClientNavigation {...clientsHeaderNav}/>
      </Header>
      <Logo {...logoClasses} />
      <section className="wrapp display">
      <Info />
      </section>
      <main className="wrapp wrappMargin">
        {!success ? <p className="textCenter">{message}</p> : 
        success && message && data?.length === 0 ? <p className="textCenter">{message}</p> : 
        <Barbers allBarbers={data as BasicBarberType[]} />}
        <LocationMap/>
      </main>
      <Footer />
    </>
  );
};
