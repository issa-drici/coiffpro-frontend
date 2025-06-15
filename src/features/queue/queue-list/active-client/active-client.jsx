'use client'

import { Card, CardContent } from '@/ui-components/card'
import { useEffect, useState } from 'react'

export function ActiveClient({ queueClient }) {
    const [currentTime, setCurrentTime] = useState(new Date())

    // Mettre à jour l'heure actuelle toutes les 5 secondes
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date())
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    // Calculer le temps écoulé depuis la prise en charge (en secondes)
    const getTimeElapsedSeconds = () => {
        if (!queueClient?.started_at) return 0
        const startTime = new Date(queueClient.started_at)
        const elapsedMs = currentTime - startTime
        return Math.floor(elapsedMs / 1000) // en secondes
    }

    // Calculer la durée totale des services (en minutes)
    const getTotalDuration = () => {
        if (!queueClient?.services) return 0
        return queueClient.services.reduce((total, service) => {
            return total + (service.duration || 0)
        }, 0)
    }

    // Calculer le pourcentage de progression (basé sur les secondes)
    const getProgressPercentage = () => {
        const totalDuration = getTotalDuration() * 60 // en secondes
        const timeElapsed = getTimeElapsedSeconds()
        if (totalDuration === 0) return 0
        const percentage = (timeElapsed / totalDuration) * 100
        return Math.min(percentage, 100) // Limiter à 100%
    }

    // Formater l'heure
    const formatTime = dateString => {
        if (!dateString) return ''
        const date = new Date(dateString)
        return date.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    // Pour l'affichage texte, on garde l'arrondi à la minute
    const timeElapsedSeconds = getTimeElapsedSeconds()
    const timeElapsedMinutes = Math.floor(timeElapsedSeconds / 60)
    const progressPercentage = getProgressPercentage()

    return (
        <Card className="p-0 cursor-pointer min-h-[56px]">
            <CardContent className="p-0 relative h-full">
                <div className="flex w-full items-stretch h-full">
                    {/* Numéro ticket */}
                    <div className="flex items-center justify-center bg-blue-100 text-primary font-mono font-bold text-lg rounded-l-md w-16 h-full mr-3">
                        {('00' + queueClient?.ticket_number).slice(-2)}
                    </div>
                    {/* Infos principales */}
                    <div className="flex-1 min-w-0 p-2 flex flex-col justify-center">
                        <div className="font-bold text-base truncate">
                            {queueClient?.client?.firstName}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1 justify-center">
                            {queueClient?.services?.map(service => (
                                <span
                                    key={service.id}
                                    className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                    {service.name}
                                </span>
                            ))}
                        </div>
                    </div>
                    {/* Heure et durée */}
                    <div className="flex flex-col items-end justify-center pr-4 py-1">
                        <span className="font-bold text-lg">
                            {formatTime(queueClient?.started_at)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            depuis {timeElapsedMinutes}min
                        </span>
                    </div>
                </div>
                {/* Barre de progression en absolute en bas */}
                <div className="absolute left-0 bottom-0 w-full bg-gray-200 h-2 rounded-b-md">
                    <div
                        className="bg-primary h-2 transition-all duration-300 rounded-b-md"
                        style={{ width: `${progressPercentage}%` }}></div>
                </div>
            </CardContent>
        </Card>
    )
}
