'use client'

import { QueueItem } from '@/features/queue/queue-list/queue-item'
import { Alert, AlertDescription } from '@/ui-components/alert'
import { Skeleton } from '@/ui-components/skeleton'
import { AlertCircle } from 'lucide-react'

import { ActiveClient } from '@/features/queue/queue-list/active-client'
import { SwitchWorking } from '@/features/queue/queue-list/switch-working'
import { useAuth } from '@/hooks/auth'
import { useMoveToNextQueueClientBySalonId } from '@/services/queue/move-to-next-queueClient-by-salonId'
import { useFindAbsentQueueBySalonId } from '@/services/queue/use-find-absent-queue-by-salonId'
import { useFindCurrentQueueClientBySalonId } from '@/services/queue/use-find-current-queueClient-by-salonId'
import { useFindEndedQueueBySalonId } from '@/services/queue/use-find-ended-queue-by-salonId'
import { useFindWaitingQueueBySalonId } from '@/services/queue/use-find-waiting-queue-by-salonId'
import { Button } from '@/ui-components/button'
import { useEffect, useState } from 'react'

export function QueueList({ salonId }) {
    const [currentTime, setCurrentTime] = useState(new Date())

    // Mettre à jour l'heure actuelle toutes les secondes
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    // Formater le temps écoulé depuis une date
    const formatTimeElapsed = dateString => {
        if (!dateString) return ''

        const startTime = new Date(dateString)
        const elapsedMs = currentTime - startTime
        const elapsedMinutes = Math.ceil(elapsedMs / (1000 * 60)) // Arrondir à la minute supérieure

        if (elapsedMinutes < 60) {
            return `${elapsedMinutes} min`
        } else {
            const hours = Math.floor(elapsedMinutes / 60)
            const minutes = elapsedMinutes % 60
            return `${hours}h${minutes > 0 ? ` ${minutes}min` : ''}`
        }
    }

    const {
        data: currentQueueData,
        isLoading: isCurrentQueueLoading,
        error: currentQueueError,
    } = useFindCurrentQueueClientBySalonId(salonId)

    const {
        data: waitingQueueData,
        isLoading: isWaitingQueueLoading,
        error: waitingQueueError,
    } = useFindWaitingQueueBySalonId(salonId)

    const {
        data: endedQueueData,
        isLoading: isEndedQueueLoading,
        error: endedQueueError,
    } = useFindEndedQueueBySalonId(salonId)

    const {
        data: absentQueueData,
        isLoading: isAbsentQueueLoading,
        error: absentQueueError,
    } = useFindAbsentQueueBySalonId(salonId)

    const { mutate: moveToNextQueueClient } = useMoveToNextQueueClientBySalonId(
        { salonId },
    )

    const { user } = useAuth()

    if (
        isCurrentQueueLoading ||
        isWaitingQueueLoading ||
        isEndedQueueLoading ||
        isAbsentQueueLoading
    ) {
        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => (
                        <Skeleton key={i} className="h-24 w-full" />
                    ))}
                </div>
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <Skeleton key={i} className="h-24 w-full" />
                    ))}
                </div>
            </div>
        )
    }

    if (
        currentQueueError ||
        waitingQueueError ||
        endedQueueError ||
        absentQueueError
    ) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                    Une erreur est survenue lors du chargement de la file
                    d&apos;attente.
                </AlertDescription>
            </Alert>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center w-full">
                <div className="flex flex-col w-full">
                    <div className="text-xl font-bold">{user?.firstName}</div>
                    <div className="text-md text-muted-foreground font-normal">
                        {user?.barber?.is_active
                            ? 'En service depuis ' +
                              formatTimeElapsed(
                                  user?.barber?.is_active_changed_at,
                              )
                            : 'Non démarré'}
                    </div>
                </div>
                <SwitchWorking barber={user?.barber} salon={user?.salon} />
            </div>
            {currentQueueData?.current_client && (
                <ActiveClient queueClient={currentQueueData?.current_client} />
            )}
            <Button
                disabled={
                    !user?.barber?.is_active ||
                    waitingQueueData?.clients?.length < 1
                }
                className="w-full"
                onClick={moveToNextQueueClient}>
                {currentQueueData?.current_client ? 'Terminer' : 'Commencer'}
            </Button>
            <div className="font-semibold">
                En attente • {waitingQueueData?.clients?.length}
            </div>
            {waitingQueueData?.clients?.length === 0 ? (
                <Alert>
                    <AlertDescription>
                        Aucun client en attente pour le moment.
                    </AlertDescription>
                </Alert>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {waitingQueueData?.clients?.map(client => (
                        <QueueItem key={client.id} client={client} />
                    ))}
                </div>
            )}
            <div className="font-semibold">
                Terminé • {endedQueueData?.clients?.length}
            </div>
            {endedQueueData?.clients?.length === 0 ? (
                <Alert>
                    <AlertDescription>
                        Aucun client terminé pour le moment.
                    </AlertDescription>
                </Alert>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {endedQueueData?.clients?.map(client => (
                        <QueueItem key={client.id} client={client} />
                    ))}
                </div>
            )}
            <div className="font-semibold">
                Absent • {absentQueueData?.clients?.length}
            </div>
            {absentQueueData?.clients?.length === 0 ? (
                <Alert>
                    <AlertDescription>Aucun client absent.</AlertDescription>
                </Alert>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {absentQueueData?.clients?.map(client => (
                        <QueueItem key={client.id} client={client} />
                    ))}
                </div>
            )}
        </div>
    )
}
