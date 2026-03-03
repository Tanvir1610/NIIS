import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { LayoutClient } from './layout-client'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'NIIS 2026 - International Conference on Integrated and Intelligent Systems',
  description: 'Join NIIS 2026, a premier international conference on next-gen integrated and intelligent systems. December 15-17, 2026.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  )
}
