import getConversations from "../actions/getConversations"
import getCurrentUser from "../actions/getCurrentUser";
import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar"
import ConversationsList from "./components/ConversationsList"

export default async function ConversationsLayout({
    children
} : {
    children: React.ReactNode
}) {
    const conversations = await getConversations();
    const users = await getUsers();
    const currentUser = await getCurrentUser();

    return (
        <Sidebar>
            <div className="h-full">
                <ConversationsList
                    currentUser={currentUser!}
                    users={users}
                    initialConversations={conversations}
                />
                {children}
            </div>
        </Sidebar>
    )
}