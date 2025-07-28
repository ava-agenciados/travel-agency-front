// Importa hooks React para estado e efeitos colaterais
import { useState, useEffect } from 'react'

import LogoutButton from '../../components/LogoutButton';

/**
 * Dashboard do Atendente
 * Área exclusiva para usuários com role "Atendente"
 * Protegida pelo ProtectedRoute no sistema de rotas
 */
const AttendantDashboard = () => {
  return (
    <div>
      <LogoutButton />
      {/* Título da página do dashboard do atendente */}
      <h1>Dashboard do Atendente</h1>
      {/* Área para desenvolvimento futuro de funcionalidades específicas do atendente */}
    </div>
  )
}

// Exporta o componente como padrão
export default AttendantDashboard
