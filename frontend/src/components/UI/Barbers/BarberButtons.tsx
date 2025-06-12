import { itemBtns } from "@/datas/ButttonObjects";
import Button from "@/components/Button/Button";
import styles from './Barbers.module.css';

const BarberButtons: React.FC = () => {
    return (
        <div className={styles.itemButtonsDiv}>
            {itemBtns.map((button) => {
                return <Button key={button.text} {...button}/>
            })}
        </div>
    );
};
export default BarberButtons;