import { ReactNode } from "react";
import Navigation from "./_components/Navigation";
import Logo from "./_components/Logo";

import "@/app/_styles/globals.css"

type RootLayoutProps = {
  children: ReactNode
}

export const metadata = {
  title: "The Wild Oasis",
};

export default function RootLayout({children}: RootLayoutProps) {
  return (
  <html lang="en">
    <body className="bg-primary-950 text-primary-100 min-h-screen">
      <header>
      <Logo />
      <Navigation />
      </header>
      <main>
        {children}
      </main>
      <footer>Copyright by The Wild Oasis</footer>
    </body>
  </html>
  )
}