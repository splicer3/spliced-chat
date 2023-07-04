'use client'

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";

const Form = () => {
    const { conversationId } = useConversation();
    const methods = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        axios.post('/api/messages', {
            ...data,
            conversationId
        });
    }

    const handleUpload = (result: any) => {
        axios.post('/api/messages', {
            image: result?.info?.secure_url,
            conversationId
        })
    }
    return (
        <div
            className="
                py-4
                px-4
                bg-transparent
                border-t
                dark:border-t-gray-800
                flex
                items-center
                gap-2
                lg:gap-4
                w-full
            "
        >   
            <CldUploadButton
                options={{ maxFiles: 1}}
                onUpload={handleUpload}
                uploadPreset="messenger"
            >
            <HiPhoto 
                size={30}
                className="
                    text-teal-500
                    hover:text-teal-600
                    dark:text-amber-500
                    dark:hover:text-amber-600
                    transition
                    cursor-pointer
                "
            />
            </CldUploadButton>
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="flex items-center gap-2 lg:gap-4 w-full"
                >
                    <MessageInput
                        id="message"
                        required
                        placeholder="Type here..."
                    />
                    <button
                        type="submit"
                        className="
                            rounded-full
                            p-2
                            bg-teal-500
                            dark:bg-amber-500
                            hover:bg-teal-600
                            dark:hover:bg-amber-600
                            cursor-pointer
                            transition
                        "
                    >
                        <HiPaperAirplane
                            size={18}
                            className="text-white dark:text-black"
                        />
                    </button>
                </form>
            </FormProvider>
        </div>
    );
}
 
export default Form;