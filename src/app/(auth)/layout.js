import { Suspense } from 'react'

export const metadata = {
    title: "Coiffpro - Liste d'attente salon de coiffure",
}

const Layout = ({ children }) => {
    return (
        <div>
            <div className="text-gray-900 antialiased">
                <Suspense fallback={<div>Chargement...</div>}>
                    {children}
                </Suspense>
            </div>
        </div>
    )
}

export default Layout
