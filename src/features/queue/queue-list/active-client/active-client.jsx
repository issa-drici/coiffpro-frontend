'use client'

import { Card, CardContent } from '@/ui-components/card'

export function ActiveClient({ queueClient }) {
    return (
        <Card className=" p-0 cursor-pointer">
            <CardContent className="p-0">
                <div className="flex items-center w-full">
                    {/* Numéro ticket */}
                    <div className="flex items-center justify-center bg-primary/10 text-primary font-mono font-bold text-lg rounded-md rounded-r-none w-16 h-16 mr-3">
                        {('00' + '12').slice(-2)}
                    </div>
                    {/* Infos principales */}
                    <div className="flex-1 min-w-0 p-1">
                        <div className="font-bold text-base truncate">
                            {queueClient?.client?.firstName}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
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
                    <div className="flex flex-col items-end min-w-[64px] ml-3 px-4">
                        {/* <span className="font-bold text-lg">
                        {formatTime(client.estimatedTime)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                        {totalDuration} min
                    </span> */}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
