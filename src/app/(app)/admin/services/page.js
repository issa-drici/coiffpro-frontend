'use client'

import { SiteHeader } from '@/components/site-header'
import { ServicesSheet } from '@/features/services'

export default function ServicesPage() {
    return (
        <>
            <SiteHeader name="Gestion des Prestations" />
            <ServicesSheet />
        </>
    )
}
