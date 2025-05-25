'use client'

import { cn } from '@/lib/utils'
import { Input } from '@/ui-components/input'
import { Label } from '@/ui-components/label'

import { useAuth } from '@/hooks/auth'
import { Button } from '@/ui-components/button'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

export function RegisterForm({ className, ...props }) {
    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/admin/dashboard',
    })

    const searchParams = useSearchParams()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [salonName, setSalonName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    /* eslint-disable-next-line */
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const submitForm = async event => {
        event.preventDefault()
        setIsLoading(true)
        try {
            await register({
                first_name: firstName,
                last_name: lastName,
                salon_name: salonName,
                email,
                password,
                password_confirmation: passwordConfirmation,
                user_plan: searchParams.get('user_plan') ?? 'basic',
                setErrors,
            })
        } catch (error) {
            if (error?.response?.data?.errors) {
                setErrors(error.response.data.errors)
            } else if (error?.response?.data?.message) {
                setErrors({ general: error.response.data.message })
            } else if (error instanceof Error) {
                setErrors({ general: error.message })
            } else {
                setErrors({ general: "Une erreur inattendue s'est produite" })
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form
            className={cn('flex flex-col gap-6', className)}
            onSubmit={submitForm}
            {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Créer un compte</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Entrez vos informations ci-dessous pour créer un compte
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input
                            id="firstName"
                            type="text"
                            value={firstName}
                            className="block mt-1 w-full"
                            onChange={event => setFirstName(event.target.value)}
                            required
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="lastName">Nom</Label>
                        <Input
                            id="lastName"
                            type="text"
                            value={lastName}
                            className="block mt-1 w-full"
                            onChange={event => setLastName(event.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="salonName">Nom du salon</Label>
                    <Input
                        id="salonName"
                        type="text"
                        value={salonName}
                        className="block mt-1 w-full"
                        onChange={event => setSalonName(event.target.value)}
                        required
                        placeholder="Ex: Salon de coiffure Marie"
                    />
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        className="block mt-1 w-full"
                        onChange={event => setEmail(event.target.value)}
                        required
                        placeholder="m@example.com"
                    />
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        className="block mt-1 w-full"
                        onChange={event => setPassword(event.target.value)}
                        required
                        autoComplete="new-password"
                    />
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="passwordConfirmation">
                        Confirmer le mot de passe
                    </Label>
                    <Input
                        id="passwordConfirmation"
                        type="password"
                        value={passwordConfirmation}
                        className="block mt-1 w-full"
                        onChange={event =>
                            setPasswordConfirmation(event.target.value)
                        }
                        required
                    />
                </div>

                <Button type="submit" className="w-full" isLoading={isLoading}>
                    Créer un compte
                </Button>
                {/* <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="bg-background text-muted-foreground relative z-10 px-2">
                        Or continue with
                    </span>
                </div>
                <Button variant="outline" className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                            fill="currentColor"
                        />
                    </svg>
                    Login with GitHub
                </Button> */}
            </div>
            <div className="text-center text-sm">
                Vous avez déjà un compte ?{' '}
                <a href="/login" className="underline underline-offset-4">
                    Se connecter
                </a>
            </div>
        </form>
    )
}
