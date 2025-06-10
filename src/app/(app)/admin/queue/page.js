import { SiteHeader } from '@/components/site-header'
import { QueueSheet } from '@/features/queue'

export default function QueuePage() {
    return (
        <>
            <SiteHeader name="Liste d'attente" />
            <QueueSheet />
        </>
    )
}
