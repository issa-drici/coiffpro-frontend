'use client'

import { Form, FormControl, FormField, FormItem } from '@/ui-components/form'
import { Switch } from '@/ui-components/switch'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const FormSchema = z.object({
    working: z.boolean(),
})

export function SwitchWorking() {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            working: false,
        },
    })

    function onSubmit(data) {
        toast('', {
            description: (
                <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="working"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={checked => {
                                        field.onChange(checked)
                                        form.handleSubmit(onSubmit)()
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
