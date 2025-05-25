'use client'

import { cn } from '@/lib/utils'
import { Input } from '@/ui-components/input'
import { Label } from '@/ui-components/label'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/ui-components/button'

export function LoginForm({ className, ...props }) {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/admin/dashboard',
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (router.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.reset))
        } else {
            setStatus(null)
        }
    })

    const submitForm = async event => {
        event.preventDefault()

        setIsLoading(true)
        try {
            await login({
                email,
                password,
                remember: shouldRemember,
                setErrors,
                setStatus,
                status,
            })
        } catch (error) {
            if (error?.response?.data?.errors) {
                // Erreur Axios avec des erreurs de validation
                setErrors(error.response.data.errors)
            } else if (error?.response?.data?.message) {
                // Erreur Axios avec un message d'erreur
                setErrors({ general: error.response.data.message })
            } else if (error instanceof Error) {
                // Erreur JavaScript standard
                setErrors({ general: error.message })
            } else {
                // Erreur inconnue
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
                <h1 className="text-2xl font-bold">Connexion à votre compte</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Entrez votre email ci-dessous pour vous connecter à votre
                    compte
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        onChange={event => setEmail(event.target.value)}
                        value={email}
                        required
                    />
                </div>
                <div className="grid gap-3">
                    <div className="flex items-center">
                        <Label htmlFor="password">Mot de passe</Label>
                        <a
                            href="#"
                            className="ml-auto text-sm underline-offset-4 hover:underline">
                            Mot de passe oublié ?
                        </a>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        onChange={event => setPassword(event.target.value)}
                        value={password}
                        required
                    />
                </div>
                <div className="block mt-4">
                    <label
                        htmlFor="remember_me"
                        className="inline-flex items-center">
                        <input
                            id="remember_me"
                            type="checkbox"
                            name="remember"
                            className="rounded border-gray-300 text-indigo-600 shadow-xs focus:border-indigo-300 focus:ring-3 focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={event =>
                                setShouldRemember(event.target.checked)
                            }
                        />

                        <span className="ml-2 text-sm text-gray-600">
                            Se souvenir de moi
                        </span>
                    </label>
                </div>
                <Button type="submit" className="w-full" isLoading={isLoading}>
                    Se connecter
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
                Vous n&apos;avez pas de compte ?{' '}
                <a href="/register" className="underline underline-offset-4">
                    Créer un compte
                </a>
            </div>
        </form>
    )
}
