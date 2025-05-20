import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

/**
 * Formate un prix en euros
 * @param {number} price - Le prix à formater
 * @returns {string} Le prix formaté (ex: "20,00 €")
 */
export function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(price)
}
