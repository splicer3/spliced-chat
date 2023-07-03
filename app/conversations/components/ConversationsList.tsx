'use client'

import useConversation from "@/app/hooks/useConversation";
import { FullConversation } from "@/app/types";

import clsx from "clsx";
import { MdOutlineGroupAdd } from "react-icons/md"
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConversationBox from "./ConversationBox";

interface ConversationsListProps {
    initialConversations: FullConversation[];
}

const ConversationsList: React.FC<ConversationsListProps> = ({
    initialConversations
}) => {
    const [conversations, setConversations] = useState(initialConversations);
    const router = useRouter();
    const { conversationId, isOpen } = useConversation();
    return (
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
                    dark:border-gray-900
                `,
                    isOpen ? 'hidden' : 'block left-0 w-full'
                )}
        >
            <div className="px-5">
                <div className="flex justify-between mb-4 pt-4">
                    <div className="text-2xl font-bold text-neutral-800 dark:text-gray-200">
                        Chat
                    </div>
                    <div className="rounded-full p-2 bg-gray-100 dark:bg-neutral-700 text-gray-600 dark:text-gray-300 hover:opacity-75 transition">
                        <MdOutlineGroupAdd size={20}/>
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
    );
}
 
export default ConversationsList;