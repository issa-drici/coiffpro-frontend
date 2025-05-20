import { IconRazorElectric } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'

const Navbar = () => {
    const { user } = useAuth()

    return (
        <nav className="w-full bg-white py-4 px-0 md:px-0 sticky top-0 z-30">
            <div className="max-w-5xl mx-auto w-full flex items-center justify-between px-4 md:px-8">
                {/* Logo à gauche */}
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <IconRazorElectric className="!size-5" />
                        </div>
                        CoiffPro
                    </a>
                </div>
                {/* Menu centré */}
                <ul className="hidden md:flex gap-8 text-gray-800 font-medium mx-auto">
                    <li>
                        <a
                            href="#features"
                            className="hover:text-black cursor-pointer transition-colors duration-150">
                            Avantages
                        </a>
                    </li>
                    <li>
                        <a
                            href="#how-it-works"
                            className="hover:text-black cursor-pointer transition-colors duration-150">
                            Comment ça marche
                        </a>
                    </li>
                    <li>
                        <a
                            href="#reviews"
                            className="hover:text-black cursor-pointer transition-colors duration-150">
                            Avis clients
                        </a>
                    </li>
                    <li>
                        <a
                            href="#faq"
                            className="hover:text-black cursor-pointer transition-colors duration-150">
                            FAQ
                        </a>
                    </li>
                </ul>
                {/* Boutons de connexion/inscription */}
                <div className="flex items-center gap-3">
                    {user ? (
                        <Link href="/admin/dashboard">
                            <Button>Mon salon</Button>
                        </Link>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button variant="ghost">Connexion</Button>
                            </Link>
                            <Link href="/register">
                                <Button>Inscription</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
