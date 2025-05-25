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

/**
 * Récupère les informations du salon
 * @returns {Promise<{data: SalonInfo}>}
 */
export async function getSalonInfo() {
    const response = await axios.get('/api/salon/info')
    return response.data
}

/**
 * Récupère les informations de l'utilisateur connecté
 * @returns {Promise<{data: UserInfo}>}
 */
export async function getUserInfo() {
    const response = await axios.get('/api/user/info')
    return response.data
}

/**
 * Récupère les éléments de navigation disponibles pour l'utilisateur
 * @returns {Promise<{data: Array<NavItem>}>}
 */
export async function getNavigationItems() {
    const response = await axios.get('/api/user/navigation')
    return response.data
}

/**
 * Récupère les FAQ
 * @returns {Promise<{data: Array<FAQItem>}>}
 */
export async function getFAQ() {
    const response = await axios.get('/api/faq')
    return response.data
}

/**
 * Récupère les statistiques de visiteurs
 * @param {Object} params - Paramètres de la requête
 * @param {string} params.startDate - Date de début (YYYY-MM-DD)
 * @param {string} params.endDate - Date de fin (YYYY-MM-DD)
 * @returns {Promise<{data: Array<VisitorStats>}>}
 */
export async function getVisitorStats({ startDate, endDate }) {
    const response = await axios.get('/api/stats/visitors', {
        params: { startDate, endDate }
    })
    return response.data
}

/**
 * Récupère toutes les prestations
 * @returns {Promise<{data: Array<Service>}>}
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
 * @returns {Promise<{data: Service}>}
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
 * @returns {Promise<{data: Service}>}
 */
export async function updateService(data) {
    const { id, ...serviceData } = data
    const response = await axios.put(`/api/services/${id}`, serviceData)
    return response.data
}

/**
 * Supprime une prestation
 * @param {string} id - ID de la prestation à supprimer
 * @returns {Promise<{data: null}>}
 */
export async function deleteService(id) {
    const response = await axios.delete(`/api/services/${id}`)
    return response.data
}

/**
 * Crée un nouveau client dans la file d'attente
 * @param {Object} clientData - Données du client
 * @param {string} clientData.firstName - Prénom du client
 * @param {string} [clientData.lastName] - Nom du client (optionnel)
 * @param {string} clientData.phoneNumber - Numéro de téléphone
 * @param {Array<string>} clientData.services - Liste des services demandés
 * @returns {Promise<{data: QueueClient}>}
 */
export async function createQueueClient(clientData) {
    const response = await axios.post('/api/queue', clientData)
    return response.data
}

/**
 * Met à jour un client dans la file d'attente
 * @param {Object} data - Données du client
 * @param {string} data.id - ID du client
 * @param {string} [data.firstName] - Prénom du client
 * @param {string} [data.lastName] - Nom du client
 * @param {string} [data.phoneNumber] - Numéro de téléphone
 * @param {Array<string>} [data.services] - Liste des services demandés
 * @returns {Promise<{data: QueueClient}>}
 */
export async function updateQueueClient(data) {
    const { id, ...clientData } = data
    const response = await axios.put(`/api/queue/${id}`, clientData)
    return response.data
}

/**
 * Supprime un client de la file d'attente
 * @param {string} clientId - ID du client à supprimer
 * @returns {Promise<{data: null}>}
 */
export async function deleteQueueClient(clientId) {
    const response = await axios.delete(`/api/queue/${clientId}`)
    return response.data
}
