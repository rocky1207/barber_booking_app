
import Home from "@/components/UI/Dashboard/Home/Home";
import Header from "@/components/UI/Header/Header";
//import { cookies } from 'next/headers';
//import { redirect } from 'next/navigation';

const DashboardPage: React.FC = () => {
 /* const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token) {
    redirect('/login');
  }
   */
    return (
        <>
        <Header />
        <main className="wrapp">
            <Home />
        </main>
        </>
    );
};
export default DashboardPage;