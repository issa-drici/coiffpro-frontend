'use client'

import { useState, useEffect } from 'react'

export function useMediaQuery(query) {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const media = window.matchMedia(query)

        // Mettre à jour l'état initial
        setMatches(media.matches)

        // Créer le listener
        const listener = (event) => {
            setMatches(event.matches)
        }

        // Ajouter le listener
        media.addEventListener('change', listener)

        // Nettoyer
        return () => {
            media.removeEventListener('change', listener)
        }
  }, [query])

    return matches
}
