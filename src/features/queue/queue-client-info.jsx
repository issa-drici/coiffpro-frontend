'use client'

import { useEffect, useState } from 'react'
import { format, format as formatDate } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Timer, UserCheck, MapPin, Phone } from 'lucide-react'
import { useFindClient } from '@/services/queue/useFindClient'
import { Skeleton } from '@/ui-components/skeleton'
import { Alert, AlertDescription } from '@/ui-components/alert'
import { AlertCircle } from 'lucide-react'
import { useFindSalonInfo } from '@/services/salon/use-find-salon-info'

function useCountdown(targetDate) {
    const [timeLeft, setTimeLeft] = useState(null)

    useEffect(() => {
        if (!targetDate) {
            setTimeLeft(null)
            return
        }
        const calculateTimeLeft = () => {
            const now = new Date()
            const target = new Date(targetDate)
            const totalSeconds = Math.max(0, Math.floor((target - now) / 1000))
            const hours = Math.floor(totalSeconds / 3600)
            const minutes = Math.floor((totalSeconds % 3600) / 60)
            const seconds = totalSeconds % 60
            return { hours, minutes, seconds, totalSeconds }
        }
        setTimeLeft(calculateTimeLeft())
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft()
            setTimeLeft(newTimeLeft)
            if (newTimeLeft.totalSeconds <= 0) {
                clearInterval(timer)
            }
        }, 1000)
        return () => clearInterval(timer)
    }, [targetDate])
    return timeLeft
}

export function QueueClientInfo({ clientId }) {
    const { data: client, isLoading, error } = useFindClient(clientId)
    const timeLeft = useCountdown(client?.estimatedTime)
    const { data: salonData } = useFindSalonInfo()
    const salon = salonData?.data || {
        name: 'Salon CoiffPro',
        address: '123 rue de la Coiffure, 75001 Paris',
        phone: '01 23 45 67 89',
    }

    if (isLoading) {
        return (
            <div className="space-y-8">
                <div className="flex justify-center">
                    <Skeleton className="h-8 w-32" />
                </div>
                <div className="flex justify-center">
                    <Skeleton className="h-32 w-64" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Skeleton className="h-24" />
                    <Skeleton className="h-24" />
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                    Une erreur est survenue lors du chargement des informations
                    de la file d'attente.
                </AlertDescription>
            </Alert>
        )
    }

    if (!client) {
        return (
            <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                    Client non trouvé dans la file d'attente.
                </AlertDescription>
            </Alert>
        )
    }

    const formatTime = dateString => {
        return format(new Date(dateString), 'HH:mm', { locale: fr })
    }

    const formatDay = dateString => {
        return formatDate(new Date(dateString), 'EEEE d MMMM yyyy', {
            locale: fr,
        })
    }

    const formatTimeLeft = () => {
        if (!timeLeft) return '--:--:--'
        return `${timeLeft.hours.toString().padStart(2, '0')}:${timeLeft.minutes.toString().padStart(2, '0')}:${timeLeft.seconds.toString().padStart(2, '0')}`
    }

    return (
        <div className="space-y-8">
            {/* En-tête avec numéro de ticket */}
            <div className="flex items-center justify-center">
                <div className="flex items-center rounded-md bg-primary/10 px-4 py-2">
                    <span className="font-mono text-xl font-semibold tabular-nums">
                        Ticket #{client.position.toString().padStart(3, '0')}
                    </span>
                </div>
            </div>

            {/* Infos client et passage */}
            <div className="text-center">
                <div className="inline-flex flex-col items-center gap-4 bg-muted/50 rounded-lg p-8">
                    {/* Nom et prénom */}
                    <div className="text-lg font-semibold text-primary mb-2">
                        {client.firstName} {client.lastName || ''}
                    </div>
                    {/* Décompte */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <Timer className="h-5 w-5" />
                            Temps d'attente estimé
                        </div>
                        <div className="text-4xl font-bold font-mono tabular-nums">
                            {formatTimeLeft()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Passage prévu à {formatTime(client.estimatedTime)}
                        </div>
                    </div>
                    {/* Montant à payer */}
                    {client.amountToPay && (
                        <div className="mt-4 text-base font-medium text-green-700 bg-green-100 rounded px-3 py-1">
                            Montant à régler :{' '}
                            <span className="font-bold">
                                {client.amountToPay} €
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Informations du salon et services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg bg-muted/50 p-4">
                    <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                        <div>
                            <div className="font-medium">{salon.name}</div>
                            <a
                                href={`https://www.google.fr/maps/search/${encodeURIComponent(salon.address)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary hover:underline">
                                {salon.address}
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <a
                            href={`tel:${salon.phone}`}
                            className="text-primary hover:underline">
                            {salon.phone}
                        </a>
                    </div>
                </div>

                <div className="rounded-lg bg-muted/50 p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                        <UserCheck className="h-4 w-4" />
                        Services
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
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

            {/* Jour de passage tout en bas */}
            <div className="w-full flex justify-end mt-2">
                <span className="text-xs text-muted-foreground italic">
                    {formatDay(client.estimatedTime)}
                </span>
            </div>
        </div>
    )
}
