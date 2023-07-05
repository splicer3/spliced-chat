'use client'

import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import ProfileDrawer from "./ProfileDrawer";
import GroupAvatar from "@/app/components/GroupAvatar";
import useActiveList from "@/app/hooks/useActiveList";

import Link from "next/link";
import { useMemo, useState } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";

interface HeaderProps {
    conversation: Conversation & {
        users: User[]
    }
};

const Header: React.FC<HeaderProps> = ({
    conversation
}) => {
    const otherUser = useOtherUser(conversation);

    const [drawerOpen, setDrawerOpen] = useState(false);

    const { members } = useActiveList();
    const isActive = members.indexOf(otherUser?.email!) != -1;

    const statusText = useMemo(() => {
        if (conversation.isGroup) {
            return `${conversation.users.length} members`;
        }

        return isActive ? 'Active' : 'Offline';
    }, [conversation, isActive]);

    return (
        <>
            <ProfileDrawer
                conversation={conversation}
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />
            <div
                className="
                    bg-transparent
                    w-full
                    flex
                    border-b-[1px]
                    dark:border-b-stone-800
                    sm:px-4
                    py-3
                    px-4
                    lg:px-6
                    justify-between
                    items-center
                    shadow-sm
                    dark:shadow-white/10
                "
            >
                <div className="flex gap-3 items-center">
                    <Link
                        href="/conversations"
                        className="
                            lg:hidden
                            block
                            text-teal-500
                            hover:text-teal-600
                            dark:text-amber-500
                            dark:hover:text-amber-600
                            transition
                            cursor-pointer
                        "
                    >
                        <HiChevronLeft size={32}/>
                    </Link>
                    {conversation.isGroup ? (
                        <GroupAvatar users={conversation.users}/>
                    ): (
                        <Avatar user={otherUser}/>
                    )}
                    <div className="flex flex-col">
                        <div>
                            {conversation.name || otherUser.name}
                        </div>
                        <div className="text-sm font-light text-neutral-500 dark:text-neutral-400">
                            {statusText}
                        </div>
                    </div>
                </div>
                <HiEllipsisHorizontal
                    size={32}
                    onClick={() => setDrawerOpen(true)}
                    className="
                    text-teal-500
                    hover:text-teal-600
                    dark:text-amber-500
                    dark:hover:text-amber-600
                    transition
                    cursor-pointer
                "
                />
            </div>
        </>
    );
}
 
export default Header;