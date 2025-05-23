import "@/styles/globals.scss";
import type { Metadata } from "next";
import { Kanit } from "next/font/google";

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dynamic Chess",
  description: "A dynamic and responsive chessboard in Next.js/React with customizable dimensions and specific movement pieces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${kanit.variable}`}>
        {children}
      </body>
    </html>
  );
}
