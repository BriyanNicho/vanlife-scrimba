"use client"

import React, { Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { getVans } from "../../api"

function VansContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [vans, setVans] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    const typeFilter = searchParams.get("type")

    React.useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getVans()
                setVans(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        loadVans()
    }, [])

    const displayedVans = typeFilter
        ? vans.filter(van => van.type === typeFilter)
        : vans

    const vanElements = displayedVans.map(van => (
        <div key={van.id} className="group flex flex-col">
            <Link
                href={`/vans/${van.id}?${searchParams.toString()}`}
                className="flex flex-col h-full transform transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
                <div className="overflow-hidden rounded-xl aspect-square shadow-sm group-hover:shadow-xl transition-shadow duration-300">
                    <img
                        src={van.imageUrl}
                        alt={van.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                </div>
                <div className="flex justify-between items-start mt-3 mb-1 text-[#161616]">
                    <h3 className="text-xl font-bold group-hover:text-van-orange transition-colors duration-200">
                        {van.name}
                    </h3>
                    <p className="text-xl font-semibold text-right leading-tight">
                        ${van.price}
                        <span className="block text-sm font-normal text-gray-500">/day</span>
                    </p>
                </div>
                <span className={`inline-block self-start px-5 py-1.5 rounded-md text-sm font-semibold capitalize mt-auto transition-all duration-200 ${van.type === "simple" ? "bg-[#E17654] text-white" :
                    van.type === "luxury" ? "bg-[#161616] text-white" :
                        van.type === "rugged" ? "bg-[#115E59] text-white" : "bg-[#FFEAD0] text-gray-700"
                    }`}>
                    {van.type}
                </span>
            </Link>
        </div>
    ))

    function handleFilterChange(key, value) {
        const params = new URLSearchParams(searchParams.toString())
        if (value === null) {
            params.delete(key)
        } else {
            params.set(key, value)
        }
        router.push(`/vans?${params.toString()}`)
    }

    if (loading) {
        return <h1 className="text-2xl font-bold text-center py-20 text-[#161616]">Loading...</h1>
    }

    if (error) {
        return <h1 className="text-xl font-semibold text-center py-20 text-red-500">There was an error: {error.message}</h1>
    }

    return (
        <div className="px-6 py-10 max-w-5xl mx-auto">
            <h1 className="text-3xl font-extrabold mb-6 text-van-dark">
                Explore our van options
            </h1>

            {/* Area Filter */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
                <button
                    onClick={() => handleFilterChange("type", "simple")}
                    className={`px-4 py-1.5 font-medium rounded-md transition-colors ${typeFilter === "simple"
                        ? "bg-[#E17654] text-white"
                        : "bg-[#FFEAD0] text-gray-700 hover:bg-[#E17654] hover:text-white"
                        }`}
                >
                    Simple
                </button>
                <button
                    onClick={() => handleFilterChange("type", "luxury")}
                    className={`px-4 py-1.5 font-medium rounded-md transition-colors ${typeFilter === "luxury"
                        ? "bg-[#161616] text-white"
                        : "bg-[#FFEAD0] text-gray-700 hover:bg-[#161616] hover:text-white"
                        }`}
                >
                    Luxury
                </button>
                <button
                    onClick={() => handleFilterChange("type", "rugged")}
                    className={`px-4 py-1.5 font-medium rounded-md transition-colors ${typeFilter === "rugged"
                        ? "bg-[#115E59] text-white"
                        : "bg-[#FFEAD0] text-gray-700 hover:bg-[#115E59] hover:text-white"
                        }`}
                >
                    Rugged
                </button>

                {typeFilter ? (
                    <button
                        onClick={() => handleFilterChange("type", null)}
                        className="px-4 py-1.5 text-gray-500 underline hover:text-van-dark transition-colors"
                    >
                        Clear filters
                    </button>
                ) : null}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {vanElements}
            </div>
        </div>
    )
}

export default function VansPage() {
    return (
        <Suspense fallback={<div className="text-center py-20 font-bold">Loading vans...</div>}>
            <VansContent />
        </Suspense>
    )
}

