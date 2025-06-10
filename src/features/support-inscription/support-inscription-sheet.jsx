'use client'

import { useAuth } from '@/hooks/auth'
import { Button } from '@/ui-components/button'
import Link from 'next/link'

export function SupportInscriptionSheet() {
    const { user } = useAuth()

    if (!user) {
        return null
    }

    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
                    <Link
                        href={`/salon/${user?.salon?.id}/queue`}
                        target="_blank">
                        <Button>Ouvrir la page d&apos;inscription</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
