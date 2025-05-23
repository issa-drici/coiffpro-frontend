import { RegistrationForm } from '@/features/registration-queue/registration-form'
import { QueueClientInfo } from '@/features/queue/queue-client-info'

export default function SalonRegistrationPage({ params }) {
    return (
        <main className="min-h-screen bg-background">
            {/* En-tête fixe sur mobile, normal sur desktop */}
            <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container px-4 py-4 md:py-6 md:max-w-6xl mx-auto">
                    <div className="md:flex md:items-center md:justify-between">
                        <div>
                            <h1 className="text-xl font-bold md:text-2xl">
                                Votre ticket d'attente
                            </h1>
                            <p className="hidden md:block mt-1 text-muted-foreground">
                                Consultez votre position dans la file d'attente
                                et le temps d'attente estimé.
                            </p>
                        </div>
                        <div className="hidden md:block">
                            <div className="rounded-full bg-primary/10 px-4 py-2">
                                <span className="text-sm font-medium text-primary">
                                    Salon #{params.salonId}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Contenu principal avec mise en page adaptative */}
            <div className="container px-4 py-6 md:py-8 md:max-w-7xl mx-auto">
                <div className="md:flex md:justify-center">
                    {/* Message d'introduction visible uniquement sur mobile */}
                    <p className="text-sm text-muted-foreground md:hidden mb-4">
                        Consultez votre position dans la file d'attente et le
                        temps d'attente estimé.
                    </p>

                    {/* Carte du formulaire avec ombre adaptative */}
                    <div className="w-full md:max-w-6xl md:mx-auto space-y-6">
                        {/* Informations de la file d'attente */}
                        <QueueClientInfo
                            clientId={params.clientId}
                            salonId={params.salonId}
                        />

                        {/* Footer avec informations supplémentaires */}
                        <footer className="mt-8 text-center text-sm text-muted-foreground md:mt-12">
                            <div className="md:flex md:items-center md:justify-center md:gap-4">
                                <p>
                                    En cas de problème, veuillez vous adresser à
                                    l'accueil du salon.
                                </p>
                                <div className="hidden md:block text-muted-foreground/50">
                                    •
                                </div>
                                <p className="hidden md:block">
                                    Les temps d'attente sont donnés à titre
                                    indicatif
                                </p>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </main>
    )
}
