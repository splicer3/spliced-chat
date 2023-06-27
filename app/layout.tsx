import './globals.css'
import { Inter } from 'next/font/google'

import { Providers } from '@/providers/ThemeProvider'
import ToasterContext from './context/ToasterContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Spliced',
  description: 'Messenger clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ToasterContext />
          {children}
        </Providers>
      </body>
    </html>
  )
}
