const NavBar = () => {
  localStorage.setItem("authToken", "eyKLSjkndfn89f_fsdkjnffsdf");
  localStorage.setItem("name", "Jamyle");

  const authToken = localStorage.getItem("authToken");
  const name = localStorage.getItem("name");

  return (
    <header className="bg-gray-100 w-full border-b border-gray-200">
      <div className="max-w-9xl mx-auto px-4 py-4 flex items-center justify-between">
        <p className="text-xl font-extrabold text-gray-800">New Horizon</p>

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
        <button>
          {authToken ? name : "Entrar"}
        </button>
      </div>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
