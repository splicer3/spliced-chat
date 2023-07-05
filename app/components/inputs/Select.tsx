'use client'

import ReactSelect from "react-select";
import SingleValue from "react-select/dist/declarations/src/components/SingleValue";

interface SelectProps {
    label: string;
    value?: Record<string, any>;
    onChange: (value: Record<string, any>) => void;
    options: Record<string, any>[];
    disabled?: boolean
}

const Select: React.FC<SelectProps> = ({
    label,
    value,
    onChange,
    options,
    disabled
}) => {
    return (
        <div className="z-[100]">
            <label
                className="
                    block
                    text-sm
                    font-medium
                    leading-6
                    text-gray-900
                    dark:text-gray-100
                "
            >
                {label}
            </label>
            <div className="mt-2">
                <ReactSelect
                    isDisabled={disabled}
                    value={value}
                    onChange={onChange}
                    isMulti
                    options={options}
                    menuPortalTarget={document.body}
                    unstyled
                    styles={{
                        menuPortal: (base) => ({
                            ...base,
                            zIndex: 9999
                        })
                    }}
                    classNames={{
                        control: () => `
                        form-input
                        block
                        w-full
                        rounded-md
                        border-0
                        py-1.5
                        text-gray-900
                        dark:text-gray-100
                        dark:bg-stone-800
                        hover:shadow-[rgba(0,_0,_0,_0.4)_0px_2px_7px]
                        dark:hover:shadow-[rgba(255,_255,_255,_0.4)_0px_6px_21px]
                        ring-1
                        ring-inset
                        ring-gray-300
                        sm:text-sm
                        sm:leading-6
                        `,
                        multiValue: () => `
                            text-teal-500
                            dark:text-amber-500
                            hover:text-teal-600
                            dark:hover:text-amber-600
                            bg-gray-100
                            dark:bg-stone-700
                            px-2
                            rounded-full
                            my-1
                        `,
                        option: () => `
                            hover:text-teal-500
                            dark:hover:text-amber-500
                            hover:cursor-pointer
                            pl-3
                            py-2
                        `,
                        menu: () => `
                            bg-gray-100
                            dark:bg-stone-800
                            rounded-md
                        `,
                        multiValueRemove: () => `
                           text-red-500
                           ml-1
                           px-2
                           hover:bg-rose-500/10
                           rounded-full
                        `,
                        clearIndicator: () => `
                            hover:text-teal-500
                            dark:hover:text-amber-500
                            hover:cursor-pointer
                        `,
                        dropdownIndicator: () => `
                            hover:text-teal-500
                            dark:hover:text-amber-500
                            hover:cursor-pointer
                    `,
                        noOptionsMessage: () => `
                            text-rose-500
                            py-2
                        `
                    }}
                />
            </div>
        </div>
    );
}
 
export default Select;