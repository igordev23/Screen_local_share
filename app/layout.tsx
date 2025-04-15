import { Clarity } from "@/components/Clarity";
import { Toaster } from "@/components/ui/toaster";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Screen Share - Compartilhe sua tela instantaneamente",
  description: "Compartilhe sua tela instantaneamente com qualquer pessoa usando um simples código de sala. Sem downloads ou cadastros.",
  keywords: "compartilhamento de tela, webrtc, compartilhar tela online, navegador, gratuito"
} satisfies Metadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <main className="flex flex-col justify-between min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-900">
          {children}

          <footer className="py-8 px-4 text-center text-sm text-gray-600">
            Desenvolvido por{" "}
            <Link
              href="https://tonghohin.vercel.app"
              className="underline hover:text-[#8DC63F]"
              target="_blank"
            >
              Igor
            </Link>
            . Código-fonte disponível no{" "}
            <Link
              href="https://github.com/igordev23/Screen_local_share"
              className="underline hover:text-[#00B1B0]"
              target="_blank"
            >
              Github
            </Link>
            .
          </footer>
        </main>
        <Clarity />
        <Toaster />
      </body>
    </html>
  );
}
