"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { getHostVans } from "../../../../api"

export const VanContext = createContext(null)

export function useVan() {
    return useContext(VanContext)
}

export default function HostVanDetailLayout({ children }) {
    const params = useParams()
    const pathname = usePathname()
    const id = params?.id
    const [currentVan, setCurrentVan] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadVan() {
            if (!id) return
            setLoading(true)
            try {
                const data = await getHostVans(id)
                setCurrentVan(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadVan()
    }, [id])

    if (loading) {
        return <h1 className="text-2xl font-bold py-10">Loading van details...</h1>
    }

    if (error) {
        return <h1 className="text-xl text-red-500 font-bold py-10">There was an error: {error.message}</h1>
    }

    const isDetails = pathname === `/host/vans/${id}`
    const isPricing = pathname === `/host/vans/${id}/pricing`
    const isPhotos = pathname === `/host/vans/${id}/photos`

    const activeTab = "font-bold underline text-[#161616]"
    const inactiveTab = "font-medium text-gray-600 hover:text-[#161616] transition-colors"

    return (
        <section>
            <Link
                href="/host/vans"
                className="inline-flex items-center text-black font-semibold hover:underline mb-8"
            >
                &larr; <span className="ml-2">Back to all vans</span>
            </Link>

            {currentVan && (
                <div className="bg-white p-8 rounded-md shadow-sm">
                    <div className="flex items-center gap-6 mb-6">
                        <img
                            src={currentVan.imageUrl}
                            alt={currentVan.name}
                            className="w-40 h-40 object-cover rounded-md"
                        />
                        <div>
                            <span className={`inline-block px-4 py-1 rounded-md text-sm font-semibold capitalize mb-3 ${
                                currentVan.type === "simple" ? "bg-[#E17654] text-white" :
                                currentVan.type === "luxury" ? "bg-[#161616] text-white" :
                                currentVan.type === "rugged" ? "bg-[#115E59] text-white" : "bg-[#FFEAD0] text-gray-700"
                            }`}>
                                {currentVan.type}
                            </span>
                            <h2 className="text-3xl font-extrabold text-[#161616]">{currentVan.name}</h2>
                            <p className="text-2xl font-bold mt-1">${currentVan.price}<span className="text-base font-normal text-gray-600">/day</span></p>
                        </div>
                    </div>

                    <nav className="flex gap-6 border-b border-gray-200 pb-4 mb-6 text-lg">
                        <Link href={`/host/vans/${id}`} className={isDetails ? activeTab : inactiveTab}>
                            Details
                        </Link>
                        <Link href={`/host/vans/${id}/pricing`} className={isPricing ? activeTab : inactiveTab}>
                            Pricing
                        </Link>
                        <Link href={`/host/vans/${id}/photos`} className={isPhotos ? activeTab : inactiveTab}>
                            Photos
                        </Link>
                    </nav>

                    <VanContext.Provider value={{ currentVan }}>
                        {children}
                    </VanContext.Provider>
                </div>
            )}
        </section>
    )
}

