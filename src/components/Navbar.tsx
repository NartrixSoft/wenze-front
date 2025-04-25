'use client'

import { FC } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Home, MessageCircle, ShoppingCart, Store, User as UserIcon } from "lucide-react"
import LiveSearch from './LiveSearch'
import { useSearch } from "@/app/context/SearchContext"
import LiveStoreSearch from "./LiveSearchStore"
import { useUser } from "@/app/context/UserContext"

const Navbar: FC = () => {
  const pathname = usePathname()
  const { setSearchResults } = useSearch()
  const { user } = useUser()

  const isHome = pathname === "/"
  const isStore = pathname === "/stores"
  const isActive = (path: string) => pathname === path

  return (
    <>
      {/* Top mobile */}
      {/* Top mobile */}
<div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white px-4 pt-0 pb-0.5 border-b border-orange-200 flex flex-col gap-1">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <Image
        src="/logo.png"
        alt="Logo WenzeBdd"
        width={60} // légèrement plus petit
        height={30}
        className="rounded-md"
      />
      {!isHome && !isStore && (
        <span className="text-orange-700 text-[11px] font-bold ">
          Achetez et vendez facilement à Bandundu
        </span>
      )}
    </div>

    {isHome && (
      <div className="ml-1 flex-1 text-xs px-3 py-0.5 border border-orange-300 rounded-full focus:outline-none focus:ring-1 focus:ring-orange-500">
        <LiveSearch onResults={setSearchResults} />
      </div>
    )}
    {isStore && (
      <div className="ml-1 flex-1 text-xs px-3 py-0.5 border border-orange-300 rounded-full focus:outline-none focus:ring-1 focus:ring-orange-500">
        <LiveStoreSearch onResults={setSearchResults} />
      </div>
    )}
  </div>
</div>

      {/* Desktop */}
      <nav className="hidden lg:flex fixed top-0 left-0 right-0 z-50 bg-orange-100 px-6 py-2 border-b border-orange-200 items-center justify-between text-sm shadow-sm h-14">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo WenzeBdd"
              width={90}
              height={45}
              className="rounded-md"
            />
          </Link>
          {!isHome && !isStore && (
            <span className="text-orange-700 font-medium text-sm">
              Achetez et vendez facilement à Bandundu
            </span>
          )}
          {isHome && (
            <div className="ml-2 text-sm px-3 py-1 border border-orange-300 rounded-full focus:outline-none focus:ring-1 focus:ring-orange-500 w-72">
              <LiveSearch onResults={setSearchResults} />
            </div>
          )}
          {isStore && (
            <div className="ml-2 text-sm px-3 py-1 border border-orange-300 rounded-full focus:outline-none focus:ring-1 focus:ring-orange-500 w-72">
              <LiveStoreSearch onResults={setSearchResults} />
            </div>
          )}
        </div>

        <div className="flex items-center gap-6 text-orange-700">
          <NavLink href="/" icon={<Home size={18} />} label="Accueil" active={isActive("/")} />
          <NavLink href="/messages" icon={<MessageCircle size={18} />} label="Messages" active={isActive("/messages")} />
          <NavLink href="/stores" icon={<Store size={18} />} label="Store" active={isActive("/stores")} />
          <NavLink href="/cart" icon={<ShoppingCart size={18} />} label="Panier" active={isActive("/cart")} />
          <NavLink href="/profile" icon={<UserIcon size={16} />} label="Mon compte" active={isActive("/profile")} />
        </div>
      </nav>

      {/* Bottom mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-orange-100 border-t border-orange-200 px-4 py-2 flex justify-between items-center text-xs z-50">
        <BottomNavLink href="/" icon={<Home size={20} />} label="Accueil" active={isActive("/")} />
        <BottomNavLink href="/messages" icon={<MessageCircle size={20} />} label="Messages" active={isActive("/messages")} />
        <BottomNavLink href="/stores" icon={<Store size={20} />} label="Store" active={isActive("/stores")} />
        <BottomNavLink href="/cart" icon={<ShoppingCart size={20} />} label="Panier" active={isActive("/cart")} />
        <BottomNavLink href="/profile" icon={<UserIcon size={20} />} label="Compte" active={isActive("/profile")} />
      </nav>
    </>
  )
}

const NavLink = ({ href, icon, label, active }: { href: string, icon: JSX.Element, label: string, active: boolean }) => (
  <Link href={href} className={`flex items-center gap-1 hover:text-orange-600 ${active ? "bg-orange-300 text-orange-700 rounded-full p-1" : ""}`}>
    {icon} {label}
  </Link>
)

const BottomNavLink = ({ href, icon, label, active }: { href: string, icon: JSX.Element, label: string, active: boolean }) => (
  <Link href={href} className={`flex flex-col items-center ${active ? "bg-orange-300 text-orange-700 rounded-full p-1" : "text-orange-700"} hover:text-orange-800`}>
    {icon} {label}
  </Link>
)

export default Navbar