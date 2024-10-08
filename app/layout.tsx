import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { cookies } from "next/headers"
import { SessionProvider } from "./components/SessionContext"
import { Toaster } from "@/components/ui/toaster"
import { TaskProvider } from "./components/TaskContext"
import { ModalProvider } from "./components/ModalContext"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const sessionId = cookies().get("SessionId")?.value ?? null

  return (
    <html lang="en">
      <SessionProvider initialSessionId={sessionId}>
        <TaskProvider>
          <ModalProvider>
            <body
              className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}>
              {children}
              <Toaster />
            </body>
          </ModalProvider>
        </TaskProvider>
      </SessionProvider>
    </html>
  )
}
