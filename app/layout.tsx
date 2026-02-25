import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import LoginModal from "./_components/Modal/LoginModal";
import RegisterModal from "./_components/Modal/RegisterModal";
import { Toaster } from "react-hot-toast";
import CreateRentModal from "./_components/Modal/CreateRentModal";

export const metadata: Metadata = {
  title: "Nextbnb",
  description: "Book your home",
};

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
});
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className}`}>
        <LoginModal />
        <RegisterModal />
        <CreateRentModal />
        <Navbar />
        <Toaster />
        {children}
      </body>
    </html>
  );
}
