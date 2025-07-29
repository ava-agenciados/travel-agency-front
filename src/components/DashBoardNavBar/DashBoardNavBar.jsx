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
    <nav className="w-full flex items-center justify-between bg-white shadow px-6 py-3 border-b border-gray-100">
      {/* Busca e filtros */}
      <form className="flex gap-2 items-center flex-1" onSubmit={handleSubmit} autoComplete="off">
        <input
          type="text"
          name="search"
          placeholder="Buscar por nome, descrição..."
          value={filters.search}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-56"
        />
        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="border rounded px-2 py-1"
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
          className="border rounded px-2 py-1 w-32"
        />
        <input
          type="text"
          name="destination"
          placeholder="Destino"
          value={filters.destination}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-32"
        />
        <input
          type="number"
          name="price"
          placeholder="Preço máx."
          value={filters.price}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-28"
          min="0"
        />
        {/* Botão de buscar pode ser removido ou mantido para acessibilidade */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 hidden md:block">Buscar</button>
      </form>
      {/* Logout */}
      <button
        onClick={onLogout}
        className="ml-6 flex items-center gap-2 text-red-600 hover:text-red-800 font-semibold px-3 py-1 rounded border border-red-200 bg-red-50 hover:bg-red-100"
        title="Sair"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H9m0 0l3-3m-3 3l3 3" />
        </svg>
        Sair
      </button>
    </nav>
  );
};

export default DashBoardNavBar;
