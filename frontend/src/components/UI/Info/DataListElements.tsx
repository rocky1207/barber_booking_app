interface Props {
    day: string; 
    workingHours: string;  
}
const DataListElements: React.FC<Props> = ({day, workingHours}) => {
    return (
        <>
        <dt>{day}</dt>
        <dd><span>{workingHours}</span></dd>
        </>
    );
};
export default DataListElements;