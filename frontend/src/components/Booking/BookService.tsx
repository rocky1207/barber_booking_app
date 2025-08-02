"use client";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/store/hooks/typizedHooks";
import { RootState } from "@/store/store";
const BookService: React.FC = () => {
    const {services} = useAppSelector((state: RootState) => state?.service);
    console.log(services);
    const params = useSearchParams();
    const strServiceId = params.get('serviceId');
    const serviceId = strServiceId ? parseInt(strServiceId, 10) : null;
    const service = services.find(service => service.id === serviceId);
    console.log(service);
    return (
        <h1>BOOK SERVICE</h1>
    );
};
export default BookService;