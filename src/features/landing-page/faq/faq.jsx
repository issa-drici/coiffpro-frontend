import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '@/ui-components/accordion'
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/ui-components/card'
import { faqData } from '@/services/faq/config'

export const FAQ = () => {
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
                        <Accordion type="single" collapsible className="w-full">
                            {faqData.map((faq) => (
                                <AccordionItem
                                    key={faq.id}
                                    value={`faq-${faq.id}`}
                                    className="bg-gray-100 rounded-xl px-6 py-4 mb-2">
                                    <AccordionTrigger className="flex items-center gap-4 text-lg text-gray-800 font-medium">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="pl-4 text-gray-600 text-base">
                                        {faq.answer}
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
