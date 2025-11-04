"use client";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks/typizedHooks";
import { setIsLoadingState } from "@/lib/utils/setIsLoadingState";
import { NavigationPropsType } from "@/types/Navigation/NavigationPropsType";

const PageNavigation: React.FC<NavigationPropsType> = ({...navigationData}) => {
    const {navClass, ulClass, liItem} = navigationData;
    const router = useRouter();
    const dispatch = useAppDispatch();
    
    const handleClick = (link: string) => {
        router.push(link);
        if(link === '/') setIsLoadingState(true, dispatch);
        
    }
    return (
        <nav className={navClass}>
            <ul className={ulClass}>
                {liItem.map((item) => {
                    return (
                        <li key={item.text} className={item.itemClass}><button onClick={() => handleClick(item.link)}>{item.text}</button></li>
                    )
                })}
            </ul>
        </nav>
    );
};
export default PageNavigation;