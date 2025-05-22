import "@/styles/globals.scss";
import type { Metadata } from "next";
import { Kanit } from "next/font/google";

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Unvoid Chess Game Challenge",
  description: "Programming challenge to implement a custom chess game.",
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
