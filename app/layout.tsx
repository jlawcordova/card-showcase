import type { Metadata } from "next";
import { Inter, PT_Sans } from "next/font/google";
import "./globals.css";

const ptSans = PT_Sans({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Pokemon TCG - JelloCornetto's Trading Post",
  description: "Jello Cornetto's list of cards for trading and wishlist",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${ptSans.className}`}>{children}</body>
    </html>
  );
}
