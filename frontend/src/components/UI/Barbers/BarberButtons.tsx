import { terminsBtn } from "@/datas/ButttonObjects";
import { itemBtns } from "@/datas/ButttonObjects";
import ApiButton from "@/components/Button/ApiButton";
import NavigateButton from "@/components/Button/NavigateButton";
import { manageBarber } from "@/lib/api/manageBarber";
import { forwardRef } from "react";
import styles from './Barbers.module.css';


const BarberButtons = forwardRef<HTMLDialogElement, {barberId: string}>(({barberId}, ref) => {
    
    const clickHandler = async (url: string, id: string): Promise<void> => {
        await manageBarber(url, id);
    };
    const openModal = () => {
        if(ref && typeof ref !== "function" && ref.current) ref.current.showModal();

    }
    const newTerminsBtn = {
        ...terminsBtn,
        id: barberId,
        onAction: clickHandler
    }
    return (
        <div className={styles.itemButtonsDiv}>
            <ApiButton {...newTerminsBtn}/>
            {itemBtns.map((button) => {
                const newBtn = {
                    ...button,
                    id: barberId,
                    onAction: openModal
                }
                return <NavigateButton key={button.text} {...newBtn}/>
            })}
        </div>
    );
});
export default BarberButtons;
