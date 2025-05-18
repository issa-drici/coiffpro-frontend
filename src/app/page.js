'use client'

import { IconRazorElectric } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Import des composants de la landing page
import Hero from '@/app/components/Hero'
import Features from '@/app/components/Features'
import HowItWorks from '@/app/components/HowItWorks'
import Demo from '@/app/components/Demo'
import Reviews from '@/app/components/Reviews'
import Pricing from '@/app/components/Pricing'
import FAQ from '@/app/components/FAQ'
import CTA from '@/app/components/CTA'
import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'

// export const metadata = {
//     title: 'Laravel',
// }

const Home = () => {
    return (
        <div className="bg-white min-h-screen flex flex-col px-4 md:px-0">
            {/* NavBar */}
            <Navbar />
            {/* Sections de la landing page */}
            <section id="hero">
                <Hero />
            </section>
            <section id="features">
                <Features />
            </section>
            <section id="how-it-works">
                <HowItWorks />
            </section>
            <section id="demo">
                <Demo />
            </section>
            <section id="reviews">
                <Reviews />
            </section>
            <section id="pricing">
                <Pricing />
            </section>
            <section id="faq">
                <FAQ />
            </section>
            <section id="cta">
                <CTA />
            </section>
            <Footer />
        </div>
    )
}

// Carousel d'avis défilant automatiquement
const reviews = [
    {
        name: 'Karim',
        country: 'Paris',
        text: "« Je garde mes habitudes, mais mes clients attendent moins. C'est simple, et ça ne change rien à ma façon de bosser. »",
    },
    {
        name: 'Samia',
        country: 'Lyon',
        text: '« Avant, les gens râlaient dans la file. Maintenant, ils reviennent avec le sourire. »',
    },
    {
        name: 'Ali',
        country: 'Marseille',
        text: '« Aucune paperasse, pas de carte, pas de stress. Je recommande à tous les coiffeurs de quartier. »',
    },
    {
        name: 'Fatima',
        country: 'Toulouse',
        text: "« J'ai testé, c'est discret, rapide, et mes clients adorent. »",
    },
]

export default Home
