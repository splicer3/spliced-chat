'use client'

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FieldValues, SubmitHandler, useFormContext } from "react-hook-form";

interface MessageInputProps {
    placeholder?: string;
    id: string;
    required?: boolean;
    conversationId: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
    placeholder,
    id,
    required,
    conversationId
}) => {
    const TextAreaRef = useRef<HTMLTextAreaElement | null>();
    const [text, setText] = useState("");
    const isMobile = window.innerWidth <= 640;

    const { register, formState: { errors }, handleSubmit, setValue } = useFormContext();
    const { ref, ...rest } = register('message');

    const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = evt.target?.value;
        setText(val);
    };

    useEffect(() => {
        if (TextAreaRef) {
            // Momentarily resetting the height to get the correct scrollHeight for the textarea
            TextAreaRef.current!.style.height = "0px";
            const scrollHeight = TextAreaRef.current!.scrollHeight;

            TextAreaRef.current!.style.height = scrollHeight + "px";
          }
    }, [TextAreaRef, text]);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data)
        setValue('message', '', { shouldValidate: true });
        setText('');
        axios.post('/api/messages', {
            ...data,
            conversationId
        });
    }

    const onKeyPress = (e: React.KeyboardEvent) => {
        if(e.key === "Enter" && e.shiftKey == false) {
          e.preventDefault();
          handleSubmit(onSubmit)();
        }
        else {
            setValue('message', text, { shouldValidate: true });
        }
      }

    return (
        <div className="relative w-full flex items-center">
            <textarea
                id={id}
                autoComplete={id}
                {...rest}
                name="message"
                ref={(reference) => {
                    ref(reference)
                    TextAreaRef.current = reference
                }}
                placeholder={placeholder}
                rows={1}
                onChange={handleChange}
                onKeyDown={isMobile? () => {} : onKeyPress}
                required={required}
                className="
                    text-black
                    dark:text-gray-100
                    font-light
                    py-2
                    px-4
                    bg-neutral-100
                    dark:bg-stone-800
                    w-full
                    rounded-r-lg
                    rounded-l-lg
                    focus:outline-none
                    overflow-hidden
                    resize-none
                "
            />
        </div>
    );
}
 
export default MessageInput;