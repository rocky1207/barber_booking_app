import Header from "@/components/UI/Header/Header";
import Barbers from "@/components/UI/Barbers/Barbers";
import Footer from "@/components/UI/Footer/Footer";
import { getBarbers } from "@/lib/api/getBarbers";

export default async function Home() {
  const {success, message, data} = await getBarbers('user/getUser.php');
  
  return (
    <>
      <Header />
      <main className="wrapp">
        {!success ? <p className="textCenter">{message}</p> : 
        success && message ? <p className="textCenter">{message}</p> : 
        <Barbers barbers={data ?? []} />}
      </main>
      <Footer />
    </>
  );
};
