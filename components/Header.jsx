"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {
    const pathname = usePathname()

    function isActive(path) {
        if (path === "/host") return pathname.startsWith("/host")
        if (path === "/vans") return pathname.startsWith("/vans")
        return pathname === path
    }

    function fakeLogOut() {
        if (typeof window !== "undefined") {
            localStorage.removeItem("loggedin")
        }
    }

    return (
        <header className="sticky top-0 z-50 flex justify-between items-center h-[110px] px-6 bg-van-bg shadow-sm">
            <Link className="text-black text-3xl font-black uppercase tracking-tighter" href="/">#VanLife</Link>
            <nav className="flex items-center gap-6 font-semibold text-gray-600">
                <Link
                    href="/host"
                    className={isActive("/host") ? "font-bold underline text-[#161616]" : "hover:text-[#161616] transition-colors"}
                >
                    Host
                </Link>
                <Link
                    href="/about"
                    className={isActive("/about") ? "font-bold underline text-[#161616]" : "hover:text-[#161616] transition-colors"}
                >
                    About
                </Link>
                <Link
                    href="/vans"
                    className={isActive("/vans") ? "font-bold underline text-[#161616]" : "hover:text-[#161616] transition-colors"}
                >
                    Vans
                </Link>
                <Link href="/login" className="ml-2">
                    <img
                        src="/assets/images/avatar-icon.png"
                        alt="User Avatar"
                        className="w-6 h-6"
                    />
                </Link>
                <button onClick={fakeLogOut} className="hover:text-red-500 font-bold transition-colors">X</button>
            </nav>
        </header>
    )
}
