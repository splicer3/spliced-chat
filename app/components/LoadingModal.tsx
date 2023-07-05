'use client'

import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HashLoader } from "react-spinners";
import { useTheme } from "next-themes";

const LoadingModal = () => {
    const {resolvedTheme} = useTheme();
    const color = resolvedTheme === 'dark' ? '#ebb70e' : '#1ad6aa';

    return (
        <Transition.Root show as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => {}}>
                <Transition.Child as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="
                        fixed
                        inset-0
                        bg-gray-100
                        dark:bg-stone-700
                        bg-opacity-50
                        dark:bg-opacity-40
                        transition-opacity
                    ">

                    </div>
                </Transition.Child>
                <div className="
                    fixed
                    inset-0
                    z-10
                    overflow-y-auto
                ">
                    <div className="
                        flex
                        min-h-full
                        items-center
                        justify-center
                        p-4
                        text-center
                    ">
                        <Dialog.Panel>
                            <HashLoader size={40} color={color} />
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default LoadingModal;