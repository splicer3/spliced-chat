'use client'

import Avatar from "@/app/components/Avatar";
import { Conversation, Message, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { FullConversation } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import clsx from "clsx";
import GroupAvatar from "@/app/components/GroupAvatar";



interface ConversationBoxProps {
    conversation: FullConversation;
    selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
    conversation,
    selected,
}) => {
    const router = useRouter();
    const otherUser = useOtherUser(conversation);
    const session = useSession();

    const handleClick = useCallback(() => {
        router.push(`/conversations/${conversation.id}`);
    }, [conversation.id, router]);

    const lastMessage = useMemo(() => {
        const messages = conversation.messages || [];

        return messages[messages.length - 1];
    }, [conversation.messages]);

    const userEmail = useMemo(() => {
        return session.data?.user?.email;
    }, [session.data?.user?.email]);

    const hasSeen = useMemo(() => {
        if (!lastMessage) {
            return false;
        }

        const seenArray = lastMessage.seen || [];

        if (!userEmail) {
            return false;
        }

        return seenArray.filter((user) => user.email === userEmail).length != 0;
    }, [userEmail, lastMessage]);

    const lastMessageText = useMemo (() => {

        if (lastMessage?.image) {
            return 'Sent an image';
        }

        if (lastMessage?.body) {
            return lastMessage.body;
        }

        return "Started a conversation";
    }, [lastMessage])

    return (
        <div
            onClick={handleClick}
            className=
                {clsx(`
                    w-full
                    relative
                    flex
                    items-center
                    space-x-3
                    p-3
                    hover:bg-neutral-100
                    dark:hover:bg-black
                    rounded-2xl
                    transition
                    cursor-pointer
                `,
                    selected ? 'bg-neutral-100 dark:bg-black' : 'bg-transparent'
                )}
        >
            {conversation.isGroup ? (
                <GroupAvatar users={conversation.users}/>
            ) : (
                <Avatar user={otherUser}/>
            )}
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-md font-medium text-gray-900 dark:text-gray-300 truncate">
                            {conversation.name || otherUser.name}
                        </p>
                        <div className="text-xs text-gray-400 font-light">
                            {lastMessage?.createdAt && (
                                <p>
                                    {format(new Date(lastMessage.createdAt), 'p')}
                                </p>
                            )}
                        </div>
                    </div>
                    <p
                        className=
                        {clsx(`
                                truncate
                                text-sm
                        `,
                                hasSeen ? 'text-gray-500' : 'text-black dark:text-gray-100 font-medium'
                        )}
                    >
                        {lastMessageText}
                    </p>
                </div>
            </div>
        </div>
    );
}
 
export default ConversationBox;