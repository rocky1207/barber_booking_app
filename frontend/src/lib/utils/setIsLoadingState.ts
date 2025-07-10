import { uiActions } from "@/store/slices/UiSlice";
import { AppDispatch } from "@/store/store";
export const setIsLoadingState = (data: true | false, dispatch: AppDispatch): void => {
      dispatch(uiActions.setIsLoading(data));
      
    } 