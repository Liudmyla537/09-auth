import type { Metadata } from "next";
import {  Roboto } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "react-hot-toast";



const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "NoteHub is an application for creating, searching and storing notes",
  openGraph: {
    title: `NoteHub - Note sharing`,
    description: `NoteHub is an application for creating, searching and storing notes`, 
    siteName: "NoteHub",
    url: `https://08-zustand-wheat-omega.vercel.app/`,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: `NoteHub - Note sharing`,
      },
    ],
    type: "website"
  }
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode; modal: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            { modal }
          </main>
          <Footer />
          <Toaster position="top-center" reverseOrder={false} />
        </TanStackProvider>
     </body>
    </html>
  );
}
