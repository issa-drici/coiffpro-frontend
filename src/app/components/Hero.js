import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Hero = () => {
    return (
        <section className="w-full bg-white pt-8 md:pt-12 pb-8 px-2 md:px-4 flex flex-col items-center">
            {/* Bandeau update fidèle au design */}
            <div className="flex mb-6">
                <div className="flex items-center bg-gray-100 rounded-full pl-2 pr-6 py-1 text-sm font-medium shadow-sm">
                    <span className="text-gray-700 mr-4 bg-white px-4 font-bold py-1 rounded-full">
                        Garantie
                    </span>
                    <span className="text-gray-600 flex items-center">
                        Satisfait ou remboursé pendant 30 jours{' '}
                        <span className="ml-2">→</span>
                    </span>
                </div>
            </div>
            {/* Titre principal */}
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 text-center leading-tight">
                Moins d'attente, plus de clients heureux.
                <br />
                Sans changer tes habitudes.
            </h1>

            <p className="text-base text-gray-700 mb-8 max-w-xl mx-auto text-center">
                Organisez la file sans changer vos habitudes.
                <br />
                Zéro carte, zéro statistique, zéro paperasse.
                <br />
                Vos clients attendent moins, vous gardez le contrôle.
            </p>
            <div className="flex gap-4 justify-center mb-10 flex-col sm:flex-row">
                <Link href="/register">
                    <Button>Essai gratuit</Button>
                </Link>
                <Button variant="outline">Voir la démo</Button>
            </div>
            {/* Bloc démo */}
            <div className="w-full max-w-5xl h-64 bg-gray-100 rounded-2xl flex items-center justify-center mb-8" />
            {/* Ligne logos partenaires */}
            <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4 mt-2">
                <div className="text-xs text-gray-700 font-medium md:text-left text-center md:mb-0 mb-2">
                    PLUS DE 500 SALONS DE COIFFURE NOUS FONT CONFIANCE EN
                    FRANCE
                </div>
                <div className="flex flex-wrap justify-center gap-8 items-center opacity-80">
                    {[1, 2, 3, 4].map(i => (
                        <div
                            key={i}
                            className="w-24 h-8 bg-gray-200 rounded"
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Hero
