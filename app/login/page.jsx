"use client"

import React, { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { loginUser } from "../../api"

function LoginForm() {
    const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" })
    const [status, setStatus] = React.useState("idle")
    const [error, setError] = React.useState(null)

    const router = useRouter()
    const searchParams = useSearchParams()

    const message = searchParams.get("message")
    const from = searchParams.get("from") || "/host"

    function handleSubmit(e) {
        e.preventDefault()
        setStatus("submitting")
        loginUser(loginFormData)
            .then(data => {
                setError(null)
                if (typeof window !== "undefined") {
                    localStorage.setItem("loggedin", "true")
                }
                router.replace(from)
            })
            .catch(err => {
                setError(err)
            })
            .finally(() => {
                setStatus("idle")
            })
    }

    function handleChange(e) {
        const { name, value } = e.target
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="flex flex-col items-center px-6 py-12 max-w-md mx-auto">
            {message && (
                <h3 className="text-red-500 font-semibold mb-4 text-center">{message}</h3>
            )}
            <h1 className="text-3xl font-extrabold text-center text-van-dark mb-8">
                Sign in to your account
            </h1>
            {error?.message && (
                <h3 className="text-red-500 font-semibold mb-4 text-center">{error.message}</h3>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col w-full gap-3">
                <input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Email address"
                    value={loginFormData.email}
                    className="w-full h-10 px-3 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 font-normal"
                />
                <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    value={loginFormData.password}
                    className="w-full h-10 px-3 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 font-normal"
                />
                <button
                    disabled={status === "submitting"}
                    className="w-full h-[55px] mt-4 bg-van-orange text-white font-bold rounded-md hover:bg-orange-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
                >
                    {status === "submitting"
                        ? "Logging in..."
                        : "Log in"
                    }
                </button>
            </form>
        </div>
    )
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="text-center py-20 font-bold">Loading...</div>}>
            <LoginForm />
        </Suspense>
    )
}

