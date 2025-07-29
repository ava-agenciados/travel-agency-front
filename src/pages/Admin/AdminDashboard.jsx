import { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import DashBoardSideBar from '../../components/DashBoardSidebar/DashBoardSideBar'
import PackageContent from '../../components/DashBoardContent/PackageContent'
import BookingsContent from '../../components/DashBoardContent/BookingsContent'
import DashBoardNavBar from '../../components/DashBoardNavBar/DashBoardNavBar'
import UserContent from '../../components/DashBoardContent/UsersContent'

/**
 * Dashboard do Administrador
 * Área exclusiva para usuários com role "Admin"
 */
const AdminDashboard = () => {

    const [allPackages, setAllPackages] = useState([])
    const [packages, setPackages] = useState([])
    const [selectedMenu, setSelectedMenu] = useState('Pacotes')

    useEffect(() => {
      if (selectedMenu === 'Pacotes') {
        const fetchPackages = async () => {
          try {
            const response = await fetch('/api/v1/dashboard/packages/all');
            if (!response.ok) {
              throw new Error('Erro ao buscar pacotes');
            }
            const data = await response.json();
            setAllPackages(data);
            setPackages(data);
          } catch (error) {
            console.error('Erro:', error);
            setAllPackages([]);
            setPackages([]);
          }
        };
        fetchPackages();
      }
    }, [selectedMenu]);

    // Atualiza pacote na lista após edição
    const handlePackageUpdate = (updatedPackage) => {
      setPackages((prev) => prev.map(pkg => (pkg.id === updatedPackage.id || pkg.packageId === updatedPackage.id) ? { ...pkg, ...updatedPackage } : pkg));
    };

    // Handler de busca (filtro local, pode ser adaptado para busca na API)
    const handleSearch = (filters) => {
      // Se todos os filtros estiverem vazios, retorna todos os pacotes
      const isEmpty = !filters.status && !filters.origin && !filters.destination && !filters.price && !filters.search;
      if (isEmpty) {
        setPackages(allPackages);
        return;
      }
      setPackages(allPackages.filter(pkg => {
        const matchStatus = !filters.status || (filters.status === 'ativo' ? pkg.isAvailable : !pkg.isAvailable);
        const matchOrigin = !filters.origin || (pkg.origin || '').toLowerCase().includes(filters.origin.toLowerCase());
        const matchDestination = !filters.destination || (pkg.destination || '').toLowerCase().includes(filters.destination.toLowerCase());
        const matchPrice = !filters.price || (pkg.price || 0) <= Number(filters.price);
        const matchSearch = !filters.search || (pkg.name || '').toLowerCase().includes(filters.search.toLowerCase()) || (pkg.description || '').toLowerCase().includes(filters.search.toLowerCase());
        return matchStatus && matchOrigin && matchDestination && matchPrice && matchSearch;
      }));
    };

    // Handler de logout
    const { logout } = useAuth();
    const handleLogout = () => {
      logout();
      window.location.href = '/login';
    };

    return (
      <div className="flex flex-col md:flex-row h-screen w-full overflow-x-hidden">
        <div className="w-full md:w-80 flex-shrink-0">
          <DashBoardSideBar onMenuSelect={setSelectedMenu} selectedMenu={selectedMenu} />
        </div>
        <div className="flex-1 flex flex-col min-h-0">
          <DashBoardNavBar onSearch={handleSearch} onLogout={handleLogout} />
          <div className="flex-1 flex justify-center items-center px-2 md:px-0 py-2 md:py-0 w-full overflow-auto">
            {selectedMenu === 'Pacotes' ? (
              <PackageContent title={selectedMenu} packages={packages} onPackageUpdate={handlePackageUpdate} />
            ) : selectedMenu === 'Reservas' ? (
              <BookingsContent packages={packages} />
            ) : selectedMenu === 'Usuarios' ? (
              <UserContent packages={packages} />
            ) : selectedMenu === 'Avaliações' ? (
              <PackageContent title={selectedMenu} packages={packages} />
            ) : (
              <div>Selecione uma opção do menu</div>
            )}
          </div>
        </div>
      </div>
    )
}

export default AdminDashboard
