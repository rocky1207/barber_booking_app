import ServiceItem from './ServiceItem';
import styles from './Services.module.css';
const Services:React.FC = () => {
    return (
        <section className={styles.services}>
            <h1>USLUGE</h1>
            <nav aria-label="Choose service navigation">
                <ul>
                    <ServiceItem />
                </ul>
            </nav>
        </section>
    );
};
export default Services;