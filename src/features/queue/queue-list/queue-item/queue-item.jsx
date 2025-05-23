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
import { useMediaQuery } from '@/hooks/use-media-query'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from '@/ui-components/dialog'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/ui-components/drawer'
import { ResponsiveDialog } from '@/components/responsive-dialog'

export function QueueItem({ client, isCurrentClient = false }) {
    const { mutate: handleTakeClient, isLoading: isTakingClient } =
        useTakeClient()
    const { mutate: handleMarkAbsent, isLoading: isMarkingAbsent } =
        useMarkClientAbsent()
    const [openDialog, setOpenDialog] = useState(false)
    const [openAbsentDialog, setOpenAbsentDialog] = useState(false)
    const isDesktop = useMediaQuery('(min-width: 768px)')

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
        const serviceDurations = {
            'Coupe homme': 20,
            'Coupe femme': 30,
            Barbe: 15,
            Brushing: 25,
            Coloration: 45,
            Mèches: 60,
        }
        return acc + (serviceDurations[service] || 30)
    }, 0)

    const estimatedWaitTime = getEstimatedWaitTime()

    // Prix fictifs par service (modifiable)
    const servicePrices = {
        'Coupe homme': 20,
        'Coupe femme': 30,
        Barbe: 10,
        Brushing: 18,
        Coloration: 40,
        Mèches: 50,
    }
    const totalPrice = client.services.reduce(
        (acc, service) => acc + (servicePrices[service] || 20),
        0,
    )

    // Composant de confirmation responsive
    function ConfirmTakeDialog({ trigger }) {
        if (isDesktop) {
            return (
                <ResponsiveDialog
                    open={openDialog}
                    onOpenChange={setOpenDialog}
                    trigger={trigger}
                    title="Confirmer la prise en charge"
                    description="Cette action mettra fin à la prestation du client actuellement en cours. Êtes-vous sûr de vouloir prendre en charge ce client ?"
                    size="sm"
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
                    }}
                />
            )
        }
        return (
            <Drawer open={openDialog} onOpenChange={setOpenDialog}>
                <DrawerTrigger asChild>{trigger}</DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader className="text-left">
                        <DrawerTitle>Confirmer la prise en charge</DrawerTitle>
                        <DrawerDescription>
                            Cette action mettra fin à la prestation du client
                            actuellement en cours. Êtes-vous sûr de vouloir
                            prendre en charge ce client&nbsp;?
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter className="pt-2">
                        <Button
                            onClick={() => {
                                setOpenDialog(false)
                                handleTakeClient(client.id)
                            }}
                            variant="default">
                            Confirmer
                        </Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Annuler</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        )
    }

    function ConfirmAbsentDialog({ trigger }) {
        if (isDesktop) {
            return (
                <Dialog
                    open={openAbsentDialog}
                    onOpenChange={setOpenAbsentDialog}>
                    <DialogTrigger asChild>{trigger}</DialogTrigger>
                    <DialogContent className="sm:max-w-[400px]">
                        <DialogHeader>
                            <DialogTitle>Confirmer l'absence</DialogTitle>
                            <DialogDescription>
                                Cette action marquera ce client comme absent.
                                Êtes-vous sûr de vouloir continuer&nbsp;?
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button
                                onClick={() => {
                                    setOpenAbsentDialog(false)
                                    handleMarkAbsent(client.id)
                                }}
                                variant="destructive">
                                Confirmer
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setOpenAbsentDialog(false)}>
                                Annuler
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            )
        }
        return (
            <Drawer open={openAbsentDialog} onOpenChange={setOpenAbsentDialog}>
                <DrawerTrigger asChild>{trigger}</DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader className="text-left">
                        <DrawerTitle>Confirmer l'absence</DrawerTitle>
                        <DrawerDescription>
                            Cette action marquera ce client comme absent.
                            Êtes-vous sûr de vouloir continuer&nbsp;?
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter className="pt-2">
                        <Button
                            onClick={() => {
                                setOpenAbsentDialog(false)
                                handleMarkAbsent(client.id)
                            }}
                            variant="destructive">
                            Confirmer
                        </Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Annuler</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        )
    }

    const trigger = (
        <Button
            variant="default"
            onClick={() => setOpenDialog(true)}
            className="flex-1"
            disabled={isCurrentClient}>
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
