'use client'

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";
import MobileItem from "./MobileItem";

const MobileFooter = () => {
    const routes = useRoutes();
    const { isOpen } = useConversation();

    if (isOpen) {
        return null;
    }

    return (
        <div
            className="
                fixed
                justify-between
                w-full
                bottom-0
                z-40
                flex
                items-center
                bg-white
                dark:bg-slate-950
                border-t-[1px]
                dark:border-t-gray-800
                lg:hidden
            "
        >
            {routes.map((route) => (
                <MobileItem
                    key={route.href}
                    href={route.href}
                    active={route.active}
                    icon={route.icon}
                    onClick={route.onClick}
                />
            ))}
        </div>
    );
}
 
export default MobileFooter;