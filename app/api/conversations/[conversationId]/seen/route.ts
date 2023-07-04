import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb"

import { NextResponse } from "next/server";

interface IParams {
    conversationId?: string;
};

export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const currentUser = await getCurrentUser();
        const {
            conversationId
        } = params;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse("Unautorized access", { status: 401 });
        }

        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include : {
                messages: {
                    include: {
                        seen: true
                    }
                },
                users: true,
            }
        });

        if (!conversation) {
            return new NextResponse("Invalid Conversation ID", { status: 500 });
        }

        const lastMessage = conversation.messages[conversation.messages.length - 1];

        if (!lastMessage) {
            return NextResponse.json(conversation);
        }

        const updatedLastMessage = await prisma.message.update({
            where: {
                id: lastMessage.id
            },
            include: {
                sender: true,
                seen: true
            },
            data: {
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            }
        });

        return NextResponse.json(updatedLastMessage);

    } catch (error: any) {
        // TODO REMOVE BEFORE PROD
        console.log(error, 'ERROR_MESSAGES_SEEN')
        return new NextResponse("Internal Error", { status: 500 });
    }
}