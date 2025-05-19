import { useRef, useEffect } from 'react'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import Image from 'next/image'

const reviews = [
    {
        name: 'Karim',
        country: 'Paris',
        text: "« Je garde mes habitudes, mais mes clients attendent moins. C'est simple, et ça ne change rien à ma façon de bosser. »",
    },
    {
        name: 'Samia',
        country: 'Lyon',
        text: '« Avant, les gens râlaient dans la file. Maintenant, ils reviennent avec le sourire. »',
    },
    {
        name: 'Ali',
        country: 'Marseille',
        text: '« Aucune paperasse, pas de carte, pas de stress. Je recommande à tous les coiffeurs de quartier. »',
    },
    {
        name: 'Fatima',
        country: 'Toulouse',
        text: "« J'ai testé, c'est discret, rapide, et mes clients adorent. »",
    },
]

const ReviewCarousel = () => {
    const containerRef = useRef(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return
        let frame
        let last = Date.now()

        // Fonction pour déterminer la vitesse en fonction de la taille de l'écran
        const getScrollSpeed = () => {
            return window.innerWidth < 768 ? 0.12 : 0.13 // Plus lent sur mobile
        }

        function animate() {
            const now = Date.now()
            const dt = now - last
            last = now
            container.scrollLeft += getScrollSpeed() * dt
            // Boucle infinie
            if (container.scrollLeft >= container.scrollWidth / 2) {
                container.scrollLeft = 0
            }
            frame = requestAnimationFrame(animate)
        }
        frame = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(frame)
    }, [])

    return (
        <div className="w-full max-w-5xl mx-auto overflow-x-auto relative px-2 md:px-0">
            <style>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>
            {/* Effet blur gauche */}
            <div
                className="pointer-events-none absolute top-0 left-0 h-full w-12 md:w-32 z-10"
                style={{
                    background:
                        'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0) 100%)',
                    backdropFilter: 'blur(1px)',
                }}
            />
            {/* Effet blur droit */}
            <div
                className="pointer-events-none absolute top-0 right-0 h-full w-12 md:w-32 z-10"
                style={{
                    background:
                        'linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0) 100%)',
                    backdropFilter: 'blur(1px)',
                }}
            />
            <div
                ref={containerRef}
                className="hide-scrollbar flex gap-4 md:gap-8 py-2 overflow-x-auto"
                style={{
                    scrollBehavior: 'auto',
                    scrollbarWidth: 'none', // Firefox
                    msOverflowStyle: 'none', // IE/Edge
                }}>
                {/* On duplique les avis pour un scroll infini */}
                {reviews.concat(reviews).map((review, idx) => (
                    <Card
                        key={idx}
                        className="min-w-[320px] max-w-[320px] flex flex-col justify-between p-6">
                        <CardHeader className="p-0">
                            {/* Étoiles */}
                            <div className="flex gap-0.5 mb-0">
                                {[...Array(5)].map((_, i) => (
                                    <span
                                        key={i}
                                        className="text-yellow-400 text-3xl">
                                        ★
                                    </span>
                                ))}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col gap-1 p-0">
                            <p className="text-gray-700 italic text-base">
                                {review.text}
                            </p>
                        </CardContent>
                        <CardFooter className="flex items-center gap-4 p-0 mt-2">
                            <div className="w-10 h-10 relative rounded-full overflow-hidden">
                                <Image
                                    src="/images/gkcoiff.jpg"
                                    alt="Photo de profil"
                                    fill
                                    className="object-cover"
                                    sizes="40px"
                                />
                            </div>
                            <div>
                                <div className="font-bold text-lg text-gray-900 leading-tight">
                                    {review.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {review.country}
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default ReviewCarousel
