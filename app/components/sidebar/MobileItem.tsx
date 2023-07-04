'use client'

import Link from "next/link";
import clsx from "clsx";

interface MobileItemProps {
    icon: any;
    href: string;
    onClick?: () => void;
    active?: boolean;
}

const MobileItem: React.FC<MobileItemProps> = ({
    icon: Icon,
    href,
    onClick,
    active,
}) => {
    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    };

    return (
        <Link 
            href={href}
            onClick={onClick}
            className={clsx(`
            group
            flex
            gap-x-3
            p-4
            text-sm
            leading-6
            font-semibold
            w-full
            justify-center
            text-gray-500
            dark:text-gray-300
            hover:text-black
            dark:hover:text-white
            `,
            active && 'bg-gray-100 dark:bg-stone-800 text-black dark:text-white'
        )}
        >
            <Icon className="h-6 w-6"/>
        </Link>
    );
}
 
export default MobileItem;