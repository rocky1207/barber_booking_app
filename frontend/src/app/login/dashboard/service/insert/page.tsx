"use client";
import Service from '@/components/Forms/Service/ServiceForm/Service';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import PageNavigation from '@/components/UI/ClientNavigation/ClientNavigation';
import { forgotPasswordPageNav } from '@/datas/NavigationObjects';

const InsertService: React.FC = () => {
    const params = useSearchParams();
    const barberId = params.get('barberId');
    const insertServicePageNav = {
        ...forgotPasswordPageNav,
        liItem: [
            {...forgotPasswordPageNav.liItem[0], text: 'dashboard', link: '/login/dashboard'},
            {...forgotPasswordPageNav.liItem[0], text: 'usluge', link: `/login/dashboard/service?barberId=${barberId}`}
        ]
    }
    return (
        <>
        <PageNavigation {...insertServicePageNav} />
        <main className="wrapp center">
            <h1>UNESITE USLUGU</h1>
            <Service />
        </main>
        </>
    );
};
export default InsertService;