const Footer = () => {
  return (
    <footer className="bg-[#15233A] text-white px-6 py-10">
      <div className="max-w-9xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
        <div className="space-y-4">
          <h2 className="text-xl font-bold italic">New Horizon</h2>
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-blue-500 rounded"></div>
            ))}
          </div>
        </div>

        {[1, 2, 3].map((col) => (
          <div key={col}>
            <h3 className="text-sm font-bold uppercase mb-2">Produto</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
            </ul>
          </div>
        ))}

        <div className="space-y-2">
          <h3 className="text-sm font-normal">Receba notificações</h3>
          <div className="flex">
            <input
              type="text"
              placeholder="Fale conosco"
              className="px-3 py-2 w-full rounded-l-md bg-gray-100 text-gray-800 text-sm focus:outline-none"
            />
            <button className="bg-blue-500 px-3 flex items-center justify-center rounded-r-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>

            </button>
          </div>
        </div>
      </div>

      <div className="max-w-9xl mx-auto">
      <div className="border-t border-gray-600 mt-10 pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-300">
        <p>© 2025 Todos os direitos reservados</p>
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

export default Footer;
