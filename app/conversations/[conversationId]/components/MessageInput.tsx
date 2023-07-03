'use client'

import { useEffect, useRef, useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
    placeholder?: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors
}

const MessageInput: React.FC<MessageInputProps> = ({
    placeholder,
    id,
    type,
    required,
    register,
    errors
}) => {
    const TextAreaRef = useRef<HTMLTextAreaElement>(null);
    const [value, setValue] = useState("");

    const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = evt.target?.value;
        setValue(val);
    };

    useEffect(() => {
        if (TextAreaRef) {
            // Momentarily resetting the height to get the correct scrollHeight for the textarea
            TextAreaRef.current!.style.height = "0px";
            const scrollHeight = TextAreaRef.current!.scrollHeight;

            TextAreaRef.current!.style.height = scrollHeight + "px";
          }
    }, [TextAreaRef, value])

    return (
        <div className="relative w-full flex items-center">
            <textarea
                id={id}
                form="messageForm"
                autoComplete={id}
                {...register("message")}
                placeholder={placeholder}
                rows={1}
                ref={TextAreaRef}
                onChange={handleChange}
                value={value}
                className="
                    text-black
                    dark:text-gray-100
                    font-light
                    py-2
                    px-4
                    bg-neutral-100
                    dark:bg-slate-950
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