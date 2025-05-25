'use client'

import * as React from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { useIsMobile } from '@/hooks/use-mobile'
import { useFindVisitorStats } from '@/services/stats/use-find-visitor-stats'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/ui-components/card'
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/ui-components/chart'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/ui-components/select'
import { ToggleGroup, ToggleGroupItem } from '@/ui-components/toggle-group'

export const description = 'Un graphique en aires interactif'

const chartConfig = {
    visitors: {
        label: 'Visiteurs',
    },
    desktop: {
        label: 'Ordinateur',
        color: 'var(--primary)',
    },
    mobile: {
        label: 'Mobile',
        color: 'var(--primary)',
    },
}

export function ChartAreaInteractive() {
    const isMobile = useIsMobile()
    const [timeRange, setTimeRange] = React.useState('90d')

    // Calculer les dates de début et de fin en fonction de la plage sélectionnée
    const endDate = new Date().toISOString().split('T')[0]
    const startDate = React.useMemo(() => {
        const date = new Date()
        let daysToSubtract = 90
        if (timeRange === '30d') {
            daysToSubtract = 30
        } else if (timeRange === '7d') {
            daysToSubtract = 7
        }
        date.setDate(date.getDate() - daysToSubtract)
        return date.toISOString().split('T')[0]
    }, [timeRange])

    const { data: statsData, isLoading } = useFindVisitorStats({
        startDate,
        endDate,
    })

    React.useEffect(() => {
        if (isMobile) {
            setTimeRange('7d')
        }
    }, [isMobile])

    if (isLoading) {
        return <div>Chargement des statistiques...</div>
    }

    return (
        <Card className="@container/card">
            <CardHeader>
                <CardTitle>Total des Visiteurs</CardTitle>
                <CardDescription>
                    <span className="hidden @[540px]/card:block">
                        Total des {timeRange === '90d' ? '3 derniers mois' : timeRange === '30d' ? '30 derniers jours' : '7 derniers jours'}
                    </span>
                    <span className="@[540px]/card:hidden">
                        {timeRange === '90d' ? '3 derniers mois' : timeRange === '30d' ? '30 derniers jours' : '7 derniers jours'}
                    </span>
                </CardDescription>
                <CardAction>
                    <ToggleGroup
                        type="single"
                        value={timeRange}
                        onValueChange={setTimeRange}
                        variant="outline"
                        className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex">
                        <ToggleGroupItem value="90d">
                            3 derniers mois
                        </ToggleGroupItem>
                        <ToggleGroupItem value="30d">
                            30 derniers jours
                        </ToggleGroupItem>
                        <ToggleGroupItem value="7d">
                            7 derniers jours
                        </ToggleGroupItem>
                    </ToggleGroup>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger
                            className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
                            size="sm"
                            aria-label="Sélectionner une période">
                            <SelectValue placeholder="3 derniers mois" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="90d" className="rounded-lg">
                                3 derniers mois
                            </SelectItem>
                            <SelectItem value="30d" className="rounded-lg">
                                30 derniers jours
                            </SelectItem>
                            <SelectItem value="7d" className="rounded-lg">
                                7 derniers jours
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </CardAction>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full">
                    <AreaChart data={statsData || []}>
                        <defs>
                            <linearGradient
                                id="fillDesktop"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-desktop)"
                                    stopOpacity={1.0}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-desktop)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient
                                id="fillMobile"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-mobile)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-mobile)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={value => {
                                const date = new Date(value)
                                return date.toLocaleDateString('fr-FR', {
                                    month: 'short',
                                    day: 'numeric',
                                })
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            defaultIndex={isMobile ? -1 : 10}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={value => {
                                        return new Date(
                                            value,
                                        ).toLocaleDateString('fr-FR', {
                                            month: 'short',
                                            day: 'numeric',
                                        })
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="mobile"
                            type="natural"
                            fill="url(#fillMobile)"
                            stroke="var(--color-mobile)"
                            stackId="a"
                        />
                        <Area
                            dataKey="desktop"
                            type="natural"
                            fill="url(#fillDesktop)"
                            stroke="var(--color-desktop)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
