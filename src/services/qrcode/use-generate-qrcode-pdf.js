'use client'

import { generateQRCodePDF } from '@/utils/api-requests'
import { useMutation } from '@tanstack/react-query'

export const useGenerateQRCodePDF = ({ onSuccess, onError } = {}) => {
    return useMutation({
        mutationFn: async salonId => {
            const blob = await generateQRCodePDF(salonId)

            // Créer un lien de téléchargement
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `qrcode-salon-affiche.pdf`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)

            return blob
        },
        onSuccess: (...args) => {
            if (onSuccess) {
                onSuccess(...args)
            }
        },
        onError: (...args) => {
            if (onError) {
                onError(...args)
            }
        },
    })
}
