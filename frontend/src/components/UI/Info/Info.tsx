'use client';
import { useState } from "react";
import Clock from "../SvgIcons/Clock";
import WorkingHoursInfo from "./WorkingHoursInfo";
import DataListElements from "./DataListElements";
import { weeklyOpeningHours } from "@/datas/DataListObjects";
import styles from './Info.module.css';

const Info: React.FC = () => {
    const [showDataList, setShowDataList] = useState<boolean>(false);
    const svgData = {
        fill: "#B8941F"
    }
    return (
    <div className={`${styles.infoSection}`}>
        <div className={styles.infoFlex}>
            <Clock {...svgData} />
            <WorkingHoursInfo showDataList={showDataList} setShowDataList={setShowDataList} />
        </div>
        <div className={`${styles.dlWrap} ${showDataList ? styles.dlWrapOpen : ''}`}>
        {showDataList && <dl className={`${styles.dl} ${showDataList && styles.dlOpen} : ""`} aria-label="Weekly opening hours">
            {weeklyOpeningHours.map((day, index) => {
                const updatedDay = {...day, index}
                return (
                    <DataListElements key={day.day} {...updatedDay} />
                )
            })}
        </dl>}
        </div>
    </div>
    );
};
export default Info;