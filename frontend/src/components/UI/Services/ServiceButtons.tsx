"use client";
import { forwardRef } from "react";
import NavigateButton from "@/components/Button/NavigateButton";
import { modalActionBtn, updateActionBtn } from "@/datas/ButttonObjects";

interface Props {
    serviceId: number;
    setDeleteServiceId: React.Dispatch<React.SetStateAction<number>>;
}
const ServiceButtons = forwardRef<HTMLDialogElement, Props>(({serviceId, setDeleteServiceId}, ref) => {
    const openModal = () => {
        if(ref && typeof ref !== 'function' && ref.current) ref.current.showModal();
        setDeleteServiceId(serviceId);
    }
    const newModalActionBtn = {
        ...modalActionBtn,
        onAction: openModal
    }
    return (
        <nav className="flexed">
            <NavigateButton {...newModalActionBtn} />
            <NavigateButton {...updateActionBtn} />
        </nav>
    );
});
export default ServiceButtons;