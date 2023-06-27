'use client'

import { useTheme } from "next-themes";
import Image from "next/image";

import LightLogo from "@/public/images/LogoLight.png"
import DarkLogo from "@/public/images/LogoDark.png"

const LogoImage = () => {
    const { resolvedTheme } = useTheme();

    return (
        resolvedTheme === 'dark' ? (
            <Image
            src={DarkLogo}
            alt="Dark Logo"
            className="mx-auto w-auto"
            width="100"
            height="100"
            />                
        ) : (
            <Image
                src={LightLogo}
                alt="Light Logo"
                className="mx-auto w-auto"
                width="100"
                height="100"
            />
        )        
    );
}
 
export default LogoImage;