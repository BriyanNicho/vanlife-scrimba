"use client"

import React from "react"
import { useVan } from "../layout"

export default function HostVanPhotosPage() {
    const context = useVan()
    const currentVan = context?.currentVan

    if (!currentVan) return null

    return (
        <img
            src={currentVan.imageUrl}
            alt={currentVan.name}
            className="w-28 h-28 object-cover rounded-md"
        />
    )
}

