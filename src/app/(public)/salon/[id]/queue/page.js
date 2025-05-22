import { RegistrationForm } from '@/features/registration-queue/registration-form'

export default function SalonRegistrationPage({ params }) {
    return (
        <main className="min-h-screen bg-background">
            {/* En-tête fixe sur mobile, normal sur desktop */}
            <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container px-4 py-4 md:py-6 md:max-w-6xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold md:text-2xl">
                                Inscription à la file d'attente
                            </h1>
                            <p className="hidden md:block mt-1 text-muted-foreground">
                                Remplissez le formulaire ci-dessous pour vous
                                inscrire à la file d'attente.
                            </p>
                        </div>

                        <div className="rounded-full bg-primary/10 px-4 py-2">
                            <span className="text-sm font-medium text-primary">
                                {params.id}
                                {/* Mettre le logo à coté ou à la place du nom du salon */}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Contenu principal avec mise en page adaptative */}
            <div className="container px-4 py-6 md:py-8 md:max-w-7xl mx-auto">
                <div className="md:flex md:justify-center">
                    {/* Message d'introduction visible uniquement sur mobile */}
                    <p className="text-sm text-muted-foreground md:hidden mb-4">
                        Remplissez le formulaire ci-dessous pour vous inscrire à
                        la file d'attente.
                    </p>

                    {/* Carte du formulaire avec ombre adaptative */}
                    <div className="w-full md:max-w-6xl md:mx-auto">
                        <div className="rounded-lg border bg-card p-4 shadow-sm md:border-0 md:shadow-none md:p-0">
                            <RegistrationForm salonId={params.id} />
                        </div>

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
                                    Temps d'attente estimé : 15-30 minutes
                                </p>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </main>
    )
}
