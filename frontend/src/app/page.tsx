import Header from "@/components/UI/Header/Header";
import Barbers from "@/components/UI/Barbers/Barbers";
import Footer from "@/components/UI/Footer/Footer";
import PageNavigation from "@/components/UI/PageNavigation/PageNavigation";
import { choosenAppointmentsNav } from "@/datas/NavigationObjects";
import { getBarbers } from "@/lib/api/user/getBarbers";

export default async function Home() {
  const {success, message, data} = await getBarbers('user/getUser.php');
  
  return (
    <>
      <Header />
      <PageNavigation {...choosenAppointmentsNav} />
      <main className="wrapp">
        {!success ? <p className="textCenter">{message}</p> : 
        success && message ? <p className="textCenter">{message}</p> : 
        <Barbers allBarbers={data?.data ?? []} />}
      </main>
      <Footer />
    </>
  );
};
