'use client'

import { User } from "@prisma/client";

import Image from "next/image";
import Placeholder from "@/public/images/placeholder.jpg";

interface AvatarProps {
    user?: User;
}

const Avatar: React.FC<AvatarProps> = ({
    user
}) => {
    return (
        <div className="relative">
            <div
                className="
                    relative
                    inline-block
                    rounded-full
                    overflow-hidden
                    h-9
                    w-9
                    md:h-11
                    md:w-11
                "
            >
                <Image
                    alt="Avatar"
                    src={user?.image || Placeholder}
                    fill
                />
            </div>
        <span className="absolute block rounded-full bg-teal-500 dark:bg-amber-500 ring-2 ring-white dark:ring-stone-800 top-0 right-0 h-2 w-2 md:h-3 md:w-3"/>
        </div>
    );
}
 
export default Avatar;