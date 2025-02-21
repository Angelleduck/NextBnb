import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import LoginModal from "./_components/Modal/LoginModal";
import RegisterModal from "./_components/Modal/RegisterModal";
import { Toaster } from "react-hot-toast";
import getCurrentUser from "./actions/getCurrentUser";

export const metadata: Metadata = {
  title: "Nextbnb",
  description: "Book your home",
};

const nunito = Nunito({
  subsets: ["latin"],
});
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={`${nunito.className}`}>
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        <Toaster />
        {children}
      </body>
    </html>
  );
}
