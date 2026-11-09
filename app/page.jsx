import React from "react"
import Link from "next/link"

export default function HomePage() {
    return (
        <div
            className="relative h-[calc(100vh-184px)] flex flex-col justify-center items-center text-center px-8 bg-cover bg-center text-white"
            style={{ backgroundImage: "url('/assets/images/home-hero.png')" }}
        >
            <div className="relative z-10 max-w-lg">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                    You got the travel plans, we got the travel vans.
                </h1>
                <p className="text-base md:text-lg mb-12 font-medium">
                    Add adventure to your life by joining the #vanlife movement. Rent the perfect van to make your perfect road trip.
                </p>
                <Link
                    href="/vans"
                    className="block w-full bg-van-orange text-white font-bold py-4 rounded-md hover:bg-orange-500 transition-colors cursor-pointer"
                >
                    Find your van
                </Link>
            </div>
        </div>
    )
}

