import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "MedCare Connect - Your Health, Our Priority",
  description:
    "MedCare Connect provides comprehensive healthcare services including online consultations, appointment booking, prescription management, and 24/7 emergency support.",
  keywords: [
    "healthcare",
    "medical",
    "doctor",
    "appointment",
    "consultation",
    "prescription",
    "health records",
  ],
  authors: [{ name: "MedCare Connect" }],
  creator: "MedCare Connect",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://medcareconnect.com",
    title: "MedCare Connect - Your Health, Our Priority",
    description:
      "Comprehensive healthcare services at your fingertips. Book appointments, consult doctors online, and manage your health records.",
    siteName: "MedCare Connect",
  },
  twitter: {
    card: "summary_large_image",
    title: "MedCare Connect - Your Health, Our Priority",
    description:
      "Comprehensive healthcare services at your fingertips. Book appointments, consult doctors online, and manage your health records.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#1e293b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>{children}</AuthProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
