import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Family Tree',
  description: 'Next.js 15 Family Tree Website with public viewing and authenticated editing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}