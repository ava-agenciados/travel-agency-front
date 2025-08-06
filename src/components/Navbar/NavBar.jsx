import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { getUserProfile } from "../../services/userService";

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  // Atualiza dados do usuário
  const updateUserData = async () => {
    try {
      const isAuth = authService.isAuthenticated();
      setIsAuthenticated(isAuth);
      
      if (isAuth) {
        const userData = authService.getUserInfo();
        setUser(userData);
        
        // Busca o nome completo do usuário e pega apenas o primeiro nome
        try {
          const profile = await getUserProfile();
          const firstName = profile.firstName?.trim() || "";
          setUserName(firstName);
        } catch (error) {
          console.error('Erro ao buscar perfil:', error);
          // Fallback: usa o email se não conseguir buscar o nome
          setUserName(userData.email?.split("@")[0] || "");
        }
      } else {
        setUser(null);
        setUserName("");
      }
    } catch (error) {
      console.error('Erro ao obter dados do usuário:', error);
      setIsAuthenticated(false);
      setUser(null);
      setUserName("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateUserData();
    
    // Escuta mudanças no localStorage (quando faz login em outra aba)
    const handleStorageChange = () => {
      updateUserData();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    authService.logout(); // Usa o método completo do authService
    setShowDropdown(false);
  };

  const handleProfile = () => {
    setShowDropdown(false);
    navigate('/myProfile');
  };

  // Verifica se é admin/atendente usando authService
  const isAdminOrAttendant = authService.isAdmin() || authService.isAtendente();

  return (
    <header className="bg-gray-100 w-full border-b border-gray-200">
      <div className="max-w-9xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/"><p className="text-xl font-extrabold text-gray-800">New Horizon</p></a>

        <nav className="flex items-center gap-6 text-sm text-gray-700 font-semibold">
          <ul className="hidden md:flex items-center gap-6">
            {isAdminOrAttendant ? (
              <li>
                <a href="/admin">Painel Administrativo</a>
              </li>
            ) : (
              <>
                <li>
                  <a href="/">Pacotes</a>
                </li>
                {isAuthenticated ? (
                  <li>
                    <a href="/mybookings">Minhas Reservas</a>
                  </li>
                ) : (
                  <li>
                    <a href="/">Promoções</a>
                  </li>
                )}
              </>
            )}
          </ul>

          <div className="flex items-center bg-gray-200 rounded-full px-3 py-1 gap-2">
            {/* Avatar com iniciais do primeiro nome */}
            <div
              className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-xs select-none"
              style={{ minWidth: 24, minHeight: 24 }}
            >
              {isAuthenticated && userName
                ? userName.slice(0, 2).toUpperCase()
                : <span className="text-gray-200">?</span>}
            </div>
            <div className="relative flex items-center">
              {isAuthenticated ? (
                <>
                  <button
                    className="text-gray-800 hover:text-blue-600 focus:outline-none"
                    onClick={() => setShowDropdown((prev) => !prev)}
                    disabled={loading}
                  >
                    {loading ? "..." : userName || "Usuário"}
                  </button>
                  {showDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-32 bg-white border rounded shadow-lg z-50">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleProfile}
                      >
                        Meu perfil
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t"
                        onClick={handleLogout}
                      >
                        Sair
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <a href="/login" className="text-gray-800 hover:text-blue-600">
                  Entrar
                </a>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;