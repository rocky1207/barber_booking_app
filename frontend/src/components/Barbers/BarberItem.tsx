'use client';

import { useRouter } from 'next/navigation';

const barbers = [{id: '1', name: 'Đole'}, {id: '2', name: 'Antoaneta'},{id: '3', name: 'Miša'},{id: '4', name: 'Mali Đole'}];
const BarberItem:React.FC = () => {
    const router = useRouter();
    const handleClick = ():void => {
            router.push('/services');
        }
    return (
        
        <>
        {barbers.map((barber, index) => {
            return (
                <li key={barber.id} onClick={handleClick}
                style={{ animationDelay: `${index * 0.2}s` }} // dinamičko kašnjenje
        >
                <p>{barber.name}</p>
            </li>
            )
        })}
            
            
        </>
    );
};
export default BarberItem;