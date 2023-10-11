import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-json-view-lite/dist/index.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Startup Time!',
  description: 'Find relations between employees, companies and acquisitions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
