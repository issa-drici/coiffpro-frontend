/**
 * Données mockées pour les services
 * @type {Array<Service>}
 */
export const mockServices = [
    {
        id: '1',
        name: 'Coupe Homme',
        price: 25,
        duration: 30,
        description: 'Coupe de cheveux pour homme',
        category: 'coupe',
    },
    {
        id: '2',
        name: 'Coupe Femme',
        price: 35,
        duration: 45,
        description: 'Coupe de cheveux pour femme',
        category: 'coupe',
    },
    {
        id: '3',
        name: 'Barbe',
        price: 15,
        duration: 20,
        description: 'Taille et entretien de la barbe',
        category: 'barbe',
    },
    {
        id: '4',
        name: 'Coloration',
        price: 45,
        duration: 60,
        description: 'Coloration complète',
        category: 'coloration',
    },
    {
        id: '5',
        name: 'Brushing',
        price: 30,
        duration: 30,
        description: 'Brushing professionnel',
        category: 'coiffure',
    },
    {
        id: '6',
        name: 'Mèches',
        price: 55,
        duration: 90,
        description: 'Pose de mèches',
        category: 'coloration',
    },
]

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

export const mockServiceConfig = {
    'Coupe homme': { duration: 20, price: 20 },
    'Coupe femme': { duration: 30, price: 30 },
    Barbe: { duration: 15, price: 10 },
    Brushing: { duration: 25, price: 18 },
    Coloration: { duration: 45, price: 40 },
    Mèches: { duration: 60, price: 50 },
    'Shampoing + Brushing': { duration: 35, price: 25 },
    'Coupe + Brushing': { duration: 45, price: 45 },
    'Coupe + Coloration': { duration: 75, price: 65 },
    'Mèches + Brushing': { duration: 85, price: 65 },
}
