import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

const HowItWorks = () => {
    return (
        <section className="py-10 md:py-16 w-full bg-transparent">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    Comment ça marche&nbsp;?
                </h2>
            </div>
            <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <Card className="min-h-[320px]">
                    <CardHeader className="mb-4">
                        <CardTitle className="text-xl text-gray-800 text-left">
                            1. Ouvrez la file d'attente
                        </CardTitle>
                        <CardDescription className="mb-0 text-gray-600 text-sm">
                            En un clic, vous lancez la file sur votre
                            téléphone ou tablette.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex items-end p-0">
                        <div className="w-full h-32 bg-white rounded-xl border border-gray-200 flex items-center justify-center text-3xl text-gray-300">
                            <span>📱</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="min-h-[320px]">
                    <CardHeader className="mb-4">
                        <CardTitle className="text-xl text-gray-800 text-left">
                            2. Vos clients s'inscrivent
                        </CardTitle>
                        <CardDescription className="mb-0 text-gray-600 text-sm">
                            Ils réservent leur tour, sur place ou à
                            distance, sans créer de compte.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex items-end p-0">
                        <div className="w-full h-32 bg-white rounded-xl border border-gray-200 flex items-center justify-center text-3xl text-gray-300">
                            <span>📝</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="min-h-[320px]">
                    <CardHeader className="mb-4">
                        <CardTitle className="text-xl text-gray-800 text-left">
                            3. Vous appelez le suivant
                        </CardTitle>
                        <CardDescription className="mb-0 text-gray-600 text-sm">
                            Un clic, le client est prévenu, la file avance.
                            Vous restez maître du rythme.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex items-end p-0">
                        <div className="w-full h-32 bg-white rounded-xl border border-gray-200 flex items-center justify-center text-3xl text-gray-300">
                            <span>✂️</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}

export default HowItWorks
