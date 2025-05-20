/**
 * Formate un prix en euros
 * @param {number} price - Le prix à formater
 * @returns {string} Le prix formaté (ex: "25,00 €")
 */
export function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
    }).format(price)
}
