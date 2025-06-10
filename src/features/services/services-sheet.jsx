'use client'

import { ResponsiveDialog } from '@/components/responsive-dialog'
import { ServiceForm } from '@/features/services/service-form'
import { ServiceList } from '@/features/services/service-list'
import { useAuth } from '@/hooks/auth'
import { Button } from '@/ui-components/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'

export function ServicesSheet() {
    const [isOpen, setIsOpen] = useState(false)
    const [editingService, setEditingService] = useState(null)

    const { user } = useAuth()

    const handleAddClick = () => {
        setEditingService(null)
        setIsOpen(true)
    }

    const handleEditClick = service => {
        setEditingService(service)
        setIsOpen(true)
    }

    const handleFormClose = () => {
        setIsOpen(false)
        setEditingService(null)
    }

    return (
        <div className="container mx-auto py-4 px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <p className="text-muted-foreground mt-1">
                    Gérez les prestations proposées par votre salon
                </p>
                <Button onClick={handleAddClick} className="w-full md:w-auto">
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter une prestation
                </Button>
            </div>

            <div className="bg-card rounded-lg border shadow-sm">
                <ServiceList
                    onEdit={handleEditClick}
                    salonId={user?.salon?.id}
                />
            </div>

            <ResponsiveDialog
                open={isOpen}
                onOpenChange={handleFormClose}
                title={
                    editingService
                        ? 'Modifier la prestation'
                        : 'Nouvelle prestation'
                }
                size="default"
                side="bottom">
                <ServiceForm
                    service={editingService}
                    onClose={handleFormClose}
                    setIsOpen={setIsOpen}
                    salonId={user?.salon?.id}
                />
            </ResponsiveDialog>
        </div>
    )
}
