'use client'

import { Badge } from '@/components/ui/badge'
import { Clock, CheckCircle, XCircle, UserCheck } from 'lucide-react'

const statusConfig = {
    waiting: {
        label: 'En attente',
        variant: 'default',
        icon: Clock,
    },
    in_progress: {
        label: 'En cours',
        variant: 'secondary',
        icon: UserCheck,
    },
    completed: {
        label: 'Terminé',
        variant: 'success',
        icon: CheckCircle,
    },
    absent: {
        label: 'Absent',
        variant: 'destructive',
        icon: XCircle,
    },
}

export function QueueStatusBadge({ status }) {
    const config = statusConfig[status] || statusConfig.waiting
    const Icon = config.icon

    return (
        <Badge variant={config.variant} className="flex items-center gap-1">
            <Icon className="h-3 w-3" />
            {config.label}
        </Badge>
    )
}
