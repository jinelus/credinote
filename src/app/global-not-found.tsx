import { FileQuestion, Home } from 'lucide-react'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Link from 'next/link'
import { Container } from '@/src/components/base-components/container'
import './globals.css'
import { Button } from '../components/ui/button'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'JCB Mercado',
  description: 'Sistema de gestão para JCB Mercado',
}

export default function NotFound() {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Container className="flex min-h-[80vh] flex-col items-center justify-center">
          <div className="text-center">
            <div className="mb-8 flex justify-center">
              <div className="rounded-full bg-slate-100 p-6">
                <FileQuestion className="h-16 w-16 text-slate-400" />
              </div>
            </div>

            <h1 className="mb-2 font-bold text-6xl text-slate-800">404</h1>
            <h2 className="mb-4 font-semibold text-2xl text-slate-700">Página não encontrada</h2>
            <p className="mx-auto mb-8 max-w-md text-slate-500">
              Desculpe, a página que você está procurando não existe ou foi movida.
            </p>

            <Link href="/">
              <Button className="inline-flex items-center gap-2">
                <Home className="h-4 w-4" />
                Voltar ao Dashboard
              </Button>
            </Link>
          </div>
        </Container>
      </body>
    </html>
  )
}
