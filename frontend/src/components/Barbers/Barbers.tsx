import BarberItem from "./BarberItem";
import styles from './Barbers.module.css';

const barbers = [{id: '1', name: 'Đole'}, {id: '2', name: 'Antoaneta'},{id: '3', name: 'Miša'},{id: '4', name: 'Mali Đole'}];
const Barbers:React.FC = () => {
    return (
        <section className={styles.barbers}>
          <h1>IZABERI SVOG FRIZERA</h1>
          <nav aria-label="Choose barber navigation">
            <ul>
              {barbers.map((barberItem, index) => {
                const barber = {...barberItem, index: index};
                return (
                  <BarberItem  key={barber.id} {...barber} />
                    
                )
              })}
                
              
            </ul>
          </nav>
        </section>
    );
};
export default Barbers;