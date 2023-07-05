'use client'

import useConversation from "@/app/hooks/useConversation";
import { FullConversation } from "@/app/types";

import clsx from "clsx";
import { MdOutlineGroupAdd, MdSettings } from "react-icons/md"
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ConversationBox from "./ConversationBox";
import GroupModal from "./GroupModal";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";
import SettingsModal from "@/app/components/sidebar/SettingsModal";

interface ConversationsListProps {
    initialConversations: FullConversation[];
    users: User[];
    currentUser: User;
}

const ConversationsList: React.FC<ConversationsListProps> = ({
    initialConversations,
    users,
    currentUser
}) => {
    const session = useSession();
    const router = useRouter();

    const [conversations, setConversations] = useState(initialConversations);
    const [groupModalOpen, setGroupModalOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const { conversationId, isOpen } = useConversation();

    const pusherKey = useMemo(() => {
        return session.data?.user?.email;
    }, [session.data?.user?.email]);

    useEffect(() => {
        if (!pusherKey) {
            return;
        }

        pusherClient.subscribe(pusherKey);

        const newHandler = (conversation: FullConversation) => {
            setConversations((current) => {
                if (find(current, { id: conversation.id })) {
                    return current;
                }

                return [conversation, ...current];
            })
        };

        const updateHandler = (conversation: FullConversation) => {
            setConversations((current) => current.map((currentConversation) => {
                if (currentConversation.id === conversation.id) {
                    return {
                        ...currentConversation,
                        messages: conversation.messages
                    }
                }
                
                return currentConversation;
            }))
        };

        const removeHandler = (conversation: FullConversation) => {
            setConversations((current) => {
                return [...current.filter((currentConversation) => currentConversation.id != conversation.id)]
            });

            if (conversationId === conversation.id) {
                router.push('/conversations')
            }
        };

        pusherClient.bind('conversation:new', newHandler);
        pusherClient.bind('conversation:update', updateHandler);
        pusherClient.bind('conversation:remove', removeHandler);

        return () => {
            pusherClient.unsubscribe(pusherKey);
            pusherClient.unbind('conversation:new', newHandler);
            pusherClient.unbind('conversation:update', updateHandler);
            pusherClient.unbind('conversation:remove', removeHandler);
        }
    }, [pusherKey, conversationId, router])

    return (
        <>
            <GroupModal
                isOpen={groupModalOpen}
                onClose={() => setGroupModalOpen(false)}
                users={users}
            />
            <SettingsModal
                currentUser={currentUser}
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
            />
            <aside
                className=
                    {clsx(`
                        fixed
                        inset-y-0
                        pb-20
                        lg:pb-0
                        lg:left-20
                        lg:w-80
                        lg:block
                        overflow-y-auto
                        border-r
                        border-gray-200
                        dark:border-stone-900
                    `,
                        isOpen ? 'hidden' : 'block left-0 w-full'
                    )}
            >
                <div className="px-5">
                    <div className="flex justify-between mb-4 pt-4">
                        <div className="text-2xl font-bold text-neutral-800 dark:text-gray-200">
                            Chat
                        </div>
                        <div className="flex justify-end gap-x-3">
                            <div
                                onClick={() => setGroupModalOpen(true)}
                                className="
                                    rounded-full
                                    p-2
                                    bg-gray-100
                                    dark:bg-stone-700
                                    text-gray-600
                                    dark:text-gray-300
                                    hover:opacity-75
                                    hover:cursor-pointer
                                    transition">
                                <MdOutlineGroupAdd size={20}/>
                            </div>
                            <div
                            onClick={() => setIsSettingsOpen(true)}
                            className="
                                lg:hidden
                                rounded-full
                                p-2
                                bg-gray-100
                                dark:bg-stone-700
                                text-gray-600
                                dark:text-gray-300
                                hover:opacity-75
                                hover:cursor-pointer
                                transition
                            "
                            >
                            <MdSettings size={20}/>
                            </div>
                        </div>
                    </div>
                    {conversations.map((conversation) => (
                        <ConversationBox
                            key={conversation.id}
                            conversation={conversation}
                            selected={conversation.id === conversationId}
                        />
                    ))}
                </div>
            </aside>
        </>
    );
}
 
export default ConversationsList;