import styles from './Barbers.module.css';
const barbers = [{id: '1', name: 'Đole'}, {id: '2', name: 'Antoaneta'},{id: '3', name: 'Miša'},{id: '4', name: 'Mali Đole'}];
const BarberItem:React.FC = () => {
    return (
        <>
        {barbers.map((barber, index) => {
            return (
                <li key={barber.id}
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