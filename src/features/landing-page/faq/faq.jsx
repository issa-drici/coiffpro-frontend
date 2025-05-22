import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '@/ui-components/accordion'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/ui-components/card'

export const FAQ = () => {
    const faqs = [
        {
            q: "Est-ce que mes données sont visibles par l'administration ?",
            a: "Non, absolument pas. Nous ne stockons aucun chiffre d'affaires ni statistique. La file d'attente est invisible pour tout le monde sauf vous et vos clients. Aucune donnée n'est partagée avec qui que ce soit.",
        },
        {
            q: "Comment ça marche si je n'ai pas de tablette ou d'ordinateur ?",
            a: "Un simple smartphone suffit. Pas besoin de matériel spécial. Vous pouvez même utiliser votre téléphone personnel. L'application est ultra-légère et fonctionne sur tous les téléphones récents.",
        },
        {
            q: 'Est-ce que je peux arrêter quand je veux ?',
            a: "Oui, à tout moment. Pas d'engagement, pas de frais de résiliation. Vous gardez le contrôle total : activez ou désactivez la file d'attente quand vous voulez, sans justification.",
        },
        {
            q: 'Et si mes clients ne veulent pas utiliser leur téléphone ?',
            a: "Pas de problème ! Vos clients peuvent s'inscrire sur votre téléphone, ou vous pouvez les inscrire vous-même. Le système s'adapte à vos habitudes, pas l'inverse.",
        },
    ]

    return (
        <section className="py-10 md:py-16 w-full bg-transparent">
            <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
                {/* Colonne gauche : titre et description */}
                <Card className="border-0 shadow-none bg-transparent">
                    <CardHeader className="p-0">
                        <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900">
                            Questions fréquentes
                        </CardTitle>
                        <CardDescription className="mt-4 text-gray-600 text-base">
                            Tout ce que vous devez savoir, en toute
                            transparence.
                        </CardDescription>
                    </CardHeader>
                </Card>

                {/* Colonne droite : questions */}
                <Card className="col-span-1 md:col-span-2 border-0 shadow-none bg-transparent">
                    <CardContent className="p-0">
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full">
                            {faqs.map((faq, i) => (
                                <AccordionItem
                                    key={i}
                                    value={`faq-${i}`}
                                    className="bg-gray-100 rounded-xl px-6 py-4 mb-2">
                                    <AccordionTrigger className="flex items-center gap-4 text-lg text-gray-800 font-medium">
                                        {faq.q}
                                    </AccordionTrigger>
                                    <AccordionContent className="pl-4 text-gray-600 text-base">
                                        {faq.a}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
