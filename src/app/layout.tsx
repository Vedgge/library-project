import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Libreria ",
  description: "Libreria proyecto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <main className="px-4 m-auto grid min-h-screen max-w-screen-lg grid-rows-[60px,1fr,60px] gap-4">
          <nav className="flex items-center text-2xl">Libritos</nav>
          <section>{children}</section>
          <footer className="flex items-center justify-center">Con amor por Facundo</footer>
        </main>
      </body>
    </html>
  );
}
