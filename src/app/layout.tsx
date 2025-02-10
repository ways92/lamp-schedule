import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";

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
  <html lang="en">
    <body>
      <div className="relative overflow-hidden min-h-screen">
        <div className="relative z-10">{children}</div>
      </div>
    </body>
  </html>
);






}
