import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'

const CTA = () => {
    return (
        <section className="py-10 md:py-16 w-full bg-transparent">
            <Card className="w-full max-w-5xl mx-auto bg-gray-100 p-6 md:p-10">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
                    {/* Colonne gauche */}
                    <Card className="flex-1 border-0 shadow-none bg-transparent p-0">
                        <CardHeader className="p-0">
                            <CardTitle className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-900">
                                Testez maintenant, décidez plus tard
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="flex flex-col gap-3 mb-6 w-full max-w-md">
                                <div className="flex items-center gap-2">
                                    <span className="text-green-500 text-lg">
                                        ✓
                                    </span>
                                    <span className="text-gray-700">
                                        7 jours d'essai gratuit
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-green-500 text-lg">
                                        ✓
                                    </span>
                                    <span className="text-gray-700">
                                        Aucune carte bancaire demandée
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-green-500 text-lg">
                                        ✓
                                    </span>
                                    <span className="text-gray-700">
                                        Arrêt en un clic si ça ne vous
                                        convient pas
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="p-0 flex flex-col items-start gap-4">
                            <Button className="w-full md:w-auto">
                                Commencer l'essai gratuit →
                            </Button>
                            <p className="text-sm text-gray-500">
                                Déjà plus de 500 coiffeurs nous font
                                confiance
                            </p>
                        </CardFooter>
                    </Card>

                    {/* Colonne droite - Zone pour l'image */}
                    <Card className="flex-1 border-0 shadow-none bg-transparent p-0 mt-6 md:mt-0">
                        <CardContent className="p-0 flex items-center justify-center w-full">
                            <div className="w-full h-64 md:h-96 bg-white rounded-xl border border-gray-200 max-w-md" />
                        </CardContent>
                    </Card>
                </div>
            </Card>
        </section>
    )
}

export default CTA
