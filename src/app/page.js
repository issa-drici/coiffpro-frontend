'use client'

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

export default Home
