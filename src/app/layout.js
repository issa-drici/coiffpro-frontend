import { Poppins } from 'next/font/google'
import '@/app/global.css'
import ReactQueryProvider from '@/providers/ReactQueryProvider'

const poppinsFont = Poppins({
    subsets: ['latin'],
    display: 'swap',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

const RootLayout = ({ children }) => {
    return (
        <html lang="fr" className={poppinsFont.className}>
            <body className="antialiased">
                <ReactQueryProvider>{children}</ReactQueryProvider>
            </body>
        </html>
    )
}

export const metadata = {
    title: "Coiffpro - Liste d'attente salon de coiffure",
}

export default RootLayout
