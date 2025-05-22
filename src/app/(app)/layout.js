'use client'

import { useAuth } from '@/hooks/auth'
import { Toaster } from '@/ui-components/sonner'
import { SidebarInset, SidebarProvider } from '@/ui-components/sidebar'
import { AppSidebar } from '@/components/app-sidebar'

const AppLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return (
            <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
                Loading...
            </div>
        )
    }

    return (
        <div className="min-h-screen">
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
