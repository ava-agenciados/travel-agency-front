import { useState, useEffect } from 'react';

const Filter = ({ onSearch, onStatusFilter, onDateFilter, placeholder = "Buscar reservas..." }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('Todos');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const statusOptions = ['Todos', 'Pendente', 'Aprovado', 'Recusado'];

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    const handleStatusChange = (e) => {
        const status = e.target.value;
        setSelectedStatus(status);
        onStatusFilter(status === 'Todos' ? '' : status);
    };

    const handleDateChange = () => {
        if (onDateFilter) {
            onDateFilter(startDate, endDate);
        }
    };

    // useEffect para chamar handleDateChange quando as datas mudarem
    useEffect(() => {
        handleDateChange();
    }, [startDate, endDate]);

    return (
        <div className="w-full max-w-4xl mx-auto mb-4">
            <div className="flex flex-col gap-3">
                {/* Primeira linha: Busca e Status */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg 
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 
                                 text-sm placeholder-gray-500 shadow-sm"
                    />
                    
                    <select
                        value={selectedStatus}
                        onChange={handleStatusChange}
                        className="px-4 py-3 border border-gray-300 rounded-lg 
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 
                                 text-sm bg-white shadow-sm min-w-[120px]"
                    >
                        {statusOptions.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
                
                {/* Segunda linha: Filtro de Data */}
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <span className="text-sm text-gray-600 font-medium">Filtrar por data:</span>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <span className="text-sm text-gray-500">até</span>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                </div>
            </div>
        </div>
    );
};

export default Filter;
