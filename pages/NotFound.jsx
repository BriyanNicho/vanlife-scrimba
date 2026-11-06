import React from "react"
import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <div className="flex flex-col justify-center items-center px-6 py-24 text-center max-w-xl mx-auto min-h-[60vh]">
            <h1 className="text-3xl md:text-4xl font-extrabold text-van-dark mb-8 leading-tight">
                Sorry, the page you were looking for was not found.
            </h1>
            <Link
                to="/"
                className="block w-full bg-van-dark text-white font-bold py-4 rounded-md hover:bg-gray-800 transition-colors text-center cursor-pointer"
            >
                Return to Home
            </Link>
        </div>
    )
}
