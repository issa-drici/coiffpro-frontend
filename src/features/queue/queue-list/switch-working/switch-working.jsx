'use client'

import { useToggleBarberStatus } from '@/services/barber/use-toggle-barber-status'
import { Form, FormControl, FormField, FormItem } from '@/ui-components/form'
import { Switch } from '@/ui-components/switch'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useSWRConfig } from 'swr'
import { z } from 'zod'

const FormSchema = z.object({
    is_active: z.boolean(),
})

export function SwitchWorking({ barber }) {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            is_active: barber?.is_active,
        },
    })

    const { mutate: mutateSWR } = useSWRConfig()

    const { mutate: toggleStatus, isLoading } = useToggleBarberStatus({
        onSuccess: data => {
            toast.success('Statut mis à jour', {
                description: `Le statut du barbier a été modifié.`,
            })
            form.setValue('is_active', data?.data?.is_active)

            // Invalider directement la clé SWR utilisée dans useAuth
            mutateSWR('/api/user')
        },
        onError: () => {
            toast.error('Erreur', {
                description: `Impossible de changer le statut du barbier.`,
            })
        },
    })

    function onSubmit() {
        // On ne fait rien ici, tout se passe dans le switch
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="is_active"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    disabled={isLoading}
                                    onCheckedChange={checked => {
                                        field.onChange(checked)
                                        toggleStatus(barber.id)
                                    }}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}
