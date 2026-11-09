import React from "react"
import Link from "next/link"

export default function AboutPage() {
    return (
        <div className="bg-van-bg pb-12 min-h-screen">
            <img src="/assets/images/about-hero.png" alt="About Hero" className="w-full h-[400px] object-cover" />
            <div className="px-6 py-12 max-w-2xl mx-auto text-van-dark">
                <h1 className="text-3xl font-extrabold mb-6 leading-tight">Don’t squeeze in a sedan when you could relax in a van.</h1>
                <p className="mb-4 font-medium leading-relaxed">Our mission is to enliven your road trip with the perfect travel van rental. Our vans are recertified before each trip to ensure your travel plans can go off without a hitch. (Hitch costs extra 😉)</p>
                <p className="mb-10 font-medium leading-relaxed">Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world on 4 wheels.</p>
                <div className="bg-[#ffcc8d] text-van-dark p-8 rounded-lg mt-8">
                    <h2 className="text-2xl font-bold mb-6">
                        Your destination is waiting.<br />Your van is ready.
                    </h2>
                    <Link
                        className="bg-van-dark text-white font-bold py-3 px-6 rounded-md hover:bg-gray-800 transition-colors inline-block cursor-pointer"
                        href="/vans"
                    >
                        Explore our vans
                    </Link>
                </div>
            </div>
        </div>
    )
}

