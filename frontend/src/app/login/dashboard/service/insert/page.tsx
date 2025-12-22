"use client";
import Service from '@/components/Forms/Service/ServiceForm/Service';
import Header from '@/components/UI/Header/Header';
import { useSearchParams } from 'next/navigation';
import ClientNavigation from '@/components/UI/ClientNavigation/ClientNavigation';
import { clientsHeaderNav } from '@/datas/NavigationObjects';

const InsertService: React.FC = () => {
    const params = useSearchParams();
    const barberId = params.get('barberId');
    const insertServiceNav = {
        ...clientsHeaderNav,
        liItem: [
            {...clientsHeaderNav.liItem[0]},
            {text: '<<', itemClass: 'separateLi', link: `/login/dashboard/service?barberId=${barberId}`}
        ]
    }
    return (
        <>
        <Header>
            <ClientNavigation {...insertServiceNav} />
        </Header>
        <main className="wrapp center">
            <h1>UNESITE USLUGU</h1>
            <Service />
        </main>
        </>
    );
};
export default InsertService;