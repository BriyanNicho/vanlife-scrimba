"use client"

import React from "react"
import Link from "next/link"
import { getHostVans } from "../../../api"

export default function HostVansPage() {
    const [vans, setVans] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getHostVans()
                setVans(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadVans()
    }, [])

    if (loading) {
        return <h1 className="text-2xl font-bold py-10">Loading...</h1>
    }

    if (error) {
        return <h1 className="text-xl text-red-500 font-bold py-10">There was an error: {error.message}</h1>
    }

    return (
        <section>
            <h1 className="text-3xl font-extrabold mb-6 text-[#161616]">Your listed vans</h1>
            <div className="space-y-4">
                {vans.length > 0 ? (
                    vans.map(van => (
                        <Link
                            href={`/host/vans/${van.id}`}
                            key={van.id}
                            className="flex items-center bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow gap-4"
                        >
                            <img src={van.imageUrl} alt={`Photo of ${van.name}`} className="h-16 w-16 rounded-md object-cover" />
                            <div>
                                <h3 className="text-xl font-bold text-[#161616]">{van.name}</h3>
                                <p className="text-gray-600">${van.price}/day</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <h2 className="text-xl font-semibold">No vans listed yet.</h2>
                )}
            </div>
        </section>
    )
}

