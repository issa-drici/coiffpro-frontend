"use client"
import Header from '@/app/(app)/Header'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from '@/components/ui/input'


const FormSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  })
   
const InscriptionFileAttente = () => {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          username: "",
        },
      })
     
      function onSubmit(data) {
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
          ),
        })
      }
     
    return (
        <div className="flex flex-col justify-center items-center max-w-2xl mx-auto p-4 font-sans">
            <h1 className="mb-4 font-bold underline text-4xl">
                KARIM GK COIFF
            </h1>
            <h2 className="mb-4 underline text-2xl">
                Bienvenue dans la file d'attente de l'inscription
            </h2>
            <p className="mb-4">
                Veuillez inscrire vos informations dans les champs dédiés pour
                être tenus informer de votre place dans la file d'attente. Vous
                serez alertés par SMS lorsque votre tour arrive dans les X
                prochaines minutes.
            </p>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-2/3 space-y-6">
                    <FormField 
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom</FormLabel>
                                <FormControl>
                                    <Input placeholder="ex: Dupont" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Prénom</FormLabel>
                                <FormControl>
                                    <Input placeholder="ex: Martin" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>N° de portable</FormLabel>
                                <FormControl>
                                    <Input placeholder="ex: 06 00 00 00 00" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     
                    <Button type="submit">Envoyer</Button>
                </form>
            </Form>
        </div>
    )
}

export default InscriptionFileAttente
