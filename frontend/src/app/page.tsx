import Header from "@/components/Header/Header";
import Barbers from "@/components/Barbers/Barbers";
import Footer from "@/components/Footer/Footer";

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
