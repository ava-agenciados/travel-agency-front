// Componente Footer - rodapé da aplicação
const Footer = () => {
  return (
    // Footer principal com fundo escuro
    <footer className="bg-[#15233A] text-white px-6 py-10">
      {/* Container principal com grid responsivo */}
      <div className="max-w-9xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
        {/* Seção da marca/logo */}
        <div className="space-y-4">
          {/* Nome da empresa */}
          <h2 className="text-xl font-bold italic">New Horizons</h2>
          {/* Decoração visual com quadrados coloridos */}
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-blue-500 rounded"></div>
            ))}
          </div>
        </div>

        {/* Colunas de links (3 colunas idênticas) */}
        {[1, 2, 3].map((col) => (
          <div key={col}>
            {/* Título da seção */}
            <h3 className="text-sm font-bold uppercase mb-2">Produto</h3>
            {/* Lista de links */}
            <ul className="space-y-1 text-sm text-gray-300">
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
            </ul>
          </div>
        ))}

        {/* Seção de newsletter/contato */}
        <div className="space-y-2">
          {/* Título da seção */}
          <h3 className="text-sm font-normal">Receba notificações</h3>
          {/* Campo de input com botão de envio */}
          <div className="flex">
            <input
              type="text"
              placeholder="Fale conosco"
              className="px-3 py-2 w-full rounded-l-md bg-gray-100 text-gray-800 text-sm focus:outline-none"
            />
            {/* Botão de envio com ícone */}
            <button className="bg-blue-500 px-3 flex items-center justify-center rounded-r-md">
                {/* Ícone de envio (seta) */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>

            </button>
          </div>
        </div>
      </div>

      {/* Seção inferior com copyright e links legais */}
      <div className="max-w-9xl mx-auto">
      {/* Linha divisória e informações legais */}
      <div className="border-t border-gray-600 mt-10 pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-300">
        {/* Copyright */}
        <p>© 2025 Todos os direitos reservados</p>
        {/* Links legais */}
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="#">Privacidade</a>
          <a href="#">Termos</a>
          <a href="#">Cookies</a>
        </div>
      </div>
      </div>
    </footer>
  );
};


// Exporta o componente como padrão
export default Footer;
