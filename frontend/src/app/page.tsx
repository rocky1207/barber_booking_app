import Header from "@/components/Header/Header";
import Barbers from "@/components/Barbers/Barbers";

export default function Home() {
  return (
    <>
      <Header />
      <main className="wrapp">
        <Barbers />
      </main>
      <footer className="wrapp">
        <p>Klik</p>
      </footer>
    </>
  );
}
