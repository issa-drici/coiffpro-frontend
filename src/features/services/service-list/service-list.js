'use client'

import { ResponsiveDialog } from '@/components/responsive-dialog'
import { useDeleteService } from '@/services/services/use-delete-service'
import { useGetServices } from '@/services/services/useGetServices'
import { Button } from '@/ui-components/button'
import { Skeleton } from '@/ui-components/skeleton'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/ui-components/table'
import { formatPrice } from '@/utils/format'
import { Edit, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export function ServiceList({ onEdit, salonId }) {
    const [serviceToDelete, setServiceToDelete] = useState(null)
    const { data: services, isLoading: isLoadingServices } =
        useGetServices(salonId)
    const { mutate: deleteService, isLoading: isDeleting } = useDeleteService({
        salonId,
        onSuccess: () => {
            toast.success('Prestation supprimée', {
                description: 'La prestation a été supprimée avec succès.',
            })
            setServiceToDelete(null)
        },
    })

    if (isLoadingServices) {
        return (
            <div className="p-4">
                <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-4">
                            <Skeleton className="h-12 w-full" />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (!services?.data?.length) {
        return (
            <div className="p-8 text-center">
                <p className="text-muted-foreground">
                    Aucune prestation n&apos;a été créée pour le moment.
                </p>
            </div>
        )
    }

    return (
        <>
            <div className="relative overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[40%]">Nom</TableHead>
                            <TableHead className="w-[30%]">Prix TTC</TableHead>
                            <TableHead className="w-[20%]">Durée</TableHead>
                            <TableHead className="w-[10%] text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {services.data.map(service => (
                            <TableRow key={service.id}>
                                <TableCell className="font-medium">
                                    {service.name}
                                </TableCell>
                                <TableCell>
                                    {formatPrice(service.price)}
                                </TableCell>
                                <TableCell>
                                    {service.duration
                                        ? `${service.duration} min`
                                        : '-'}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onEdit(service)}
                                            className="h-8 w-8">
                                            <Edit className="h-4 w-4" />
                                            <span className="sr-only">
                                                Modifier
                                            </span>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                setServiceToDelete(service)
                                            }
                                            className="h-8 w-8 text-destructive hover:text-destructive">
                                            <Trash2 className="h-4 w-4" />
                                            <span className="sr-only">
                                                Supprimer
                                            </span>
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <ResponsiveDialog
                open={!!serviceToDelete}
                onOpenChange={() => setServiceToDelete(null)}
                title="Êtes-vous sûr ?"
                description={`Cette action est irréversible. La prestation "${serviceToDelete?.name}" sera définitivement supprimée.`}
                size="sm"
                actions={{
                    cancel: <Button variant="outline">Annuler</Button>,
                    confirm: (
                        <Button
                            onClick={() => deleteService(serviceToDelete.id)}
                            disabled={isDeleting}
                            variant="destructive">
                            {isDeleting ? 'Suppression...' : 'Supprimer'}
                        </Button>
                    ),
                }}
            />
        </>
    )
}
