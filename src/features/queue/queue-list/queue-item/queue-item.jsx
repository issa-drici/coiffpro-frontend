'use client'

import { format, differenceInMinutes } from 'date-fns'
import { fr } from 'date-fns/locale'
import { QueueStatusBadge } from '@/features/queue/queue-list/queue-item/queue-status-badge'
import { Button } from '@/ui-components/button'
import { Card, CardContent } from '@/ui-components/card'
import { Clock, Phone, Scissors, Timer, User } from 'lucide-react'
import { useTakeClient } from '@/services/queue/useTakeClient'
import { useMarkClientAbsent } from '@/services/queue/useMarkClientAbsent'
import { useState } from 'react'
import { useFindServiceConfig } from '@/services/services/use-find-service-config'
import { ResponsiveDialog } from '@/components/responsive-dialog'

export function QueueItem({ client, isCurrentClient = false }) {
    const { mutate: handleTakeClient, isLoading: isTakingClient } =
        useTakeClient()
    const { mutate: handleMarkAbsent, isLoading: isMarkingAbsent } =
        useMarkClientAbsent()
    const [openDialog, setOpenDialog] = useState(false)
    const [openAbsentDialog, setOpenAbsentDialog] = useState(false)

    const { data: serviceConfig } = useFindServiceConfig()

    const formatTime = dateString => {
        return format(new Date(dateString), 'HH:mm', { locale: fr })
    }

    const getEstimatedWaitTime = () => {
        const now = new Date()
        const estimatedTime = new Date(client.estimatedTime)
        const waitTime = differenceInMinutes(estimatedTime, now)
        return Math.max(0, waitTime)
    }

    const totalDuration = client.services.reduce((acc, service) => {
        return acc + (serviceConfig?.[service]?.duration || 30)
    }, 0)

    const totalPrice = client.services.reduce(
        (acc, service) => acc + (serviceConfig?.[service]?.price || 20),
        0,
    )

    const estimatedWaitTime = getEstimatedWaitTime()

    // Composant de confirmation responsive
    function ConfirmTakeDialog({ trigger }) {
        return (
            <ResponsiveDialog
                open={openDialog}
                onOpenChange={setOpenDialog}
                trigger={trigger}
                title="Confirmer la prise en charge"
                description="Cette action mettra fin à la prestation du client actuellement en cours. Êtes-vous sûr de vouloir prendre en charge ce client ?"
                size="lg"
                actions={{
                    cancel: (
                        <Button
                            variant="outline"
                            onClick={() => setOpenDialog(false)}>
                            Annuler
                        </Button>
                    ),
                    confirm: (
                        <Button
                            onClick={() => {
                                setOpenDialog(false)
                                handleTakeClient(client.id)
                            }}
                            variant="default">
                            Confirmer
                        </Button>
                    ),
                }}>
                <div className="mt-4 text-center">
                    <p className="text-lg font-semibold text-primary">
                        <span className="font-mono bg-primary/10 px-2 py-1 rounded-md mr-2">
                            #{client.position.toString().padStart(3, '0')}
                        </span>
                        {client.firstName || 'Client'} {client.lastName || ''}
                    </p>
                </div>
            </ResponsiveDialog>
        )
    }

    function ConfirmAbsentDialog({ trigger }) {
        return (
            <ResponsiveDialog
                open={openAbsentDialog}
                onOpenChange={setOpenAbsentDialog}
                trigger={trigger}
                title="Confirmer l'absence"
                description="Cette action marquera ce client comme absent. Êtes-vous sûr de vouloir continuer ?"
                size="lg"
                actions={{
                    cancel: (
                        <Button
                            variant="outline"
                            onClick={() => setOpenAbsentDialog(false)}>
                            Annuler
                        </Button>
                    ),
                    confirm: (
                        <Button
                            onClick={() => {
                                setOpenAbsentDialog(false)
                                handleMarkAbsent(client.id)
                            }}
                            variant="destructive">
                            Confirmer
                        </Button>
                    ),
                }}>
                <div className="mt-4 text-center">
                    <p className="text-lg font-semibold text-primary">
                        <span className="font-mono bg-primary/10 px-2 py-1 rounded-md mr-2">
                            #{client.position.toString().padStart(3, '0')}
                        </span>
                        {client.firstName || 'Client'} {client.lastName || ''}
                    </p>
                </div>
            </ResponsiveDialog>
        )
    }

    const trigger = (
        <Button variant="default" className="flex-1" disabled={isCurrentClient}>
            Prendre en charge
        </Button>
    )

    return (
        <Card
            className={`relative pb-0 hover:shadow-md transition-shadow ${isCurrentClient ? 'border-primary' : ''}`}>
            <CardContent className="p-0">
                {/* En-tête avec numéro et statut */}
                <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center rounded-md bg-primary/10 px-2 py-1">
                            <span className="font-mono text-sm font-semibold tabular-nums">
                                #{client.position.toString().padStart(3, '0')}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-semibold">
                                    {client.firstName || 'Client'}
                                </h3>
                                <QueueStatusBadge status={client.status} />
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                                <Phone className="h-3 w-3" />
                                <a
                                    href={`tel:${client.phoneNumber}`}
                                    className="text-primary hover:underline hover:text-primary/90">
                                    {client.phoneNumber}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Infos principales : passage, durée, etc. */}
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x p-4">
                    <div className="pb-4 md:pb-0 md:pr-4">
                        <div className="mb-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
                                <Clock className="h-4 w-4" />
                                Passage prévu
                            </div>
                            <div className="text-lg font-semibold">
                                {formatTime(client.estimatedTime)}
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
                                <Timer className="h-4 w-4" />
                                Temps restant
                            </div>
                            <div className="text-lg font-semibold">
                                {estimatedWaitTime} min
                            </div>
                        </div>
                    </div>
                    <div className="pt-4 md:pt-0 md:pl-4">
                        <div className="mb-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
                                <Scissors className="h-4 w-4" />
                                Durée totale
                            </div>
                            <div className="text-lg font-semibold">
                                {totalDuration} min
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
                                <User className="h-4 w-4" />
                                Services
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-base font-bold text-green-700 mr-2">
                                    {totalPrice} €
                                </span>
                                {client.services.map((service, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                        {service}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Boutons d'action en bas */}
                {client.status === 'waiting' && (
                    <div className="flex flex-row gap-2 p-2 border-t bg-muted/50">
                        <ConfirmTakeDialog trigger={trigger} />
                        <ConfirmAbsentDialog
                            trigger={
                                <Button
                                    variant="destructive"
                                    className="flex-1"
                                    disabled={
                                        isTakingClient || isMarkingAbsent
                                    }>
                                    Absent
                                </Button>
                            }
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
