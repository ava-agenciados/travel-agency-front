// Importa hooks React para estado e efeitos colaterais
import { useState, useEffect } from 'react'
// Importa hook customizado para acessar contexto de autenticação
import { useAuth } from '../../hooks/useAuth'

/**
 * Dashboard do Administrador
 * Área exclusiva para usuários com role "Admin"
 * Protegida pelo ProtectedRoute no sistema de rotas
 */
const AdminDashboard = () => {
    return <>
        {/* Conteúdo temporário - placeholder para desenvolvimento futuro */}
        <p>Page adm</p>
    </>
}

// Exporta o componente como padrão
export default AdminDashboard
