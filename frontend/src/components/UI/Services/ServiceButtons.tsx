"use client";
import { forwardRef } from "react";
import NavigateButton from "@/components/Button/NavigateButton";
import { modalActionBtn, updateActionBtn } from "@/datas/ButttonObjects";
const ServiceButtons = forwardRef<HTMLDialogElement>(() => {
    return (
        <nav className="flexed">
            <NavigateButton {...modalActionBtn} />
            <NavigateButton {...updateActionBtn} />
        </nav>
    );
});
export default ServiceButtons;