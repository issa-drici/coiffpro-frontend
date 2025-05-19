import Image from 'next/image'
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card'
import SectionTitle from './common/SectionTitle'

const Features = () => {
    return (
        <section className="py-10 md:py-16 bg-transparent">
            <SectionTitle>Ce que vous allez adorer</SectionTitle>
            <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 mb-10">
                {/* Première ligne : 2 features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <Card className="pb-0 overflow-hidden">
                        <CardHeader className="mb-3">
                            <CardTitle className="text-lg text-gray-800">
                                🕒 Zéro rendez-vous, zéro contrainte
                            </CardTitle>
                            <CardDescription className="mb-0 text-gray-600">
                                Continuez à travailler comme d'habitude, sans
                                planning ni prise de tête.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 flex items-end p-0">
                            <div className="w-full h-40 bg-white relative overflow-hidden">
                                <Image
                                    src="/images/bg-login.avif"
                                    alt="Feature illustration"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="pb-0 overflow-hidden">
                        <CardHeader className="mb-3">
                            <CardTitle className="text-lg text-gray-800">
                                🕵️‍♂️ File d'attente invisible pour
                                l'administration
                            </CardTitle>
                            <CardDescription className="mb-0 text-gray-600">
                                Personne ne voit combien de clients passent,
                                sauf vous.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 flex items-end p-0">
                            <div className="w-full h-40 bg-white relative overflow-hidden">
                                <Image
                                    src="/images/bg-login.avif"
                                    alt="Feature illustration"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                {/* Deuxième ligne : 3 features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <Card className="pb-0 overflow-hidden">
                        <CardHeader className="mb-3">
                            <CardTitle className="text-lg text-gray-800">
                                💶 Vos clients attendent moins
                            </CardTitle>
                            <CardDescription className="mb-0 text-gray-600">
                                Ils réservent leur tour, mais gardent leur
                                liberté.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 flex items-end p-0">
                            <div className="w-full h-40 bg-white relative overflow-hidden">
                                <Image
                                    src="/images/bg-login.avif"
                                    alt="Feature illustration"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="pb-0 overflow-hidden">
                        <CardHeader className="mb-3">
                            <CardTitle className="text-lg text-gray-800">
                                Aucun paiement en ligne
                            </CardTitle>
                            <CardDescription className="mb-0 text-gray-600">
                                Toujours en espèces, rien ne change pour vous ni
                                pour eux.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 flex items-end p-0">
                            <div className="w-full h-40 bg-white relative overflow-hidden">
                                <Image
                                    src="/images/bg-login.avif"
                                    alt="Feature illustration"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="pb-0 overflow-hidden">
                        <CardHeader className="mb-3">
                            <CardTitle className="text-lg text-gray-800">
                                👍 Prise en main immédiate
                            </CardTitle>
                            <CardDescription className="mb-0 text-gray-600">
                                Pas besoin de formation, tout est prêt en 2
                                minutes.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 flex items-end p-0">
                            <div className="w-full h-40 bg-white relative overflow-hidden">
                                <Image
                                    src="/images/bg-login.avif"
                                    alt="Feature illustration"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-8">
                <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold text-gray-900">
                        -30 min
                    </div>
                    <div className="text-xs text-gray-500 text-center">
                        d'attente en moins par client
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold text-gray-900">+18%</div>
                    <div className="text-xs text-gray-500 text-center">
                        de clients servis chaque jour
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold text-gray-900">0</div>
                    <div className="text-xs text-gray-500 text-center">
                        statistique ou chiffre d'affaires affiché
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold text-gray-900">100%</div>
                    <div className="text-xs text-gray-500 text-center">
                        de contrôle sur votre file d'attente
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features
