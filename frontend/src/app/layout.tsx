import type { Metadata } from "next";
import Providers from "@/providers/Providers";
import LoadingOverlay from "@/components/UI/LoadingOverlay/LoadingOverlay";
import './globals.css';
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
    <html lang="en">
      <body>
        <Providers>
          <LoadingOverlay />
          {children}
        </Providers>
      </body>
    </html>
  );
}
