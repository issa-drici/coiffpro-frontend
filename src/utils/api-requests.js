import axios from '@/lib/axios'

/**
 * Récupère la liste des clients en file d'attente
 * @returns {Promise<{data: Array<QueueClient>}>}
 */
export async function getQueue() {
    const response = await axios.get('/api/queue')
    return response.data
}

/**
 * Prend un client en charge
 * @param {string} clientId - ID du client
 * @returns {Promise<{data: QueueClient}>}
 */
export async function takeClient(clientId) {
    const response = await axios.post(`/api/queue/${clientId}/take`)
    return response.data
}

/**
 * Marque un client comme absent
 * @param {string} clientId - ID du client
 * @returns {Promise<{data: QueueClient}>}
 */
export async function markClientAbsent(clientId) {
    const response = await axios.post(`/api/queue/${clientId}/absent`)
    return response.data
}
