import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import LocalFont from "next/font/local";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

 export const poppins = LocalFont({
  src:"./fonts/Poppins-ExtraBoldItalic.ttf"
  , variable: "--font-poppins",
  weight: "800",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-amber-300`}
  >
      <Navbar />
      {children} 
      </body>
    </html>
  );
}
