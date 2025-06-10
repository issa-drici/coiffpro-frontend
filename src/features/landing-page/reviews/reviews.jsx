import { ReviewCarousel } from '@/components/review-carousel'

export const Reviews = () => {
    return (
        <section className="py-10 md:py-16 w-full bg-transparent">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    Ils l&apos;ont adopté, comme vous le ferez
                </h2>
            </div>
            {/* Carousel d'avis */}
            <ReviewCarousel />
        </section>
    )
}
