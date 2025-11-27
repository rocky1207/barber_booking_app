import type { Metadata } from "next";
import Providers from "@/providers/Providers";
import LoadingOverlay from "@/components/UI/LoadingOverlay/LoadingOverlay";
import { Inter, Playfair_Display } from "next/font/google";
import './globals.css';

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
});
export const metadata: Metadata = {
  title: "Booking app",
  description: "App for barber shop appointments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <Providers>
          <LoadingOverlay />
          {children}
        </Providers>
      </body>
    </html>
  );
}
