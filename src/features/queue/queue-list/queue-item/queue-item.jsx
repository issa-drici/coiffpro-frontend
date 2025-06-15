'use client'

import { ResponsiveDialog } from '@/components/responsive-dialog'
import { QueueStatusBadge } from '@/features/queue/queue-list/queue-item/queue-status-badge'
import { useMarkClientAbsent } from '@/services/queue/useMarkClientAbsent'
import { useTakeClient } from '@/services/queue/useTakeClient'
import { useFindServiceConfig } from '@/services/services/use-find-service-config'
import { Button } from '@/ui-components/button'
import { Card, CardContent } from '@/ui-components/card'
import { differenceInMinutes, format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Clock, Phone, Scissors, Timer, User } from 'lucide-react'
import { useState } from 'react'

export function QueueItem({ client, isCurrentClient = false }) {
    const { mutate: handleTakeClient, isLoading: isTakingClient } =
        useTakeClient()
    const { mutate: handleMarkAbsent, isLoading: isMarkingAbsent } =
        useMarkClientAbsent()
    const [openDialog, setOpenDialog] = useState(false)
    const [openAbsentDialog, setOpenAbsentDialog] = useState(false)
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)

    const { data: serviceConfig } = useFindServiceConfig()

    const formatTime = dateString => {
        return format(new Date(dateString), 'HH:mm', { locale: fr })
    }

    const getEstimatedWaitTime = () => {
        if (!client.estimatedTime) {
            return 0
        }

        const now = new Date()
        const estimatedTime = new Date(client.estimatedTime)

        // Vérifier si la date est valide
        if (isNaN(estimatedTime.getTime())) {
            return 0
        }

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
    function ConfirmTakeDialog({ trigger: triggerButton }) {
        return (
            <ResponsiveDialog
                open={openDialog}
                onOpenChange={setOpenDialog}
                trigger={triggerButton}
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
                            #{client.ticket_number.toString().padStart(3, '0')}
                        </span>
                        {client.client.firstName || 'Client'}{' '}
                        {client.client.lastName || ''}
                    </p>
                </div>
            </ResponsiveDialog>
        )
    }

    function ConfirmAbsentDialog({ trigger: triggerButton }) {
        return (
            <ResponsiveDialog
                open={openAbsentDialog}
                onOpenChange={setOpenAbsentDialog}
                trigger={triggerButton}
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
                            #{client.ticket_number.toString().padStart(3, '0')}
                        </span>
                        {client.firstName || 'Client'} {client.lastName || ''}
                    </p>
                </div>
            </ResponsiveDialog>
        )
    }

    function ClientDetailsDialog() {
        return (
            <ResponsiveDialog
                open={openDetailsDialog}
                onOpenChange={setOpenDetailsDialog}
                title={`Détails du client - #${client.ticket_number.toString().padStart(3, '0')}`}
                size="lg"
                actions={{
                    cancel: (
                        <Button
                            variant="outline"
                            onClick={() => setOpenDetailsDialog(false)}>
                            Fermer
                        </Button>
                    ),
                }}>
                <div className="space-y-6">
                    {/* Informations client */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Informations client
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
                                    <User className="h-4 w-4" />
                                    Nom complet
                                </div>
                                <div className="text-base font-semibold">
                                    {`${client.client.firstName} ${client.client.lastName}`}
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
                                    <Phone className="h-4 w-4" />
                                    Téléphone
                                </div>
                                <div className="text-base">
                                    <a
                                        href={`tel:${client.client.phoneNumber}`}
                                        className="text-primary hover:underline hover:text-primary/90">
                                        {client.client.phoneNumber}
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <QueueStatusBadge status={client.status} />
                        </div>
                    </div>

                    {/* Informations de passage */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Informations de passage
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
                                    <Clock className="h-4 w-4" />
                                    Passage prévu
                                </div>
                                <div className="text-lg font-semibold">
                                    {client.estimatedTime &&
                                        formatTime(client.estimatedTime)}
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
                                    <Timer className="h-4 w-4" />
                                    Temps restant
                                </div>
                                <div className="text-lg font-semibold">
                                    {estimatedWaitTime > 0
                                        ? `${estimatedWaitTime} min`
                                        : 'Maintenant'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Services et tarifs */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Services et tarifs
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
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
                                    Prix total
                                </div>
                                <div className="text-lg font-semibold text-green-700">
                                    {totalPrice} €
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-muted-foreground mb-2">
                                Services demandés :
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {client.services
                                    .map(service => service.name || service)
                                    .join(' + ')}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    {client.status === 'waiting' && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Actions</h3>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <ConfirmTakeDialog
                                    trigger={
                                        <Button
                                            variant="default"
                                            className="flex-1"
                                            disabled={isCurrentClient}>
                                            Prendre en charge
                                        </Button>
                                    }
                                />
                                <ConfirmAbsentDialog
                                    trigger={
                                        <Button
                                            variant="destructive"
                                            className="flex-1"
                                            disabled={
                                                isTakingClient ||
                                                isMarkingAbsent
                                            }>
                                            Marquer absent
                                        </Button>
                                    }
                                />
                            </div>
                        </div>
                    )}
                </div>
            </ResponsiveDialog>
        )
    }

    return (
        <>
            <Card
                className=" p-0 cursor-pointer"
                onClick={() => setOpenDetailsDialog(true)}>
                <CardContent className="p-0">
                    <div className="flex  w-full h-full">
                        {/* Numéro ticket */}
                        <div className="flex items-center justify-center bg-primary/10 text-primary font-mono font-bold text-lg rounded-md rounded-r-none w-16 h-full mr-3">
                            {('00' + client.ticket_number).slice(-2)}
                        </div>
                        {/* Infos principales */}
                        <div className="flex-1 min-w-0 p-2">
                            <div className="font-bold text-base truncate">
                                {client.client.firstName}
                            </div>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {client.services.map((service, idx) => (
                                    <span
                                        key={idx}
                                        className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                        {service.name || service}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {/* Heure et durée */}
                        <div className="flex flex-col items-end pr-4 py-1">
                            <span className="font-bold text-lg">
                                {client.estimatedTime &&
                                    formatTime(client.estimatedTime)}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                {estimatedWaitTime > 0
                                    ? `${estimatedWaitTime} min`
                                    : 'Maintenant'}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <ClientDetailsDialog />
        </>
    )
}
