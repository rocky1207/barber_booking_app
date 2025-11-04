import Input from "../../Input/Input";
import { forgotPasswordInputs } from "@/datas/Form/lnputObjects";
import styles from '../../Form.module.css';
const ForgotPassword: React.FC = () => {
    return (
        <form className={styles.form}>
            <Input inputs={forgotPasswordInputs} />
            <button>Pošalji</button>
        </form>
    );
};
export default ForgotPassword;