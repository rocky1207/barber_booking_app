import Header from "@/components/UI/Header/Header";
import Barbers from "@/components/UI/Barbers/Barbers";
import Footer from "@/components/UI/Footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="wrapp">
        <Barbers />
      </main>
      <Footer />
    </>
  );
}
