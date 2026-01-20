import { nunito } from "@/fonts/font";
import "./globals.css";
import { Toaster } from "react-hot-toast";

import type { Metadata } from "next";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "SaleScope",
  description: "Integrative project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="abyss" lang="es">
      <body className={`${nunito.className}`}>
        <Providers>
          <Toaster position="top-center" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
