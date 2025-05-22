import ServiceItem from './ServiceItem';
import styles from './Services.module.css';
const Services:React.FC = () => {
    return (
        <section className={styles.services}>
            <h1>USLUGE</h1>
            <ul>
                <ServiceItem />
            </ul>
        </section>
    );
};
export default Services;