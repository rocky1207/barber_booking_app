import Input from "../Input/Input";
import Button from "@/components/Button/Button";
import { loginInputs } from "@/datas/Form/lnputObjects";
import { loginBtn } from "@/datas/ButttonObjects";
import styles from './LoginForm.module.css';
const LogIn:React.FC = () => {
    return (
        <form className={styles.login} action="">
            <Input inputs={loginInputs}/>
            <Button {...loginBtn} />
        </form>
    );
};
export default LogIn;