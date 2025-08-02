import { useState, useEffect } from "react";
import { getUserProfile } from "../../services/userService";

const NavBar = () => {

  const authToken = localStorage.getItem("authToken");
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  // Busca nome do usuário autenticado
  useEffect(() => {
    async function fetchUser() {
      if (!authToken) {
        setUserName("");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await getUserProfile();
        setUserName(`${data.firstName}`.trim());
      } catch {
        setUserName("");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [authToken]);

  function handleLogout() {
    localStorage.removeItem("authToken");
    window.location.reload();
  }

  return (
    <header className="bg-gray-100 w-full border-b border-gray-200">
      <div className="max-w-9xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/"><p className="text-xl font-extrabold text-gray-800">New Horizon</p></a>

        <nav className="flex items-center gap-6 text-sm text-gray-700 font-semibold">
          <ul className="hidden md:flex items-center gap-6">
            <li>
              <a href="#">Pacotes</a>
            </li>
            <li>
              <a href="#">Ofertas</a>
            </li>
            {authToken ? (
              <li>
                <a href="#">Minhas Reservas</a>
              </li>
            ) : (
              <li>
                <a href="#">Promoções</a>
              </li>
            )}
          </ul>

          <div className="flex items-center bg-gray-200 rounded-full px-3 py-1 gap-2">
        {/* Avatar com iniciais do usuário */}
        <div
          className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-xs select-none"
          style={{ minWidth: 24, minHeight: 24 }}
        >
          {authToken && userName
            ? userName.split(" ").map(word => word[0]).join("").toUpperCase().slice(0,2)
            : <span className="text-gray-200">?</span>}
        </div>
        <div className="relative flex items-center">
          {authToken ? (
            <>
              <button
                className="text-gray-800 hover:text-blue-600 focus:outline-none"
                onClick={() => setShowDropdown((prev) => !prev)}
                disabled={loading}
              >
                {loading ? "..." : userName}
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-14 w-20 bg-white border rounded shadow-lg z-50">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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