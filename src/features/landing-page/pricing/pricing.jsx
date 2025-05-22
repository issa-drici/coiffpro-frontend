import { Button } from '@/ui-components/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/ui-components/card'

export const Pricing = () => {
    return (
        <section className="py-10 md:py-16 w-full bg-transparent">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    Tarifs simples, sans surprise
                </h2>
                <p className="text-gray-600 mt-4 max-w-xl mx-auto text-base">
                    Pas d'engagement. Pas de frais cachés. Vous testez, vous
                    décidez.
                </p>
            </div>
            <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {/* Essai gratuit */}
                <Card className="min-h-[420px] h-full">
                    <CardHeader className="items-start">
                        <CardTitle className="text-gray-500 font-semibold text-base">
                            Essai gratuit
                        </CardTitle>
                        <CardDescription className="text-2xl font-bold text-gray-900">
                            0€ pendant 14 jours
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <ul className="space-y-3 w-full text-base">
                            <li className="flex items-center gap-2">
                                <span className="text-green-500 text-lg">
                                    ✔
                                </span>
                                Accès complet à toutes les fonctionnalités
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-green-500 text-lg">
                                    ✔
                                </span>
                                Aucune carte bancaire demandée
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-green-500 text-lg">
                                    ✔
                                </span>
                                Arrêt en un clic, sans engagement
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Essai gratuit</Button>
                    </CardFooter>
                </Card>

                {/* Pro (mis en avant) */}
                <Card className="min-h-[420px] h-full relative scale-105 z-10 bg-gray-100">
                    <CardHeader className="items-start">
                        <div className="absolute top-6 right-6 bg-white border border-gray-200 text-xs px-3 py-1 rounded-full font-semibold">
                            Le plus choisi
                        </div>
                        <CardTitle className="text-gray-700 font-semibold text-base">
                            Pro
                        </CardTitle>
                        <CardDescription className="text-2xl font-bold text-gray-900">
                            15€ / mois
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <ul className="space-y-3 w-full text-base">
                            <li className="flex items-center gap-2">
                                <span className="text-green-500 text-lg">
                                    ✔
                                </span>
                                File d'attente illimitée
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-green-500 text-lg">
                                    ✔
                                </span>
                                Support prioritaire 7j/7
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-green-500 text-lg">
                                    ✔
                                </span>
                                Mises à jour incluses
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Choisir Pro</Button>
                    </CardFooter>
                </Card>

                {/* Sur-mesure */}
                <Card className="min-h-[420px] h-full">
                    <CardHeader className="items-start">
                        <CardTitle className="text-gray-500 font-semibold text-base">
                            Sur-mesure
                        </CardTitle>
                        <CardDescription className="text-2xl font-bold text-gray-900">
                            Sur devis
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <ul className="space-y-3 w-full text-base">
                            <li className="flex items-center gap-2">
                                <span className="text-green-500 text-lg">
                                    ✔
                                </span>
                                Accompagnement personnalisé
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-green-500 text-lg">
                                    ✔
                                </span>
                                Options avancées (multi-salons, équipe...)
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-green-500 text-lg">
                                    ✔
                                </span>
                                Installation sur place possible
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">
                            Contactez-nous
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </section>
    )
}
