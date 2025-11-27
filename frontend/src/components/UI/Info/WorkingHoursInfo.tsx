import ArrowDown from "../SvgIcons/ArrowDown";
import ArrowUp from "../SvgIcons/ArrowUp";
import styles from './Info.module.css';

interface Props {
    showDataList: boolean;
    setShowDataList: React.Dispatch<React.SetStateAction<boolean>>
}
const WorkingHoursInfo: React.FC<Props> = ({showDataList, setShowDataList}) => {
    const svgArrowData = {
        width: "20", 
        height: "16", 
        fill: "#B8941F"
    }
    const handleArrowChange = () => {
        setShowDataList(!showDataList);
    }
  
    return (
        <div className={styles.workingHoursDiv}>
            <p className={styles.workingHoursPharaph}>Radno vreme</p>
            <div className={styles.iconWrap}>
                <button onClick={handleArrowChange}>{!showDataList ?<ArrowDown {...svgArrowData}/> : <ArrowUp {...svgArrowData}/>}</button>
            </div>
        </div>
    );
};
export default WorkingHoursInfo;