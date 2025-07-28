// Importa hooks React para estado e efeitos colaterais

import LogoutButton from '../../components/LogoutButton';

/**
 * Dashboard do Administrador
 * Área exclusiva para usuários com role "Admin"
 * Protegida pelo ProtectedRoute no sistema de rotas
 */

const AdminDashboard = () => {
    return <>
        <LogoutButton />
        {/* Conteúdo temporário - placeholder para desenvolvimento futuro */}
        <p>Page adm</p>
    </>
}

// Exporta o componente como padrão
export default AdminDashboard
