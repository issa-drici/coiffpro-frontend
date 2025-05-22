import { Navbar } from '@/features/landing-page/navbar'
import { Hero } from '@/features/landing-page/hero'
import { Features } from '@/features/landing-page/features'
import { HowItWorks } from '@/features/landing-page/how-it-works'
import { Demo } from '@/features/landing-page/demo'
import { Reviews } from '@/features/landing-page/reviews'
import { Pricing } from '@/features/landing-page/pricing'
import { FAQ } from '@/features/landing-page/faq'
import { CTA } from '@/features/landing-page/cta'
import { Footer } from '@/features/landing-page/footer'

export const LandingPage = () => {
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
