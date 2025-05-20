import axios from '@/lib/axios'

/**
 * Récupère toutes les prestations
 */
export async function getAllServices() {
    const response = await axios.get('/api/services')
    return response.data
}

/**
 * Crée une nouvelle prestation
 * @param {Object} data - Données de la prestation
 * @param {string} data.name - Nom de la prestation
 * @param {number} data.price - Prix TTC
 * @param {number} [data.duration] - Durée en minutes (optionnel)
 */
export async function createService(data) {
    const response = await axios.post('/api/services', data)
    return response.data
}

/**
 * Met à jour une prestation existante
 * @param {Object} data - Données de la prestation
 * @param {string} data.id - ID de la prestation
 * @param {string} data.name - Nom de la prestation
 * @param {number} data.price - Prix TTC
 * @param {number} [data.duration] - Durée en minutes (optionnel)
 */
export async function updateService(data) {
    const { id, ...serviceData } = data
    const response = await axios.put(`/api/services/${id}`, serviceData)
    return response.data
}

/**
 * Supprime une prestation
 * @param {string} id - ID de la prestation à supprimer
 */
export async function deleteService(id) {
    const response = await axios.delete(`/api/services/${id}`)
    return response.data
}
