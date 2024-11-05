import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";

const ubuntu = Ubuntu({ weight: ['300', '400', '500', '700'], subsets: ['latin', 'latin-ext'] });

export const metadata: Metadata = {
  title: "Oil Worth",
  description: "How much oil are my actions worth?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ubuntu.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
