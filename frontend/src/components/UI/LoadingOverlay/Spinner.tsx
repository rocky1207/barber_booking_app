import { useAppSelector } from '@/store/hooks/typizedHooks';
import { RootState } from '@/store/store';
import styles from './LoadingOverlay.module.css';
const Spinner: React.FC = () => {
    const isLoading = useAppSelector((state: RootState) => state.ui.isLoading);
    if (!isLoading) return null;
    return (
        <div className={`wrapp ${styles.spinner}`} />
    );
};
export default Spinner;