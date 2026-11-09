"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

export default function HostLayout({ children }) {
    const pathname = usePathname()
    const router = useRouter()
    const [isAuthorized, setIsAuthorized] = useState(false)

    useEffect(() => {
        const loggedIn = typeof window !== "undefined" && localStorage.getItem("loggedin")
        if (!loggedIn) {
            router.replace(`/login?message=You must log in first&from=${encodeURIComponent(pathname)}`)
        } else {
            setIsAuthorized(true)
        }
    }, [pathname, router])

    if (!isAuthorized) {
        return <div className="text-center py-20 font-bold">Verifying authorization...</div>
    }

    const isDashboard = pathname === "/host"
    const isIncome = pathname === "/host/income"
    const isVans = pathname.startsWith("/host/vans")
    const isReviews = pathname === "/host/reviews"

    const activeClass = "font-bold underline text-[#161616]"
    const inactiveClass = "text-[#4d4d4d] font-medium hover:text-[#161616] transition-colors"

    return (
        <div className="px-6 py-6 max-w-5xl mx-auto">
            <nav className="flex gap-6 mb-8 text-lg">
                <Link
                    href="/host"
                    className={isDashboard ? activeClass : inactiveClass}
                >
                    Dashboard
                </Link>
                <Link
                    href="/host/income"
                    className={isIncome ? activeClass : inactiveClass}
                >
                    Income
                </Link>
                <Link
                    href="/host/vans"
                    className={isVans ? activeClass : inactiveClass}
                >
                    Vans
                </Link>
                <Link
                    href="/host/reviews"
                    className={isReviews ? activeClass : inactiveClass}
                >
                    Reviews
                </Link>
            </nav>
            {children}
        </div>
    )
}

