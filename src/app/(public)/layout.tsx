// app/(public)/layout.tsx
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={inter.className}>
      <main className="min-h-screen pb-20 pt-25">
        <Navbar />
        {children}
      </main>
      <Footer />
    </div>
  )
}