'use client'

import { useState } from 'react'
import { Button } from '@/ui-components/button'
import { Plus } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { ServiceList } from '@/features/services/service-list'
import { ServiceForm } from '@/features/services/service-form'
import { ResponsiveDialog } from '@/components/responsive-dialog'

export function ServicesSheet() {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingService, setEditingService] = useState(null)

    const handleAddClick = () => {
        setEditingService(null)
        setIsFormOpen(true)
    }

    const handleEditClick = service => {
        setEditingService(service)
        setIsFormOpen(true)
    }

    const handleFormClose = () => {
        setIsFormOpen(false)
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
                <ServiceList onEdit={handleEditClick} />
            </div>

            <ResponsiveDialog
                open={isFormOpen}
                onOpenChange={setIsFormOpen}
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
                />
            </ResponsiveDialog>
        </div>
    )
}
