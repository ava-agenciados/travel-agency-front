import { useState } from 'react'

/**
 * Componente de Menu Hambúrguer
 * Visível apenas em dispositivos móveis (até iPad)
 * Responsivo e com animações suaves
 */

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  // Função para alternar o estado do menu
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // Lista de itens do menu de navegação
  const menuItems = [
    { href: '/', label: 'Home',},
    { href: '/about', label: 'Sobre',},
    { href: '/contact', label: 'Contato',},
    { href: '/services', label: 'Serviços',}
  ]

  return (
    // Container com visibilidade responsiva: visível apenas em mobile/tablet
    <div className="relative block md:hidden">
      {/* Novo botão do menu hambúrguer com animação SVG - tamanho reduzido */}
      <button 
        className="group inline-flex w-10 h-10 text-white bg-white bg-opacity-20 text-center items-center justify-center rounded shadow-lg hover:bg-opacity-30 transition backdrop-blur-sm"
        aria-pressed={isOpen}
        onClick={toggleMenu}
        aria-label="Menu de navegação"
      >
        <span className="sr-only">Menu</span>
        <svg className="w-5 h-5 fill-current pointer-events-none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <rect 
            className={`origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] ${
              isOpen 
                ? 'translate-x-0 translate-y-0 rotate-[315deg]' 
                : '-translate-y-[5px] translate-x-[7px]'
            }`} 
            y="7" 
            width="9" 
            height="2" 
            rx="1"
          />
          <rect 
            className={`origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] ${
              isOpen ? 'rotate-45' : ''
            }`} 
            y="7" 
            width="16" 
            height="2" 
            rx="1"
          />
          <rect 
            className={`origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] ${
              isOpen 
                ? 'translate-y-0 rotate-[135deg]' 
                : 'translate-y-[5px]'
            }`} 
            y="7" 
            width="9" 
            height="2" 
            rx="1"
          />
        </svg>
      </button>

      {/* Menu dropdown com animação suave */}
      <div className={`absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl py-2 w-48 z-40 transform transition-all duration-300 ease-in-out ${
        isOpen 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
      }`}>
        {/* Lista de itens do menu */}
        {menuItems.map((item, index) => (
          <a 
            key={index}
            href={item.href} 
            className="block px-4 py-3 text-gray-800 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-3"
            onClick={() => setIsOpen(false)}
          >
            <span className="text-sm font-medium">{item.label}</span>
          </a>
        ))}
        
        {/* Divisor visual */}
        <hr className="my-2 border-gray-200" />
        
        {/* Item especial para configurações */}
        <a 
          href="/settings"
          className="block px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-3"
          onClick={() => setIsOpen(false)}
        >
          <span className="text-sm font-medium">Configurações</span>
        </a>
      </div>

      {/* Overlay para fechar o menu quando clicar fora */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-20" 
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        ></div>
      )}
    </div>
  )
}

export default HamburgerMenu
