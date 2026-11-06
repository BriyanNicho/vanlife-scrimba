import React from "react"
import { Link, useParams, useLocation } from "react-router-dom"
import { getVan } from "../../api"

export default function VanDetail() {
    const [van, setVan] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const { id } = useParams()
    const location = useLocation()

    React.useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getVan(id)
                setVan(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadVans()
    }, [id])

    if (loading) {
        return <h1 className="text-2xl font-bold text-center py-20 text-van-dark">Loading...</h1>
    }

    if (error) {
        return <h1 className="text-xl font-semibold text-center py-20 text-red-500">There was an error: {error.message}</h1>
    }

    const search = location.state?.search || "";
    const type = location.state?.type || "all";

    return (
        <div className="px-6 py-10 max-w-3xl mx-auto">
            <Link
                to={`..${search}`}
                relative="path"
                className="inline-flex items-center text-black font-semibold hover:underline mb-8"
            >&larr; <span className="ml-2">Back to {type} vans</span></Link>

            {van && (
                <div className="flex flex-col text-van-dark">
                    <img src={van.imageUrl} alt={van.name} className="w-full rounded-xl object-cover mb-8" />
                    <span className={`inline-block self-start px-6 py-1.5 rounded-md font-semibold text-sm capitalize mb-4 ${van.type === "simple" ? "bg-[#E17654] text-white" :
                            van.type === "luxury" ? "bg-[#161616] text-white" :
                                van.type === "rugged" ? "bg-[#115E59] text-white" : "bg-[#FFEAD0] text-gray-700"
                        }`}>
                        {van.type}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3">{van.name}</h2>
                    <p className="text-2xl font-bold mb-4">
                        ${van.price}<span className="text-base font-normal text-gray-600">/day</span>
                    </p>
                    <p className="text-gray-800 font-medium leading-relaxed mb-8">{van.description}</p>
                    <button className="w-full bg-van-orange text-white text-lg font-bold py-4 rounded-md hover:bg-orange-500 transition-colors cursor-pointer">
                        Rent this van
                    </button>
                </div>
            )}
        </div>
    )
}