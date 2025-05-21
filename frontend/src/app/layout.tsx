import type { Metadata } from "next";
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
        {children}
      </body>
    </html>
  );
}
