"use client";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import { NavigationPropsType } from "@/types/Navigation/NavigationPropsType";
import { usePathname } from "next/navigation";
import styles from './PageNavigation.module.css';
import { link } from "fs";

const PageNavigation: React.FC<NavigationPropsType> = ({...navigationData}) => {
    const {navClass, ulClass, liItem} = navigationData;
    const pathName = usePathname();
    
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleClick = (link: string) => {
        console.log(link);
        router.push(link);
        if(pathName !== '/' && link === '/') setIsLoadingState(true, dispatch);
        if(link === 'appointments/client') setIsLoadingState(true, dispatch);
    }
    return (
        <nav className={navClass && styles[navClass]}>
            <ul className={ulClass && styles[ulClass]}>
                {liItem.map((item) => {
                    return (
                        <li key={item.text} className={item.itemClass && styles[item.itemClass]}><button onClick={() => handleClick(item.link)}>{item.text}</button></li>
                    )
                })}
            </ul>
        </nav>
    );
};
export default PageNavigation;