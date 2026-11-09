"use client"

import React from "react"
import Link from "next/link"
import { BsStarFill } from "react-icons/bs"
import { getHostVans } from "../../api"

export default function DashboardPage() {
    const [vans, setVans] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        setLoading(true)
        getHostVans()
            .then(data => setVans(data))
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }, [])

    function renderVanElements(vans) {
        const hostVansEls = vans.map((van) => (
            <div className="flex items-center bg-white mb-4 p-4 rounded-md justify-between" key={van.id}>
                <div className="flex items-center gap-4">
                    <img src={van.imageUrl} alt={`Photo of ${van.name}`} className="h-16 w-16 rounded-md object-cover" />
                    <div>
                        <h3 className="text-xl font-bold text-[#161616]">{van.name}</h3>
                        <p className="text-gray-600">${van.price}/day</p>
                    </div>
                </div>
                <Link href={`/host/vans/${van.id}`} className="font-semibold text-gray-700 hover:underline">
                    View
                </Link>
            </div>
        ))

        return (
            <div className="space-y-4">
                <section>{hostVansEls}</section>
            </div>
        )
    }

    if (error) {
        return <h1 className="text-xl text-red-500 font-bold py-10">Error: {error.message}</h1>
    }

    return (
        <div className="space-y-8">
            <section className="bg-[#ffead0] p-8 rounded-md flex justify-between items-center text-[#161616]">
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Welcome!</h1>
                    <p className="text-gray-700 font-medium">Income last <span className="font-bold underline">30 days</span></p>
                    <h2 className="text-3xl font-extrabold mt-2">$2,260</h2>
                </div>
                <Link href="/host/income" className="font-semibold hover:underline">Details</Link>
            </section>
            <section className="bg-[#ffddb2] p-8 rounded-md flex items-center justify-between text-[#161616]">
                <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold">Review score</h2>
                    <BsStarFill className="text-[#ff8c38] text-xl" />
                    <p className="font-bold text-xl">
                        <span>5.0</span>/5
                    </p>
                </div>
                <Link href="/host/reviews" className="font-semibold hover:underline">Details</Link>
            </section>
            <section>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-[#161616]">Your listed vans</h2>
                    <Link href="/host/vans" className="font-semibold text-gray-700 hover:underline">View all</Link>
                </div>
                {
                    loading && (!vans || vans.length === 0)
                    ? <h1 className="text-xl font-semibold py-8">Loading...</h1>
                    : (
                        <>
                            {renderVanElements(vans)}
                        </>
                    )
                }
            </section>
        </div>
    )
}

