"use client";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import { useRouter } from 'next/navigation';
import { uiActions } from "@/store/slices/UiSlice";
import { dashboardBtn } from "@/datas/ButttonObjects";
import NavigateButton from "@/components/Button/NavigateButton";
const Footer:React.FC = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleClick = () => {
       dispatch(uiActions.setIsLoading(true));
        router.push('/login/dashboard');
    }
    const newDashboardBtn = {
        ...dashboardBtn,
        onAction: handleClick
    }
    return (
        <footer className="wrapp">
            <NavigateButton {...newDashboardBtn} />
        </footer>
    );
};
export default Footer;