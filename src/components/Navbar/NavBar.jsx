// Componente de barra de navegação principal da aplicação
const NavBar = () => {
  return (
    // Header principal com estilo e borda inferior
    <header className="bg-gray-100 w-full border-b border-gray-200">
      {/* Container principal com largura máxima e padding */}
      <div className="max-w-9xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo/Nome da aplicação */}
        <p className="text-xl font-extrabold text-gray-800">New Horizons</p>

        {/* Navegação principal */}
        <nav className="flex items-center gap-6 text-sm text-gray-700 font-semibold">
          {/* Menu de navegação - oculto em dispositivos móveis */}
          <ul className="hidden md:flex items-center gap-6">
            <li>
              <a href="#">LOREM</a>
            </li>
            <li>
              <a href="#">LOREM</a>
            </li>
            <li>
              <a href="#">LOREM</a>
            </li>
            <li>
              <a href="#">LOREM</a>
            </li>
            <li>
              <a href="#">LOREM</a>
            </li>
          </ul>

          {/* Área do perfil do usuário com avatar e menu hambúrguer */}
          <div className="flex items-center bg-gray-200 rounded-full px-3 py-1 gap-2">
        {/* Avatar do usuário */}
        <img
          src="https://thumbs.dreamstime.com/b/vetor-de-%C3%ADcone-perfil-do-avatar-padr%C3%A3o-foto-usu%C3%A1rio-m%C3%ADdia-social-183042379.jpg" 
          alt="Perfil"
          className="w-6 h-6 rounded-full object-cover"
        />
        {/* Botão do menu hambúrguer */}
        <button>
          {/* Ícone do menu hambúrguer (três linhas) */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
        </nav>
      </div>
    </header>
  );
};

// Exporta o componente como padrão
export default NavBar;
