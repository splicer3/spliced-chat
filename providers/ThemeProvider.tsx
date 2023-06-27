'use client'

import { ThemeProvider } from "next-themes"
import { ReactNode } from "react"

interface ThemeProviderProps {
    children: ReactNode
}

export function Providers({ children }: ThemeProviderProps) {
    return <ThemeProvider>{children}</ThemeProvider>
}