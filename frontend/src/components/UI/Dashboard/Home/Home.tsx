"use client";
import {useEffect, useRef} from "react";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import BarberItem from "@/components/UI/Barbers/BarberItem";
import BarberButtons from "@/components/UI/Barbers/BarberButtons";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import ConfirmModal from "@/components/UI/Modals/ConfirmModal/ConfirmModal";
import { deleteBtn } from "@/datas/ButttonObjects";
import { deleteItemsById } from "@/lib/api/deleteItemsById";
import { BasicBarberType } from "@/types/Barbers/BarbersType";


const Home: React.FC<{barbers: BasicBarberType[], actionBarberId: number | undefined}> = ({barbers, actionBarberId}) => {
  const dialog = useRef<HTMLDialogElement | null>(null);
  
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    setIsLoadingState(false, dispatch);
  }, []);
  
  const updatedDeleteBtn = {
    ...deleteBtn,
    action: 'DELETE_BARBER',
    id: actionBarberId,
    onAction: deleteItemsById
  }
    
  return (
    <>
    <ConfirmModal ref={dialog} {...updatedDeleteBtn}  />
    <section>
      <nav aria-label="Manage barber navigation">
      <ul>
        {barbers?.map((barber, index) => {
          return (
            <BarberItem  key={barber.id} {...barber} index={index}>
              <BarberButtons ref={dialog} barberId={barber.id} />
            </BarberItem>
          )
        })}
      </ul>
    </nav>
    </section>
    </>  
  );
};
export default Home;