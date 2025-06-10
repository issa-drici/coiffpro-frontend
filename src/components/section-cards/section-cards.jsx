import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react'

import { Badge } from '@/ui-components/badge'
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/ui-components/card'

export function SectionCards() {
    return (
        <div className="dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Revenu Total</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        $1,250.00
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconTrendingUp />
                            +12.5%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        En hausse ce mois-ci{' '}
                        <IconTrendingUp className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                        Visiteurs des 6 derniers mois
                    </div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Nouveaux Clients</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        1,234
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconTrendingDown />
                            -20%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Baisse de 20% cette période{' '}
                        <IconTrendingDown className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                        L&apos;acquisition nécessite de l&apos;attention
                    </div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Comptes Actifs</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        45,678
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconTrendingUp />
                            +12.5%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Forte rétention des utilisateurs{' '}
                        <IconTrendingUp className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                        L&apos;engagement dépasse les objectifs
                    </div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Taux de Croissance</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        4.5%
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconTrendingUp />
                            +4.5%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Augmentation constante des performances{' '}
                        <IconTrendingUp className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                        Correspond aux projections de croissance
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
