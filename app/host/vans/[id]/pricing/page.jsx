"use client"

import React from "react"
import { useVan } from "../layout"

export default function HostVanPricingPage() {
    const context = useVan()
    const currentVan = context?.currentVan

    if (!currentVan) return null

    return (
        <h3 className="text-2xl font-bold text-[#161616]">
            ${currentVan.price}
            <span className="text-base font-normal text-gray-600">/day</span>
        </h3>
    )
}

