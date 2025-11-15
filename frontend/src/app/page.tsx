import Header from "@/components/UI/Header/Header";
import Barbers from "@/components/UI/Barbers/Barbers";
import Footer from "@/components/UI/Footer/Footer";
import PageNavigation from "@/components/UI/PageNavigation/PageNavigation";
import { choosenAppointmentsNav } from "@/datas/NavigationObjects";
import { BasicBarberType } from "@/types/Barbers/BarbersType";
//import { getBarbers } from "@/lib/api/user/getBarbers";
import { getUsersAndServices } from "@/lib/api/getUsersAndServices";

export default async function Home() {
  //const {success, message, data} = await getBarbers('user/getUser.php');
  const {success, message, data} = await getUsersAndServices('GET_ALL_BARBERS');
  return (
    <>
      <Header />
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
