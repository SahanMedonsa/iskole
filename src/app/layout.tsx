"use client";
// TypeScript may complain about missing type declarations for CSS modules
// when importing global CSS. Suppress that check for this side-effect import.
// @ts-ignore
import "../styles/globals.css";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
