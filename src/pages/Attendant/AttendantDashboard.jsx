import { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import DashBoardSideBar from '../../components/DashBoardSidebar/DashBoardSideBar'
import PackageContent from '../../components/DashBoardContent/PackageContent'
import BookingsContent from '../../components/DashBoardContent/BookingsContent'
import RatingsContent from '../../components/DashBoardContent/RatingsContent'
import DashBoardNavBar from '../../components/DashBoardNavBar/DashBoardNavBar'

/**
 * Dashboard do Atendente
 * Área para usuários com role "Atendente" - funcionalidades limitadas
 */
const AttendantDashboard = () => {
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
          // Garante que cada pacote tenha o campo packageMedia (array de objetos {id, path})
          const packagesWithMedia = await Promise.all(
            data.map(async (pkg) => {
              try {
                const mediaRes = await fetch(`/api/v1/dashboard/packages/${pkg.id}/media`);
                if (mediaRes.ok) {
                  const mediaArr = await mediaRes.json();
                  // Normaliza para array de objetos { id, path }
                  let normalizedMedia = [];
                  if (Array.isArray(mediaArr) && mediaArr.length > 0) {
                    normalizedMedia = mediaArr.map(m => {
                      // Se já vier {id, path}, mantém; senão tenta montar
                      if (m && typeof m === 'object' && m.id && (m.path || m.url || m.name)) {
                        return {
                          id: m.id,
                          path: m.path || m.url || (m.name ? `/uploads/${pkg.id}/${m.name}` : null)
                        };
                      } else if (typeof m === 'string') {
                        // Caso seja só o caminho
                        return { id: null, path: m };
                      }
                      return null;
                    }).filter(Boolean);
                  }
                  return { ...pkg, packageMedia: normalizedMedia };
                }
              } catch (err) {}
              return { ...pkg, packageMedia: [] };
            })
          );
          setAllPackages(packagesWithMedia);
          setPackages(packagesWithMedia);
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
  const handlePackageUpdate = (updatedPackage, allPackages) => {
    if (!updatedPackage && Array.isArray(allPackages)) {
      setPackages(allPackages);
      setAllPackages(allPackages);
      return;
    }
    if (!updatedPackage || !updatedPackage.id) return;
    setPackages((prev) => prev.map(pkg => (pkg && (pkg.id === updatedPackage.id || pkg.packageId === updatedPackage.id)) ? { ...pkg, ...updatedPackage } : pkg));
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
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <DashBoardSideBar onMenuSelect={setSelectedMenu} selectedMenu={selectedMenu} onLogout={handleLogout} />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-0">
        {/* Navbar */}
        <div className="mt-16 md:mt-0">
          <DashBoardNavBar onSearch={handleSearch} onLogout={handleLogout} />
        </div>
        
        {/* Content area */}
        <div className="flex-1 flex justify-center items-center px-2 md:px-4 py-2 md:py-4 w-full overflow-auto">
          {selectedMenu === 'Pacotes' ? (
            <PackageContent title={selectedMenu} packages={packages} onPackageUpdate={handlePackageUpdate} />
          ) : selectedMenu === 'Reservas' ? (
            <BookingsContent packages={packages} />
          ) : selectedMenu === 'Avaliações' ? (
            <RatingsContent />
          ) : (
            <div>Selecione uma opção do menu</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AttendantDashboard
