/**
 * Données mockées pour la file d'attente
 * @type {Array<QueueClient>}
 */
export const mockQueueData = [
    {
        id: 'issa',
        firstName: 'Issa',
        lastName: 'Drici',
        phoneNumber: '0612345678',
        services: ['Coupe homme', 'Barbe'],
        registrationTime: '2024-03-20T10:00:00',
        position: 1,
        estimatedTime: '2025-05-23T23:57:00.000Z',
        status: 'waiting',
        estimatedDuration: 30,
        amountToPay: 32,
    },
    {
        id: 1,
        firstName: 'Jean',
        phoneNumber: '0612345678',
        services: ['Coupe homme', 'Barbe'],
        registrationTime: '2024-03-20T10:00:00',
        position: 2,
        estimatedTime: '2024-03-20T11:00:00',
        status: 'waiting',
        estimatedDuration: 30,
    },
    {
        id: 2,
        firstName: 'Marie',
        phoneNumber: '0698765432',
        services: ['Coupe femme', 'Brushing'],
        registrationTime: '2024-03-20T10:05:00',
        position: 3,
        estimatedTime: '2024-03-20T11:30:00',
        status: 'waiting',
        estimatedDuration: 45,
    },
    {
        id: 3,
        firstName: 'Pierre',
        phoneNumber: '0611223344',
        services: ['Coupe homme'],
        registrationTime: '2024-03-20T10:10:00',
        position: 4,
        estimatedTime: '2024-03-20T12:00:00',
        status: 'in_progress',
        estimatedDuration: 20,
    },
    {
        id: 4,
        firstName: 'Sophie',
        phoneNumber: '0677889900',
        services: ['Coupe femme', 'Coloration'],
        registrationTime: '2024-03-20T10:15:00',
        position: 5,
        estimatedTime: '2024-03-20T12:30:00',
        status: 'completed',
        estimatedDuration: 60,
    },
    {
        id: 5,
        firstName: 'Thomas',
        phoneNumber: '0644556677',
        services: ['Coupe homme', 'Barbe', 'Mèches'],
        registrationTime: '2024-03-20T10:20:00',
        position: 6,
        estimatedTime: '2024-03-20T13:00:00',
        status: 'waiting',
        estimatedDuration: 75,
    },
]

/**
 * Données mockées pour un client spécifique
 * @param {string} clientId - ID du client
 * @returns {QueueClient | null}
 */
export const mockClientData = clientId => {
    const client = mockQueueData.find(c => {
        return String(c.id) === String(clientId)
    })

    if (!client) return null

    // Ajouter des informations supplémentaires spécifiques au client
    return {
        ...client,
        // Informations supplémentaires qui pourraient être spécifiques à la vue client
        salonName: 'Salon GK Coiffure',
        salonAddress: '123 rue de la Coiffure, 75001 Paris',
        salonPhone: '01 23 45 67 89',
        estimatedWaitTime: Math.floor(Math.random() * 30) + 15, // Temps d'attente aléatoire entre 15 et 45 minutes
        nextClientPosition: client.position + 1,
        totalClientsInQueue: mockQueueData.filter(c => c.status === 'waiting')
            .length,
    }
}

/**
 * Simule un délai réseau
 * @param {number} ms - Délai en millisecondes
 * @returns {Promise<void>}
 */
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Simule une réponse API avec des données mockées
 * @param {any} data - Données à retourner
 * @param {number} [delayMs=1000] - Délai de réponse en millisecondes
 * @returns {Promise<{data: any}>}
 */
export const mockResponse = async (data, delayMs = 1000) => {
    await delay(delayMs)
    return { data }
}

/**
 * Simule une mutation avec succès
 * @param {any} data - Données à retourner
 * @param {number} [delayMs=500] - Délai de réponse en millisecondes
 * @returns {Promise<{data: any}>}
 */
export const mockMutation = async (data, delayMs = 500) => {
    await delay(delayMs)
    return { data }
}
