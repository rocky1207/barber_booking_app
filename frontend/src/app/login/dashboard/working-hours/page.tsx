'use client';
import WorkingHoursManager from '@/components/UI/WorkingHours/WorkingHoursManager/WorkingHoursManager';
import PageNavigation from '@/components/UI/PageNavigation/PageNavigation';
import { resetPasswordPageNav } from '@/datas/NavigationObjects';

const WorkingHoursPage = () => {
    const workingHoursPageNav = {
        ...resetPasswordPageNav,
        liItem: [{...resetPasswordPageNav.liItem[0],link: '/login/dashboard'}]
    }
         return (
            <>
            <PageNavigation {...workingHoursPageNav}/>
            <WorkingHoursManager />
            </>
        );
    };
export default WorkingHoursPage;





