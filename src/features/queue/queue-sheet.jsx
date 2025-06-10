'use client'

import { QueueList } from '@/features/queue/queue-list'
import { useAuth } from '@/hooks/auth'

export function QueueSheet() {
    const { user } = useAuth()

    if (!user) {
        return null
    }

    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
                    <QueueList salonId={user?.salon?.id} />
                </div>
            </div>
        </div>
    )
}
