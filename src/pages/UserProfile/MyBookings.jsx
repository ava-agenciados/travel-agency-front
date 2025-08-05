import { useState, useEffect } from "react";
import CardModel from "./Components/CardModel";
import SeeDetails from "./Components/SeeDetails";
import Filter from "./Components/Filter";
import { getUserBookings } from "../../services/userService";
import { getPackageImageAndRating } from "../../services/packageService";

const MyBookings = () => {
    const [activeTab, setActiveTab] = useState('active'); // 'active' ou 'history'
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [packageData, setPackageData] = useState({}); // Armazena imagens e avaliações dos pacotes
    const [selectedBooking, setSelectedBooking] = useState(null); // Reserva selecionada para ver detalhes
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado do modal
    const [searchTerm, setSearchTerm] = useState(''); // Termo de busca
    const [statusFilter, setStatusFilter] = useState(''); // Filtro de status
    const [dateRange, setDateRange] = useState({ start: '', end: '' }); // Filtro de data

    // Função para buscar as reservas do usuário
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                const userBookings = await getUserBookings();
                setBookings(userBookings);
                
                // Buscar informações dos pacotes (imagem e avaliação)
                const packageDataMap = {};
                for (const booking of userBookings) {
                    // Assumindo que existe um campo packageId no booking
                    // Se não existir, você pode usar booking.id ou outro identificador
                    const packageId = booking.packageId || booking.id;
                    
                    try {
                        const { image, rating, departureDate, returnDate } = await getPackageImageAndRating(packageId);
                        packageDataMap[packageId] = { image, rating, departureDate, returnDate };
                    } catch (err) {
                        console.error(`Erro ao buscar dados do pacote ${packageId}:`, err);
                        packageDataMap[packageId] = { image: null, rating: 0, departureDate: null, returnDate: null };
                    }
                }
                
                setPackageData(packageDataMap);
                setError(null);
            } catch (err) {
                setError('Erro ao carregar as reservas: ' + err.message);
                console.error('Erro ao buscar reservas:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    // Função para abrir o modal de detalhes
    const handleDetailsClick = (bookingId) => {
        const booking = bookings.find(b => b.id === parseInt(bookingId.split('-')[2])); // Extrai o ID do bookingId formatado
        if (booking) {
            setSelectedBooking(booking);
            setIsModalOpen(true);
        }
    };

    // Função para fechar o modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedBooking(null);
    };

    // Função para buscar reservas
    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    // Função para filtrar por status
    const handleStatusFilter = (status) => {
        setStatusFilter(status);
    };

    // Função para filtrar por data
    const handleDateFilter = (startDate, endDate) => {
        setDateRange({ start: startDate, end: endDate });
    };

    // Filtra as reservas baseado no status e busca
    const filteredBookings = bookings.filter(booking => {
        const packageId = booking.packageId || booking.id;
        const packageInfo = packageData[packageId] || { returnDate: null };
        
        // Usa a data de retorno do pacote, ou endTravel do booking como fallback
        const returnDate = packageInfo.returnDate || booking.endTravel || booking.travelDate;
        
        // Verifica se a data de retorno já passou
        const isDatePassed = returnDate ? new Date(returnDate.split('/').reverse().join('-')) < new Date() : false;
        
        // Filtro por tab (ativo ou histórico)
        let tabFilter = false;
        if (activeTab === 'history') {
            // Ativas - reservas aprovadas, pendentes E com data de retorno ainda não passada
            tabFilter = ['Aprovado', 'Pendente'].includes(booking.status) && !isDatePassed;
        } else {
            // Histórico - reservas concluídas, canceladas, recusadas, ou com data de retorno passada
            tabFilter = ['Concluído', 'Cancelado', 'Recusado'].includes(booking.status) || isDatePassed;
        }
        
        // Filtro por busca
        let searchFilter = true;
        if (searchTerm) {
            const destinationName = `${booking.lodgingInfo?.location?.city || ''}, ${booking.lodgingInfo?.location?.country || ''}`;
            searchFilter = destinationName.toLowerCase().includes(searchTerm.toLowerCase());
        }
        
        // Filtro adicional por status específico
        let specificStatusFilter = true;
        if (statusFilter) {
            specificStatusFilter = booking.status === statusFilter;
        }

        // Filtro por data
        let dateFilter = true;
        if (dateRange.start && dateRange.end) {
            // Tenta diferentes formatos de data da reserva
            let bookingDateStr = booking.travelDate || booking.createdAt || booking.departureDate;
            
            if (bookingDateStr) {
                // Converte a data da reserva para formato YYYY-MM-DD se necessário
                if (bookingDateStr.includes('/')) {
                    const parts = bookingDateStr.split('/');
                    if (parts.length === 3) {
                        // Assume formato DD/MM/YYYY
                        bookingDateStr = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
                    }
                }
                
                const bookingDate = new Date(bookingDateStr);
                const startDate = new Date(dateRange.start);
                const endDate = new Date(dateRange.end);
                
                // Normaliza as datas para comparação (remove horário)
                bookingDate.setHours(0, 0, 0, 0);
                startDate.setHours(0, 0, 0, 0);
                endDate.setHours(0, 0, 0, 0);
                
                dateFilter = bookingDate >= startDate && bookingDate <= endDate;
            }
        }
        
        return tabFilter && searchFilter && specificStatusFilter && dateFilter;
    });

    return (
        <div className="min-h-screen flex flex-col">            
            <main className="flex-1 flex items-center justify-center p-2 sm:p-4">
                <div className="w-full max-w-4xl px-2 sm:px-0">
                    {/* Botões de navegação fora do card */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-10 mb-4">
                        <button
                            onClick={() => setActiveTab('history')}
                            className={`w-full sm:flex-1 py-3 sm:py-4 px-4 rounded-lg font-semibold transition-colors text-sm sm:text-base ${
                                activeTab === 'history'
                                    ? 'bg-blue-900 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            Pacotes Ativos
                        </button>
                        <button
                            onClick={() => setActiveTab('active')}
                            className={`w-full sm:flex-1 py-3 sm:py-2 px-4 rounded-lg font-semibold transition-colors text-sm sm:text-base ${
                                activeTab === 'active'
                                    ? 'bg-blue-900 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            Histórico de Pacotes
                        </button>
                    </div>

                    {/* Barra de pesquisa */}
                    <Filter 
                        onSearch={handleSearch}
                        onStatusFilter={handleStatusFilter}
                        onDateFilter={handleDateFilter}
                        placeholder="Buscar por destino..."
                    />

                    {/* Card principal de reservas */}
                    <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 md:p-6 lg:p-8 my-2 sm:my-4">

                    <h2 className="text-base sm:text-lg md:text-xl font-bold text-blue-900 mb-3 sm:mb-4">
                        {activeTab === 'history' ? 'Pacotes Ativos' : 'Histórico de Pacotes'}
                    </h2>

                    {/* Conteúdo das reservas */}
                    <div className="space-y-3 sm:space-y-4">
                        {loading ? (
                            <div className="text-center text-gray-500 py-6 sm:py-8">
                                <p className="text-sm sm:text-base">Carregando reservas...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center text-red-500 py-6 sm:py-8">
                                <p className="text-sm sm:text-base">{error}</p>
                            </div>
                        ) : filteredBookings.length === 0 ? (
                            <div className="text-center text-gray-500 py-6 sm:py-8">
                                <p className="text-sm sm:text-base">
                                    {activeTab === 'history' 
                                        ? 'Nenhuma reserva ativa encontrada.' 
                                        : 'Nenhuma reserva encontrada no histórico.'
                                    }
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3 sm:space-y-4">
                                {filteredBookings.map((booking) => {
                                    const packageId = booking.packageId || booking.id;
                                    const packageInfo = packageData[packageId] || { image: null, rating: 0, departureDate: null, returnDate: null };
                                    
                                    return (
                                        <CardModel 
                                            key={booking.id}
                                            destinationImage={packageInfo.image || `${booking.lodgingInfo?.imageUrl || ''}`}
                                            destinationName={`${booking.lodgingInfo?.location?.city || ''}, ${booking.lodgingInfo?.location?.country || ''}`}
                                            departureDate={packageInfo.departureDate || booking.travelDate}
                                            returnDate={packageInfo.returnDate || booking.travelDate}
                                            guests={`${booking.companion?.length || 0 + 1} ${booking.companion?.length === 0 ? 'pessoa' : 'pessoas'}`}
                                            bookingId={`${booking.lodgingInfo?.location?.city?.substring(0,3).toUpperCase() || 'PKG'}-${new Date().getFullYear()}-${String(booking.id).padStart(3, '0')}`}
                                            rating={packageInfo.rating} // Usar avaliação real do pacote
                                            status={booking.status} // Adicionar o status da reserva
                                            onDetailsClick={handleDetailsClick}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
                </div>
            </main>

            {/* Modal de Detalhes */}
            <SeeDetails
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                booking={selectedBooking}
                packageInfo={selectedBooking ? packageData[selectedBooking.packageId || selectedBooking.id] : null}
            />            
        </div>
    );
};

export default MyBookings;