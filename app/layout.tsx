import './globals.css'
import { Inter } from 'next/font/google'

import { Providers } from '@/providers/ThemeProvider'
import ToasterContext from './context/ToasterContext'
import AuthContext from './context/AuthContext'

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
          <AuthContext>
            <ToasterContext />
            {children}
          </AuthContext>
        </Providers>
      </body>
    </html>
  )
}
