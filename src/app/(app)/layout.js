'use client'

import { useAuth } from '@/hooks/auth'
import { Toaster } from '@/components/ui/sonner'
import Loading from '@/app/(app)/Loading'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'

const AppLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading />
    }

    return (
        <div className="min-h-screen">
            {/* <Navigation user={user} /> */}
            <Toaster />
            <main>
                <SidebarProvider>
                    <AppSidebar variant="inset" />
                    <SidebarInset>{children}</SidebarInset>
                </SidebarProvider>
            </main>
        </div>
    )
}

export default AppLayout
