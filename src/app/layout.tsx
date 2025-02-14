import Provider from "@/components/SessionProvider";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lamp Schedule",
  description: "App for generated lamp schedule",
  icons: {
    icon: "/favicon-dragon.png",
    shortcut: "/favicon-dragon.png",
    apple: "/favicon-dragon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 return (
  <html lang="en" suppressHydrationWarning>
    <body>
      <div className="relative overflow-hidden min-h-screen">
        <Toaster />
        <Provider>
           {children}
        </Provider>
      </div>
      
    </body>
  </html>
);






}
