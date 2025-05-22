import { SiteHeader } from '@/components/site-header'
import { DashboardSheet } from '@/features/dashboard'

export default function Page() {
    return (
        <>
            <SiteHeader name="Dashboard" />
            <DashboardSheet />
        </>
    )
}
