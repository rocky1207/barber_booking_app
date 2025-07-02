import { uiActions } from "@/store/slices/UiSlice";
import { AppDispatch } from "@/store/store";
export const isLoadingState = (data: true | false, dispatch: AppDispatch): void => {
      dispatch(uiActions.setIsLoading(data));
      
    } 