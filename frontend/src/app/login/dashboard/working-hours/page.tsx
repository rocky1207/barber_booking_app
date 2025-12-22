'use client';
import WorkingHoursManager from '@/components/UI/WorkingHours/WorkingHoursManager/WorkingHoursManager';
import ClientNavigation from '@/components/UI/ClientNavigation/ClientNavigation';
import Header from '@/components/UI/Header/Header';
import { clientsHeaderNav } from '@/datas/NavigationObjects';

const WorkingHoursPage = () => {
    const workingHoursPageNav = {
        ...clientsHeaderNav,
        liItem: [{...clientsHeaderNav.liItem[0], text: 'POČETNA', link: '/'},
        {text: '<<', itemClass: 'separateLi', link: '/login/dashboard'}]
    }
         return (
            <>
            <Header>
                <ClientNavigation {...workingHoursPageNav}/>
            </Header>
            <WorkingHoursManager />
            </>
        );
    };
export default WorkingHoursPage;





