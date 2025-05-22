'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/ui-components/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from '@/ui-components/form'
import { Input } from '@/ui-components/input'
import { useCreateService } from '@/services/services/use-create-service'
import { useUpdateService } from '@/services/services/use-update-service'
import { toast } from 'sonner'

const serviceSchema = z.object({
    name: z.string().min(1, 'Le nom est requis'),
    price: z.string()
        .min(1, 'Le prix est requis')
        .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
            message: 'Le prix doit être un nombre positif',
        }),
    duration: z.string()
        .refine((val) => !val || (!isNaN(parseInt(val)) && parseInt(val) > 0), {
            message: 'La durée doit être un nombre positif',
        })
        .optional(),
})

export function ServiceForm({ service, onClose }) {
    const form = useForm({
        resolver: zodResolver(serviceSchema),
        defaultValues: {
            name: service?.name || '',
            price: service?.price?.toString() || '',
            duration: service?.duration?.toString() || '',
        },
    })

    const { mutate: createService, isLoading: isCreating } = useCreateService({
        onSuccess: () => {
            toast({
                title: 'Prestation créée',
                description: 'La prestation a été créée avec succès.',
            })
            onClose()
        },
    })

    const { mutate: updateService, isLoading: isUpdating } = useUpdateService({
        onSuccess: () => {
            toast({
                title: 'Prestation mise à jour',
                description: 'La prestation a été mise à jour avec succès.',
            })
            onClose()
        },
    })

    const onSubmit = (data) => {
        const serviceData = {
            ...data,
            price: parseFloat(data.price),
            duration: data.duration ? parseInt(data.duration) : null,
        }

        if (service) {
            updateService({ id: service.id, ...serviceData })
        } else {
            createService(serviceData)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom de la prestation</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Ex: Coupe homme"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Prix TTC</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        placeholder="Ex: 25.00"
                                        className="pl-8"
                                        {...field}
                                    />
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                        €
                                    </span>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Durée indicative</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        type="number"
                                        min="0"
                                        placeholder="Ex: 30"
                                        className="pr-12"
                                        {...field}
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                        min
                                    </span>
                                </div>
                            </FormControl>
                            <FormDescription>
                                Optionnel. Durée approximative en minutes.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        className="sm:w-auto"
                    >
                        Annuler
                    </Button>
                    <Button
                        type="submit"
                        disabled={isCreating || isUpdating}
                        className="sm:w-auto"
                    >
                        {isCreating || isUpdating
                            ? 'Enregistrement...'
                            : service
                            ? 'Mettre à jour'
                            : 'Créer la prestation'}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
