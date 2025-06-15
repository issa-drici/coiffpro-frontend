import axios from '@/lib/axios'

/**
 * Récupère la liste des clients en file d'attente
 * @returns {Promise<{data: Array<QueueClient>}>}
 */
export async function getQueue(salonId) {
    const response = await axios.get(`/api/queue/${salonId}`)
    return response.data
}

/**
 * Récupère la liste des clients en file d'attente
 * @returns {Promise<{data: Array<QueueClient>}>}
 */
export async function getWaitingQueueBySalonId(salonId) {
    const response = await axios.get(`/api/queue/waiting/${salonId}`)
    return response.data
}

/**
 * Récupère le client en cours de service
 * @returns {Promise<{data: QueueClient}>}
 */
export async function getCurrentQueueClientBySalonId(salonId) {
    const response = await axios.get(`/api/queue/current/${salonId}`)
    return response.data
}

/**
 * Récupère la liste des clients terminés
 * @returns {Promise<{data: Array<QueueClient>}>}
 */
export async function getEndedQueueBySalonId(salonId) {
    const response = await axios.get(`/api/queue/ended/${salonId}`)
    return response.data
}

/**
 * Récupère la liste des clients absents
 * @returns {Promise<{data: Array<QueueClient>}>}
 */
export async function getAbsentQueueBySalonId(salonId) {
    const response = await axios.get(`/api/queue/absent/${salonId}`)
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
export async function getSalonInfo(salonId) {
    const response = await axios.get(`/api/salon/${salonId}`)
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
        params: { startDate, endDate },
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
 * Crée un nouveau client dans la file d'attente d'un salon
 * @param {string} salonId - ID du salon
 * @param {Object} clientData - Données du client
 * @returns {Promise<{data: QueueClient}>}
 */
export async function createQueueClient(data) {
    const { salonId, ...clientData } = data
    const response = await axios.post(
        `/api/salons/${salonId}/queue`,
        clientData,
    )
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

/**
 * Récupère les prestations d'un salon spécifique
 * @param {string} salonId - ID du salon
 * @returns {Promise<{data: Array<Service>}>}
 */
export async function getSalonServices(salonId) {
    const response = await axios.get(`/api/salons/${salonId}/services`)
    return response.data
}

/**
 * Récupère le temps estimé avant que tous les clients actuels soient servis
 * @param {string} salonId - ID du salon
 * @returns {Promise<{data: {estimatedTime: string}}>}
 */
export async function getEstimatedTime(salonId) {
    const response = await axios.get(`/api/salons/${salonId}/estimated-time`)
    return response.data
}

/**
 * Récupère les infos d'un client de la file d'attente
 * @param {string} queueClientId - ID du client
 * @returns {Promise<{data: QueueClient}>}
 */
export async function getQueueClient(queueClientId) {
    const response = await axios.get(`/api/queue-client/${queueClientId}`)
    return response.data
}

/**
 * Déplace le client suivant dans la file d'attente
 * @param {string} salonId - ID du salon
 * @returns {Promise<{data: QueueClient}>}
 */
export async function moveToNextQueueClientBySalonId(salonId) {
    const response = await axios.post(`/api/queue/next/${salonId}`)
    return response.data
}

/**
 * Toggle le statut d'un barbier
 * @param {string} barberId - ID du barbier
 * @returns {Promise<{data: Barber}>}
 */
export async function toggleBarberStatus(barberId) {
    const response = await axios.patch(`/api/barbers/${barberId}/toggle-status`)
    return response.data
}

/**
 * Génère et télécharge le QR code PDF pour le salon
 * @param {string} salonId - ID du salon
 * @returns {Promise<Blob>}
 */
export async function generateQRCodePDF(salonId) {
    const response = await axios.post(
        `/api/generate-qrcode-pdf`,
        { salonId },
        {
            responseType: 'blob', // Important pour recevoir le fichier PDF
        },
    )
    return response.data // Retourner juste le blob
}
