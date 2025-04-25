// app/layout.tsx
import './globals.css'
import { Metadata } from 'next'
import { AuthProvider } from './context/UserContext'
import { Inter } from 'next/font/google'  
import PageLoader from '@/components/LoadingSpinner'
import { MessageProvider } from './context/MessageContext'
import { SearchProvider } from './context/SearchContext'
export const metadata: Metadata = {
  title: 'WenzeBdd',
  description: 'Plateforme de vente en ligne pour Bandundu',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <SearchProvider>
        <PageLoader />
        <MessageProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
        </MessageProvider>
        </SearchProvider>
      </body>
    </html>
  )
}