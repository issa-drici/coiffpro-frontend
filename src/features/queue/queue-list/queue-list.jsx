'use client'

import { QueueItem } from '@/features/queue/queue-list/queue-item'
import { Skeleton } from '@/ui-components/skeleton'
import { Alert, AlertDescription } from '@/ui-components/alert'
import { AlertCircle, Clock, Timer, X } from 'lucide-react'
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/ui-components/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui-components/tabs'
import { useMemo, useState, useEffect, useRef } from 'react'
import { useFindQueue } from '@/services/queue/useFindQueue'
import { Button } from '@/ui-components/button'
import { useMediaQuery } from '@/hooks/use-media-query'

function formatDuration(minutes) {
    if (minutes < 60) return `${minutes} min`
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return m === 0 ? `${h}h` : `${h}h ${m} min`
}

function QueueStats({ data }) {
    const stats = useMemo(() => {
        const waiting =
            data?.filter(client => client.status === 'waiting') || []
        const completed =
            data?.filter(client => client.status === 'completed') || []
        const inProgress =
            data?.filter(client => client.status === 'in_progress') || []
        const totalRest =
            data?.filter(
                client =>
                    client.status === 'waiting' ||
                    client.status === 'in_progress',
            ) || []
        const totalDuration = totalRest.reduce(
            (acc, client) => acc + (client.estimatedDuration || 0),
            0,
        )
        const averageWaitTime =
            waiting.length > 0
                ? Math.round(
                      waiting.reduce(
                          (acc, client) =>
                              acc + (client.estimatedDuration || 0),
                          0,
                      ) / waiting.length,
                  )
                : 0
        return {
            waiting: waiting.length,
            completed: completed.length,
            inProgress: inProgress.length,
            totalDuration,
            averageWaitTime,
        }
    }, [data])

    return (
        <div className="dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-4 mb-6">
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>En attente</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {stats.waiting}
                    </CardTitle>
                </CardHeader>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Temps d'attente moyen</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {stats.averageWaitTime} min
                    </CardTitle>
                </CardHeader>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Terminés aujourd'hui</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {stats.completed}
                    </CardTitle>
                </CardHeader>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Durée totale restante</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl flex items-center gap-2">
                        <Timer className="h-5 w-5 text-muted-foreground" />
                        {formatDuration(stats.totalDuration)}
                    </CardTitle>
                </CardHeader>
            </Card>
        </div>
    )
}

let delayId = 0

export function QueueList() {
    const { data: queueData, isLoading, error } = useFindQueue()
    const isDesktop = useMediaQuery('(min-width: 768px)')

    // État local pour la démo
    // const [serviceActive, setServiceActive] = useState(false)
    // Chaque bloc = { id, expiresAt: Date }
    const [delayBlocks, setDelayBlocks] = useState([])

    // Ajout d'un bloc de 10min
    const handleAddDelay = () => {
        setDelayBlocks(blocks => {
            const now = new Date()
            const last = blocks[blocks.length - 1]
            const base = last ? new Date(last.expiresAt) : now
            const expiresAt = new Date(base.getTime() + 10 * 60 * 1000)
            delayId += 1
            return [
                ...blocks,
                { id: `delay-${delayId}-${Date.now()}`, expiresAt },
            ]
        })
    }

    // Suppression manuelle d'un bloc (toujours le dernier)
    const handleRemoveDelay = () => {
        setDelayBlocks(blocks => blocks.slice(0, -1))
    }

    // Suppression auto du premier bloc quand timer = 0
    useEffect(() => {
        if (!delayBlocks.length) return
        const now = new Date()
        const msLeft = new Date(delayBlocks[0].expiresAt) - now
        if (msLeft <= 0) {
            setDelayBlocks(blocks => blocks.slice(1))
            return
        }
        const timeout = setTimeout(() => {
            setDelayBlocks(blocks => blocks.slice(1))
        }, msLeft)
        return () => clearTimeout(timeout)
    }, [delayBlocks])

    if (isLoading) {
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

    if (error) {
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

    const waitingClients =
        queueData?.filter(client => client.status === 'waiting') || []
    const completedClients =
        queueData?.filter(client => client.status === 'completed') || []
    const currentClient = queueData?.find(
        client => client.status === 'in_progress',
    )

    // Handlers mock
    // const handleStartService = () => setServiceActive(true)
    // const handleEndService = () => setServiceActive(false)

    return (
        <div className="space-y-6">
            {/* BARRE D'ACTIONS GROS BOUTONS */}
            <div className="flex flex-col sm:flex-row gap-4 px-4 lg:px-6 mt-2 mb-4">
                {/* <Button
                    variant={serviceActive ? 'secondary' : 'default'}
                    onClick={handleStartService}
                    disabled={serviceActive}
                    className="flex items-center justify-center text-lg font-semibold py-4 px-6 gap-3 w-full sm:w-auto rounded-2xl shadow-md">
                    <Play className="h-7 w-7" />
                    {serviceActive
                        ? 'Service en cours'
                        : "Activer la liste d'attente"}
                </Button> */}
                <Button
                    variant="outline"
                    onClick={handleAddDelay}
                    className="flex items-center justify-center text-lg font-semibold py-4 px-6 gap-3 w-full sm:w-auto rounded-2xl shadow-md">
                    <Clock className="h-7 w-7" />
                    Ajouter 10 min de retard
                </Button>
                {/* <Button
                    variant="destructive"
                    onClick={handleEndService}
                    disabled={waitingClients.length > 0 || !serviceActive}
                    className="flex items-center justify-center text-lg font-semibold py-4 px-6 gap-3 w-full sm:w-auto rounded-2xl shadow-md">
                    <StopCircle className="h-7 w-7" />
                    Terminer le service
                </Button> */}
            </div>
            {/* FIN BARRE D'ACTIONS */}

            {/* Stats en haut sur desktop uniquement */}
            {isDesktop && <QueueStats data={queueData} />}

            {/* CLIENT EN COURS + RETARD */}
            {currentClient && (
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-4 px-4 lg:px-6">
                        Client en cours
                    </h2>
                    <div className="px-4 lg:px-6">
                        <QueueItem
                            client={currentClient}
                            isCurrentClient={true}
                        />
                        {/* Affichage du retard en cours avec timer */}
                        {delayBlocks.length > 0 && (
                            <div className="w-full flex flex-col gap-3 mt-4">
                                {delayBlocks.map((block, i) => (
                                    <AnimatedDelayBlock
                                        key={block.id}
                                        expiresAt={block.expiresAt}
                                        showTimer={i === 0}
                                        onRemove={handleRemoveDelay}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            <Tabs defaultValue="waiting" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="waiting">
                        En attente ({waitingClients.length})
                    </TabsTrigger>
                    <TabsTrigger value="completed">
                        Terminés ({completedClients.length})
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="waiting" className="mt-4">
                    {waitingClients.length === 0 ? (
                        <Alert>
                            <AlertDescription>
                                Aucun client en attente pour le moment.
                            </AlertDescription>
                        </Alert>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 px-4 lg:px-6">
                            {waitingClients.map(client => (
                                <QueueItem key={client.id} client={client} />
                            ))}
                        </div>
                    )}
                </TabsContent>
                <TabsContent value="completed" className="mt-4">
                    {completedClients.length === 0 ? (
                        <Alert>
                            <AlertDescription>
                                Aucun client terminé aujourd'hui.
                            </AlertDescription>
                        </Alert>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 px-4 lg:px-6">
                            {completedClients.map(client => (
                                <QueueItem key={client.id} client={client} />
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>

            {/* Stats en bas sur mobile uniquement */}
            {!isDesktop && <QueueStats data={queueData} />}
        </div>
    )
}

function AnimatedDelayBlock({ expiresAt, showTimer, onRemove }) {
    const [show, setShow] = useState(false)
    const [timeLeft, setTimeLeft] = useState(0)
    const ref = useRef(null)

    // Animation d'apparition
    useEffect(() => {
        setTimeout(() => setShow(true), 10)
    }, [])

    // Timer pour le premier bloc
    useEffect(() => {
        if (!showTimer) return
        const update = () => {
            const now = new Date()
            const ms = new Date(expiresAt) - now
            setTimeLeft(Math.max(0, ms))
        }
        update()
        const interval = setInterval(update, 250)
        return () => clearInterval(interval)
    }, [expiresAt, showTimer])

    // Format mm:ss
    const formatTime = ms => {
        const totalSec = Math.ceil(ms / 1000)
        const min = Math.floor(totalSec / 60)
        const sec = totalSec % 60
        return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
    }

    return (
        <div
            ref={ref}
            className={`w-full bg-yellow-100 text-yellow-800 font-semibold rounded-xl px-4 py-3 text-base shadow border border-yellow-300 flex items-center transition-all duration-300 ease-out
                ${show ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 -translate-y-10'}`}
            style={{ willChange: 'opacity, transform' }}>
            <div className="flex-1 text-left select-none text-base font-bold">
                +10 min
            </div>
            <div className="flex-1 text-center select-none text-2xl font-mono font-bold text-yellow-900">
                {showTimer ? formatTime(timeLeft) : ''}
            </div>
            <button
                type="button"
                className="ml-2 p-1 rounded-full hover:bg-yellow-200 focus:outline-none"
                aria-label="Annuler ce retard"
                onClick={onRemove}>
                <X className="h-6 w-6" />
            </button>
        </div>
    )
}
