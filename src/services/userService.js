// Serviço para buscar informações do perfil do usuário autenticado
// Vantagens: sempre busca dados atualizados, evita inconsistência do localStorage, permite atualização dinâmica do nome e outros dados

import authService from './authService'

/**
 * Obtém o perfil do usuário autenticado da API
 * @returns {Promise<object>} Dados do usuário (ex: nome, email, etc)
 */

export async function getUserProfile() {
  // Obtém o token JWT salvo pelo authService
  const token = authService.getToken()
  if (!token) throw new Error('Usuário não autenticado')

  // Faz a requisição autenticada para o endpoint de perfil
  const response = await fetch('https://localhost:8080/api/v1/user/profile', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': '*/*',
    },
  })

  // Se não autorizado, lança erro
  if (!response.ok) {
    throw new Error('Não foi possível obter o perfil do usuário')
  }

  // Retorna o JSON com os dados do usuário
  return await response.json()
}
