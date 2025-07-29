"use client";
import { forwardRef } from "react";
import NavigateButton from "@/components/Button/NavigateButton";
import { modalActionBtn, updateActionBtn } from "@/datas/ButttonObjects";
import { useRouter } from "next/navigation";

interface Props {
    serviceId: number;
    setDeleteServiceId: React.Dispatch<React.SetStateAction<number>>;
}
const ServiceButtons = forwardRef<HTMLDialogElement, Props>(({serviceId, setDeleteServiceId}, ref) => {
    const router = useRouter();
    const openModal = () => {
        if(ref && typeof ref !== 'function' && ref.current) ref.current.showModal();
        setDeleteServiceId(serviceId);
    }
    const newModalActionBtn = {
        ...modalActionBtn,
        onAction: openModal
    }
    const newUpdateActionBtn = {
        ...updateActionBtn,
        onAction: () => {router.push(`/login/dashboard/service/update?serviceId=${serviceId}`)}
    }
    return (
        <nav className="flexed">
            <NavigateButton {...newModalActionBtn} />
            <NavigateButton {...newUpdateActionBtn} />
        </nav>
    );
});
export default ServiceButtons;