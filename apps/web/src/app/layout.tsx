import type { Metadata } from "next";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
// These styles apply to every route in the application
import "./globals.css";
import { SelectedCharacterProvider } from "@/context/selected-character-context";

export const metadata: Metadata = {
  title: "Rick & Morty",
  description: "Rick & Morty",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SelectedCharacterProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </SelectedCharacterProvider>
  );
}
