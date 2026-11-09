"use client"

import React from "react"
import { useVan } from "./layout"

export default function HostVanInfoPage() {
    const context = useVan()
    const currentVan = context?.currentVan

    if (!currentVan) return null

    return (
        <section className="space-y-4 text-base font-semibold text-[#161616]">
            <h4>Name: <span className="font-normal text-gray-700">{currentVan.name}</span></h4>
            <h4>Category: <span className="font-normal text-gray-700 capitalize">{currentVan.type}</span></h4>
            <h4>Description: <span className="font-normal text-gray-700 leading-relaxed block mt-1">{currentVan.description}</span></h4>
            <h4>Visibility: <span className="font-normal text-gray-700">Public</span></h4>
        </section>
    )
}

