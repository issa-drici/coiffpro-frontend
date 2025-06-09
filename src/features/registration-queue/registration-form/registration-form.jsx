"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useGetServices } from "@/services/services/useGetServices";
import { useRegisterClient } from "@/services/queue/useRegisterClient";
import { Button } from "@/ui-components/button";
import { Input } from "@/ui-components/input";
import { Checkbox } from "@/ui-components/checkbox";
import { Alert, AlertDescription } from "@/ui-components/alert";
import {
    AlertCircle,
    Loader2,
    Phone,
    User,
    Mail,
    Clock,
    Calendar,
    Euro,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
} from "@/ui-components/form";
import { useGetEstimatedTime } from "@/services/queue/useGetEstimatedTime";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    firstName: z
        .string()
        .min(2, "Le prénom doit contenir au moins 2 caractères")
        .max(50, "Le prénom ne peut pas dépasser 50 caractères"),
    lastName: z
        .string()
        .min(2, "Le nom doit contenir au moins 2 caractères")
        .max(50, "Le nom ne peut pas dépasser 50 caractères"),
    email: z
        .string()
        .email("Format d'email invalide")
        .optional()
        .or(z.literal("")),
    phoneNumber: z
        .string()
        .min(10, "Le numéro de téléphone doit contenir 10 chiffres")
        .max(10, "Le numéro de téléphone doit contenir 10 chiffres")
        .regex(
            /^[0-9]+$/,
            "Le numéro de téléphone ne doit contenir que des chiffres",
        ),
    services: z
        .array(z.string())
        .min(1, "Veuillez sélectionner au moins une prestation"),
});

export function RegistrationForm({ salonId }) {
    const router = useRouter();
    const [isSuccess] = useState(false);
    const { data: services, isLoading: isLoadingServices } =
        useGetServices(salonId);
    const { mutateAsync: registerClient, isLoading: isSubmitting } =
        useRegisterClient({
            onSuccess: ({ data: queueClient }) => {
                router.push(`/salon/${salonId}/queue/${queueClient?.id}`);
            },
        });
    const [selectedServicesState, setSelectedServicesState] = useState([]);
    const { data: estimatedTimeData } = useGetEstimatedTime(salonId);

    const form = useForm({
        resolver: zodResolver(formSchema),
        mode: "onTouched",
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            services: [],
        },
    });

    // Synchroniser le state local avec le champ du formulaire
    useEffect(() => {
        form.setValue("services", selectedServicesState, {
            shouldValidate: true,
        });
    }, [selectedServicesState]);

    const totalPrice = selectedServicesState.reduce((total, serviceId) => {
        const service = services?.data?.find(s => s.id === serviceId);
        return total + (parseFloat(service?.price) || 0);
    }, 0);

    // Vérification si le formulaire est valide
    const isFormValid =
        form.formState.isValid && selectedServicesState.length > 0;

    const onSubmit = async data => {
        try {
            await registerClient({
                salonId,
                ...data,
                services: data.services,
            });
        } catch (error) {
            // Les erreurs sont déjà gérées dans le hook (toast)
        }
    };

    if (isSuccess) {
        return null; // On ne montre plus le message de succès, la redirection est automatique
    }

    return (
        <Form {...form}>
            <div className="flex justify-center w-full">
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 md:space-y-8 max-w-2xl w-full">
                    <Alert variant="warning" className="text-sm md:text-base">
                        <AlertCircle className="h-4 w-4 shrink-0 md:h-5 md:w-5" />
                        <AlertDescription>
                            Merci de ne vous inscrire que si vous êtes
                            physiquement dans le salon. Toute inscription
                            abusive peut entraîner un avertissement et un
                            blocage.
                        </AlertDescription>
                    </Alert>

                    <div className="md:grid md:grid-cols-2 md:gap-8">
                        {/* Colonne de gauche - Informations personnelles */}
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold md:text-xl">
                                    Informations personnelles
                                </h2>
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2 text-base">
                                                    <User className="h-4 w-4 md:h-5 md:w-5" />
                                                    Prénom{" "}
                                                    <span className="text-destructive">
                                                        *
                                                    </span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Votre prénom"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2 text-base">
                                                    <User className="h-4 w-4 md:h-5 md:w-5" />
                                                    Nom{" "}
                                                    <span className="text-destructive">
                                                        *
                                                    </span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Votre nom"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phoneNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2 text-base">
                                                    <Phone className="h-4 w-4 md:h-5 md:w-5" />
                                                    Numéro de téléphone{" "}
                                                    <span className="text-destructive">
                                                        *
                                                    </span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="0612345678"
                                                        type="tel"
                                                        inputMode="numeric"
                                                        pattern="[0-9]*"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2 text-base">
                                                    <Mail className="h-4 w-4 md:h-5 md:w-5" />
                                                    Email (optionnel)
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="votre@email.com"
                                                        type="email"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Pour recevoir nos actualités
                                                    et offres spéciales
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Colonne de droite - Services */}
                        <div className="space-y-6 mt-16 md:mt-0">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold md:text-xl">
                                        Prestations
                                    </h2>
                                    {/* {selectedServicesState.length > 0 && (
                                        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                                            <Clock className="h-4 w-4" />
                                            <span>
                                                Durée totale :{' '}
                                                {selectedServicesState.reduce(
                                                    (total, id) =>
                                                        total +
                                                        (services?.find(
                                                            s => s.id === id,
                                                        )?.duration || 0),
                                                    0,
                                                )}{' '}
                                                min
                                            </span>
                                        </div>
                                    )} */}
                                </div>
                                {isLoadingServices ? (
                                    <div className="flex items-center justify-center py-12">
                                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                                    </div>
                                ) : (
                                    <FormField
                                        control={form.control}
                                        name="services"
                                        render={() => (
                                            <div className="space-y-3 md:space-y-4">
                                                {services?.data?.map(
                                                    service => {
                                                        const isChecked =
                                                            selectedServicesState.includes(
                                                                service.id,
                                                            );
                                                        return (
                                                            <FormItem
                                                                key={service.id}
                                                                className="flex items-center space-x-4 rounded-lg border p-4 transition-colors hover:bg-muted/50 cursor-pointer md:p-5"
                                                                onClick={e => {
                                                                    if (
                                                                        e.target.closest(
                                                                            'input[type="checkbox"]',
                                                                        )
                                                                    )
                                                                        return;
                                                                    setSelectedServicesState(
                                                                        current =>
                                                                            isChecked
                                                                                ? current.filter(
                                                                                      val =>
                                                                                          val !==
                                                                                          service.id,
                                                                                  )
                                                                                : [
                                                                                      ...current,
                                                                                      service.id,
                                                                                  ],
                                                                    );
                                                                }}>
                                                                <FormControl>
                                                                    <Checkbox
                                                                        id={`service-${service.id}`}
                                                                        value={
                                                                            service.id
                                                                        }
                                                                        checked={
                                                                            isChecked
                                                                        }
                                                                        onCheckedChange={checked => {
                                                                            setSelectedServicesState(
                                                                                current =>
                                                                                    checked
                                                                                        ? [
                                                                                              ...current,
                                                                                              service.id,
                                                                                          ]
                                                                                        : current.filter(
                                                                                              val =>
                                                                                                  val !==
                                                                                                  service.id,
                                                                                          ),
                                                                            );
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="font-medium md:text-base">
                                                                            {
                                                                                service.name
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-sm text-muted-foreground">
                                                                        {
                                                                            service.duration
                                                                        }{" "}
                                                                        min
                                                                    </p>
                                                                </div>
                                                                <span className="font-semibold shrink-0 md:text-lg">
                                                                    {formatPrice(
                                                                        service.price,
                                                                    )}
                                                                </span>
                                                            </FormItem>
                                                        );
                                                    },
                                                )}
                                                {(form.formState.touchedFields
                                                    .services ||
                                                    form.formState
                                                        .isSubmitted) && (
                                                    <FormMessage />
                                                )}
                                            </div>
                                        )}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="sticky bottom-0 -mx-4 -mb-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 border-t md:static md:mx-0 md:mb-0 md:border-0 md:bg-transparent md:p-0">
                        {selectedServicesState.length > 0 ? (
                            <div className="mb-6 space-y-4">
                                <div className="rounded-lg bg-muted/50 p-4 md:p-6">
                                    <h3 className="text-base font-semibold mb-4 md:text-lg">
                                        Récapitulatif de votre inscription
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Clock className="h-4 w-4" />
                                                <span>Durée totale</span>
                                            </div>
                                            <span className="font-medium">
                                                {selectedServicesState.reduce(
                                                    (total, id) =>
                                                        total +
                                                        (services?.data?.find(
                                                            s => s.id === id,
                                                        )?.duration || 0),
                                                    0,
                                                )}{" "}
                                                minutes
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Calendar className="h-4 w-4" />
                                                <span>
                                                    Temps d&apos;attente estimé
                                                </span>
                                            </div>
                                            <span className="font-medium">
                                                {estimatedTimeData?.data
                                                    ?.estimatedTime
                                                    ? format(
                                                          new Date(
                                                              estimatedTimeData.data.estimatedTime,
                                                          ),
                                                          "HH:mm",
                                                          {
                                                              locale: fr,
                                                          },
                                                      )
                                                    : "Calcul en cours..."}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between pt-2 border-t">
                                            <div className="flex items-center gap-2">
                                                <Euro className="h-4 w-4" />
                                                <span className="font-medium">
                                                    Total à payer
                                                </span>
                                            </div>
                                            <span className="text-lg font-bold md:text-xl">
                                                {formatPrice(totalPrice)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="mb-6">
                                <Alert variant="info" className="bg-muted/50">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>
                                        Veuillez sélectionner au moins une
                                        prestation pour voir le récapitulatif et
                                        vous inscrire.
                                    </AlertDescription>
                                </Alert>
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-11 text-base md:h-12 md:text-lg"
                            disabled={!isFormValid || isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin md:h-5 md:w-5" />
                                    Inscription en cours...
                                </>
                            ) : (
                                "S&apos;inscrire à la file d&apos;attente"
                            )}
                        </Button>
                    </div>
                    {/* {Object.keys(form.formState.errors).length > 0 && (
                            <div className="mb-4">
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>
                                        Veuillez corriger les erreurs dans le formulaire avant de continuer.
                                    </AlertDescription>
                                </Alert>
                            </div>
                        )} */}
                </form>
            </div>
        </Form>
    );
}
