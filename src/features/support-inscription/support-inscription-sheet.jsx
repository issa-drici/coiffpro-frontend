'use client'

import { useAuth } from '@/hooks/auth'
import { useGenerateQRCodePDF } from '@/services/qrcode/use-generate-qrcode-pdf'
import { Button } from '@/ui-components/button'
import Link from 'next/link'
import { toast } from 'sonner'

export function SupportInscriptionSheet() {
    const { user } = useAuth()

    const { mutate: generatePDF, isLoading: isGenerating } =
        useGenerateQRCodePDF({
            onSuccess: () => {
                toast.success('QR code téléchargé', {
                    description: 'Le fichier PDF a été téléchargé avec succès.',
                })
            },
            onError: () => {
                toast.error('Erreur', {
                    description: 'Impossible de télécharger le QR code PDF.',
                })
            },
        })

    if (!user) {
        return null
    }

    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col items-center gap-4 p-4 md:gap-6 md:p-6">
                    <div className="flex flex-col gap-2 border rounded-md p-4 w-full justify-center items-center">
                        <Link
                            href={`/salon/${user?.salon?.id}/queue`}
                            target="_blank"
                            className="w-full">
                            <Button className="w-full">
                                Ouvrir la page d&apos;inscription
                            </Button>
                        </Link>
                        <div className="text-xs text-muted-foreground text-center">
                            Cela ouvre la page d&apos;inscription dans un nouvel
                            onglet pour que le client puisse le remplir.
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 border rounded-md p-4 w-full justify-center items-center">
                        <Button
                            className="w-full"
                            onClick={() => generatePDF(user?.salon?.id)}
                            disabled={isGenerating}>
                            {isGenerating
                                ? 'Génération...'
                                : 'Télécharger le QR code du formulaire'}
                        </Button>

                        <div className="text-xs text-muted-foreground text-center">
                            Cela permets de télécharger une affiche à installer
                            dans le salon pour que le client puisse scanner et
                            s&apos;inscrire à la liste d&apos;attente.
                        </div>
                    </div>

                    {/* <div className="flex flex-col gap-2 border rounded-md p-4 w-full justify-center items-center">
                        <Link
                            href={`/salon/${user?.salon?.id}/queue`}
                            target="_blank"
                            className="w-full">
                            <Button className="w-full">
                                Copier le lien de la page d&apos;inscription
                            </Button>
                        </Link>
                        <div className="text-xs text-muted-foreground text-center">
                            Copiez le lien de la page d&apos;inscription pour la
                            mettre sur vos réseaux sociaux.
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
