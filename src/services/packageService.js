// Serviço para buscar informações de pacotes de viagem

import authService from './authService'

/**
 * Obtém as informações detalhadas de um pacote específico
 * @param {number} packageId - ID do pacote
 * @returns {Promise<object>} Dados detalhados do pacote
 */
export async function getPackageById(packageId) {
  // Obtém o token JWT salvo pelo authService
  const token = authService.getToken()
  if (!token) throw new Error('Usuário não autenticado')

  // Faz a requisição autenticada para o endpoint do pacote
  const response = await fetch(`https://localhost:8080/api/v1/packages/${packageId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': '*/*',
    },
  })

  // Se não autorizado ou não encontrado, lança erro
  if (!response.ok) {
    throw new Error(`Não foi possível obter as informações do pacote ${packageId}`)
  }

  // Retorna o JSON com os dados do pacote
  return await response.json()
}

/**
 * Obtém a primeira imagem de um pacote específico
 * @param {number} packageId - ID do pacote
 * @returns {Promise<string|null>} URL da primeira imagem do pacote ou null se não houver
 */
export async function getPackageImage(packageId) {
  try {
    const packageData = await getPackageById(packageId)
    
    // Verifica se há mídias disponíveis e retorna a primeira
    if (packageData.packageMedia && packageData.packageMedia.length > 0) {
      return `https://localhost:8080/${packageData.packageMedia[0].mediaUrl}`
    }
    
    return null
  } catch (error) {
    console.error(`Erro ao buscar imagem do pacote ${packageId}:`, error)
    return null
  }
}

/**
 * Obtém o rating médio de um pacote específico
 * @param {number} packageId - ID do pacote
 * @returns {Promise<number>} Rating médio do pacote (0-5) ou 0 se não houver avaliações
 */
export async function getPackageRating(packageId) {
  try {
    const packageData = await getPackageById(packageId)
    
    // Verifica se há avaliações disponíveis no array ratings
    if (packageData.ratings && packageData.ratings.length > 0) {
      const totalRating = packageData.ratings.reduce((sum, ratingItem) => sum + ratingItem.rating, 0)
      return Math.round((totalRating / packageData.ratings.length) * 10) / 10 // Arredonda para 1 casa decimal
    }
    
    return 0
  } catch (error) {
    console.error(`Erro ao buscar avaliação do pacote ${packageId}:`, error)
    return 0
  }
}

/**
 * Obtém tanto a imagem quanto o rating médio e datas de um pacote em uma única chamada
 * @param {number} packageId - ID do pacote
 * @returns {Promise<{image: string|null, rating: number, departureDate: string|null, returnDate: string|null}>} Objeto com imagem, rating médio e datas
 */
export async function getPackageImageAndRating(packageId) {
  try {
    const packageData = await getPackageById(packageId)
    
    // Obtém a primeira imagem
    let image = null
    if (packageData.packageMedia && packageData.packageMedia.length > 0) {
      image = `https://localhost:8080/${packageData.packageMedia[0].mediaUrl}`
    }
    
    // Calcula o rating médio das avaliações
    let rating = 0
    if (packageData.ratings && packageData.ratings.length > 0) {
      const totalRating = packageData.ratings.reduce((sum, ratingItem) => sum + ratingItem.rating, 0)
      rating = Math.round((totalRating / packageData.ratings.length) * 10) / 10 // Arredonda para 1 casa decimal
    }
    
    // Obtém as datas de partida e retorno
    const departureDate = packageData.departureDate || null
    const returnDate = packageData.returnDate || null
    
    return { image, rating, departureDate, returnDate }
  } catch (error) {
    console.error(`Erro ao buscar dados do pacote ${packageId}:`, error)
    return { image: null, rating: 0, departureDate: null, returnDate: null }
  }
}
