import { useState } from "react";

const statusOptions = [
  { value: '', label: 'Todas' },
  { value: 'ativo', label: 'Ativo' },
  { value: 'inativo', label: 'Inativo' },
];

const DashBoardNavBar = ({ onSearch, onLogout }) => {
  const [filters, setFilters] = useState({
    status: '',
    destination: '',
    origin: '',
    price: '',
    search: '',
  });


  // Chama busca dinâmica ao digitar
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    if (onSearch) onSearch(newFilters);
  };

  // Submit ainda existe para Enter, mas não é mais necessário clicar
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(filters);
  };

  return (
    <nav className="w-full flex flex-col md:flex-row items-center justify-between bg-white shadow px-3 md:px-6 py-3 border-b border-gray-100 gap-2 md:gap-0">
      {/* Busca e filtros */}
      <form className="flex flex-col md:flex-row gap-2 items-center flex-1 w-full md:w-auto" onSubmit={handleSubmit} autoComplete="off">
        <input
          type="text"
          name="search"
          placeholder="Buscar por nome, descrição..."
          value={filters.search}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-full md:w-56 text-sm"
        />
        <div className="flex gap-2 w-full md:w-auto">
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="border rounded px-2 py-1 flex-1 md:flex-none text-sm"
          >
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <input
            type="text"
            name="origin"
            placeholder="Origem"
            value={filters.origin}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-20 md:w-32 text-sm"
          />
          <input
            type="text"
            name="destination"
            placeholder="Destino"
            value={filters.destination}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-20 md:w-32 text-sm"
          />
          <input
            type="number"
            name="price"
            placeholder="Preço máx."
            value={filters.price}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-20 md:w-28 text-sm"
            min="0"
          />
        </div>
        {/* Botão de buscar pode ser removido ou mantido para acessibilidade */}
        <button type="submit" className="bg-blue-500 text-white px-3 md:px-4 py-1 rounded hover:bg-blue-600 text-sm hidden md:block">Buscar</button>
      </form>
      {/* Logout - apenas visível no desktop */}
      <button
        onClick={onLogout}
        className="ml-0 md:ml-6 mt-2 md:mt-0 flex items-center gap-2 text-red-600 hover:text-red-800 font-semibold px-3 py-1 rounded border border-red-200 bg-red-50 hover:bg-red-100 text-sm hidden md:flex"
        title="Sair"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H9m0 0l3-3m-3 3l3 3" />
        </svg>
        <span className="hidden md:inline">Sair</span>
      </button>
    </nav>
  );
};

export default DashBoardNavBar;
