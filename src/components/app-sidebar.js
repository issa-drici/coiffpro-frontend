import * as React from 'react'
import {
    IconCamera,
    IconChartBar,
    IconCut,
    IconDashboard,
    IconFileAi,
    IconFileDescription,
    IconHelp,
    IconListDetails,
    IconRazorElectric,
    IconSettings,
} from '@tabler/icons-react'

import { NavMain } from '@/components/nav-main'
import { NavSecondary } from '@/components/nav-secondary'
import { NavUser } from '@/components/nav-user'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useAuth } from '@/hooks/auth'
import Link from 'next/link'

const data = {
    user: {
        name: 'shadcn',
        email: 'm@example.com',
        avatar: '/avatars/shadcn.jpg',
    },
    navMain: [
        {
            title: 'Dashboard',
            url: '/admin/dashboard',
            icon: IconDashboard,
        },
        {
            title: 'Prestations',
            url: '/admin/services',
            icon: IconListDetails,
        },
        {
            title: "Liste d'attente",
            url: '/admin/queue',
            icon: IconChartBar,
        },
        {
            title: 'Coiffeurs',
            url: '#',
            icon: IconCut,
            disabled: true,
        },
        // {
        //     title: 'Team',
        //     url: '#',
        //     icon: IconUsers,
        // },
    ],
    navClouds: [
        {
            title: 'Capture',
            icon: IconCamera,
            isActive: true,
            url: '#',
            items: [
                {
                    title: 'Active Proposals',
                    url: '#',
                },
                {
                    title: 'Archived',
                    url: '#',
                },
            ],
        },
        {
            title: 'Proposal',
            icon: IconFileDescription,
            url: '#',
            items: [
                {
                    title: 'Active Proposals',
                    url: '#',
                },
                {
                    title: 'Archived',
                    url: '#',
                },
            ],
        },
        {
            title: 'Prompts',
            icon: IconFileAi,
            url: '#',
            items: [
                {
                    title: 'Active Proposals',
                    url: '#',
                },
                {
                    title: 'Archived',
                    url: '#',
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: 'Réglages',
            url: '#',
            icon: IconSettings,
        },
        {
            title: 'Assistance',
            url: '#',
            icon: IconHelp,
        },
        // {
        //     title: 'Search',
        //     url: '#',
        //     icon: IconSearch,
        // },
    ],
    // documents: [
    //     {
    //         name: 'Data Library',
    //         url: '#',
    //         icon: IconDatabase,
    //     },
    //     {
    //         name: 'Reports',
    //         url: '#',
    //         icon: IconReport,
    //     },
    //     {
    //         name: 'Word Assistant',
    //         url: '#',
    //         icon: IconFileWord,
    //     },
    // ],
}

export function AppSidebar({ ...props }) {
    const { user } = useAuth({ middleware: 'auth' })

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5">
                            <Link href="/admin/dashboard">
                                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                                    <IconRazorElectric className="!size-5" />
                                </div>
                                <span className="text-base font-semibold">
                                    CoiffPro
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                {/* <NavDocuments items={data.documents} /> */}
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    )
}
