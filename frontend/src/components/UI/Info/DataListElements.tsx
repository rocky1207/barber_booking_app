import styles from './Info.module.css';
interface Props {
    day: string; 
    workingHours: string; 
    index: number; 
}
const DataListElements: React.FC<Props> = ({day, workingHours, index}) => {
    const today = new Date();
    const todayName = today.getDay();
    return (
        <>
        <dt className={index === todayName ? styles.dtBold : ''}>{day}</dt>
        <dd><span>{workingHours}</span></dd>
        </>
    );
};
export default DataListElements;