import api from './api';

export async function fetchMetrics() {
  const response = await api.get('/api/v1/dashboard/metrics');
  return response.data;
  
}

export async function fetchMetricsPDF() {
  const response = await api.get('/api/v1/dashboard/metrics/pdf', {
    responseType: 'blob'
  });
  return response.data; // retorna o blob
}

export async function fetchUserCount() {
  const response = await api.get('/api/v1/dashboard/users');
  // Supondo que a resposta seja um array de usuários
  return Array.isArray(response.data) ? response.data.length : 0;
}