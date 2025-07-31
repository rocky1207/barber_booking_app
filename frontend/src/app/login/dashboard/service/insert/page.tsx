"use client";
import Service from '@/components/Forms/Service/ServiceForm/Service';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const InsertService: React.FC = () => {
    const params = useSearchParams();
    const barberId = params.get('barberId');
    return (
        <>
        <nav className="wrapp">
            <ul className='flexed'>
                <li><Link href="/login/dashboard">dashboard</Link></li>
                <li><Link href={`/login/dashboard/service?barberId=${barberId}`}>services</Link></li>
            </ul>
        </nav>
        <main className="wrapp center">
            <h1>UNESITE USLUGU</h1>
            <Service />
        </main>
        </>
    );
};
export default InsertService;