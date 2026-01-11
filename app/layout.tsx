import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Toaster } from 'react-hot-toast';
import { StoreProvider } from "@/store/StoreProvider";

export const metadata: Metadata = {
  title: "Travel Trucks",
  description: "Travel Trucks - a page where you can rent a camper for your trip",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <TanStackProvider>
            <Header />
            {children}
            <Toaster position="top-right" reverseOrder={false} />
          </TanStackProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
