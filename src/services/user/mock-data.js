export const mockUserInfo = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    role: 'admin',
    salonId: 1,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
}

export const mockNavigationItems = [
    {
        title: 'Dashboard',
        url: '/admin/dashboard',
        icon: 'IconDashboard',
    },
    {
        title: 'Prestations',
        url: '/admin/services',
        icon: 'IconListDetails',
    },
    {
        title: "Liste d'attente",
        url: '/admin/queue',
        icon: 'IconChartBar',
    },
    {
        title: 'Clients',
        url: '/admin/clients',
        icon: 'IconUsers',
    },
    {
        title: 'Rendez-vous',
        url: '/admin/appointments',
        icon: 'IconCalendar',
    },
    {
        title: 'Statistiques',
        url: '/admin/stats',
        icon: 'IconChartPie',
    },
]
