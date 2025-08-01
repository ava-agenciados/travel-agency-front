import { useState } from "react";

const NavBar = () => {
  localStorage.setItem("authToken", "eyKLSjkndfn89f_fsdkjnffsdf");
  localStorage.setItem("name", "Jamyle");


  const authToken = localStorage.getItem("authToken");
  const name = localStorage.getItem("name");
  const [showDropdown, setShowDropdown] = useState(false);

  function handleLogout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("name");
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
        <img
          src="https://thumbs.dreamstime.com/b/vetor-de-%C3%ADcone-perfil-do-avatar-padr%C3%A3o-foto-usu%C3%A1rio-m%C3%ADdia-social-183042379.jpg" 
          alt="Perfil"
          className="w-6 h-6 rounded-full object-cover"
        />
        <div
          className="relative flex items-center"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          {authToken ? (
            <>
              <button className="text-gray-800 hover:text-blue-600 focus:outline-none">
                {name}
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