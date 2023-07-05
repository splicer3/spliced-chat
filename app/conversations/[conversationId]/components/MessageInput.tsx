'use client'

import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

interface MessageInputProps {
    placeholder?: string;
    id: string;
    required?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
    placeholder,
    id,
    required,
}) => {
    const TextAreaRef = useRef<HTMLTextAreaElement | null>();
    const [value, setValue] = useState("");
    const { register, formState: { errors }} = useFormContext();
    const { ref, ...rest } = register('message');

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
    }, [TextAreaRef, value]);

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