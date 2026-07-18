import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auralux Pro Detail Page",
  description: "Premium ecommerce product details page"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
