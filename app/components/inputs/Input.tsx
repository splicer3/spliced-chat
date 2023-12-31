'use client'

import clsx from "clsx";

import { FieldErrors, FieldValues, UseFormRegister, } from "react-hook-form";

interface InputProps {
    label: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
    label,
    id,
    type,
    required,
    register,
    errors,
    disabled,
}) => {
    return (
        <div>
            <label 
                htmlFor={id}
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                    {label}
            </label>
            <div className="mt-2">
                <input
                    id={id}
                    type={type}
                    autoComplete={id}
                    disabled={disabled}
                    {...register(id, { required })}
                    className={
                    clsx(`
                        form-input
                        block
                        w-full
                        rounded-md
                        border-0
                        py-1.5
                        text-gray-900
                        dark:text-gray-100
                        dark:bg-stone-800
                        shadow-sm
                        hover:shadow-[rgba(0,_0,_0,_0.4)_0px_2px_7px]
                        dark:hover:shadow-[rgba(255,_255,_255,_0.4)_0px_6px_21px]
                        ring-1
                        ring-inset
                        ring-gray-300
                        placeholder:text-gray-400
                        focus:ring-2
                        focus:ring-inset
                        focus:ring-light-100
                        dark:focus:ring-dark-100
                        focus:shadow-light-100/50
                        dark:focus:shadow-dark-100/50
                        sm:text-sm
                        sm:leading-6
                        `,
                        errors[id] && "focus:ring-rose-500",
                        disabled && "opacity-50 cursor-default"
                    )}
                />
            </div>
        </div>
    );
}
 
export default Input;