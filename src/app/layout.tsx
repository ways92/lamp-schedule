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
    <body className="relative min-h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 text-black">
      {/* Wrapper utama untuk mencegah overflow */}
      <div className="relative overflow-hidden min-h-screen">
        
        {/* Seperempat Lingkaran di Pojok Kanan Atas */}
        <div className="absolute top-[-100px] right-[-100px] w-[250px] h-[250px] bg-gray-400 rounded-full shadow-[10px_10px_30px_rgba(0,0,0,0.3)]"></div>

        {/* Gambar Dragon Berputar */}
        <div className="absolute top-[-40px] right-[-50px] w-[200px] h-[200px] flex items-center justify-center overflow-hidden">
          <div className="w-full h-full animate-[spin_30s_linear_infinite]">
            <Image
              src="/images/img-dragon.png"
              alt="Dragon"
              width={150}
              height={150}
              className="object-contain w-full h-full"
            />
          </div>
        </div>

        {/* Efek Cahaya */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-white opacity-30 blur-3xl rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gray-400 opacity-30 blur-3xl rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gray-300 opacity-20 blur-3xl rounded-full"></div>

        <div className="relative z-10">{children}</div>
      </div>
    </body>
  </html>
);






}
