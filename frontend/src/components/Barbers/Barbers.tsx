import BarberItem from "./BarberItem";
import styles from './Barbers.module.css';
const Barbers:React.FC = () => {
    return (
        <section className={styles.barbers}>
          <h1>IZABERI SVOG FRIZERA</h1>
          <ul>
            <BarberItem />
          </ul>
        </section>
    );
};
export default Barbers;