
import { useState } from "react";
import authService from "../../services/authService";

const AdminSideBar = ({ onMenuSelect, selectedMenu, onLogout }) => {
  const user = authService.getUserInfo();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuSelect = (menu) => {
    onMenuSelect(menu);
    setIsMobileMenuOpen(false); // Fecha o menu mobile após seleção
  };

  const handleLogout = () => {
    setIsMobileMenuOpen(false); // Fecha o menu mobile
    if (onLogout) onLogout();
  };

  return (
    <>
      {/* Header com hamburger menu para mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-md z-50 px-4 py-3 flex justify-between items-center">
        <h2 className="text-xl font-bold" style={{ color: '#2563eb' }}>New Horizon</h2>
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg
            className="h-6 w-6"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Overlay para mobile */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static top-0 left-0 h-full w-80 bg-white shadow-md z-50 transform transition-transform duration-300 ease-in-out
        md:transform-none md:w-80
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 flex flex-col h-full">
          {/* Header do sidebar - visível apenas no desktop */}
          <div className="hidden md:block mb-6">
            <h2 className="text-3xl font-bold text-center" style={{ color: '#2563eb' }}>New Horizon</h2>
          </div>

          {/* Navegação */}
          <nav className="flex-1 mt-10">
            <ul className="space-y-7">
              <li>
                <button 
                  type="button" 
                  onClick={() => handleMenuSelect('Pacotes')} 
                  className={`flex items-center gap-2 w-full px-6 py-3 text-[1.5rem] font-medium rounded transition-colors duration-200 text-left ${selectedMenu === 'Pacotes' ? 'bg-blue-100' : 'hover:bg-gray-50'}`}
                > 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64" />
                  </svg>
                  Pacotes
                </button>
              </li>
              
              <li>
                <button 
                  type="button" 
                  onClick={() => handleMenuSelect('Reservas')} 
                  className={`flex items-center gap-2 w-full px-6 py-3 text-[1.5rem] font-medium rounded transition-colors duration-200 text-left ${selectedMenu === 'Reservas' ? 'bg-blue-100' : 'hover:bg-gray-50'}`}
                > 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                  </svg>
                  Reservas
                </button>
              </li>

              <li>
                <button 
                  type="button" 
                  onClick={() => handleMenuSelect('Avaliações')} 
                  className={`flex items-center gap-2 w-full px-6 py-3 text-[1.5rem] font-medium rounded transition-colors duration-200 text-left ${selectedMenu === 'Avaliações' ? 'bg-blue-100' : 'hover:bg-gray-50'}`}
                > 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                  </svg>
                  Avaliações
                </button>
              </li>

              {(user?.role === 'Admin' || user?.role === 'Administrador') && (
                <>
                  <li>
                    <button 
                      type="button" 
                      onClick={() => handleMenuSelect('Métricas')} 
                      className={`flex items-center gap-2 w-full px-6 py-3 text-[1.5rem] font-medium rounded transition-colors duration-200 text-left ${selectedMenu === 'Métricas' ? 'bg-blue-100' : 'hover:bg-gray-50'}`}
                    > 
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                      </svg>
                      Métricas
                    </button>
                  </li>
                  
                  <li>
                    <button 
                      type="button" 
                      onClick={() => handleMenuSelect('Usuarios')} 
                      className={`flex items-center gap-2 w-full px-6 py-3 text-[1.5rem] font-medium rounded transition-colors duration-200 text-left ${selectedMenu === 'Usuarios' ? 'bg-blue-100' : 'hover:bg-gray-50'}`}
                    > 
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                      </svg>
                      Usuários
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>

          {/* Botão de logout - apenas visível no mobile */}
          <div className="md:hidden mt-auto pt-6 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-6 py-3 text-[1.5rem] font-medium rounded transition-colors duration-200 text-left text-red-600 hover:bg-red-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H9m0 0l3-3m-3 3l3 3" />
              </svg>
              Sair
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSideBar;