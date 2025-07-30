import { useState } from "react";
import CardModel from "../../components/UserProfile/CardModel";

const MyBookings = () => {
    const [activeTab, setActiveTab] = useState('active'); // 'active' ou 'history'

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

                    {/* Card principal de reservas */}
                    <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 md:p-6 lg:p-8 my-2 sm:my-4">

                    <h2 className="text-base sm:text-lg md:text-xl font-bold text-blue-900 mb-3 sm:mb-4">
                        {activeTab === 'active' ? 'Histórico de Pacotes' : 'Pacotes Ativos'}
                    </h2>

                    {/* Conteúdo das reservas */}
                    <div className="space-y-3 sm:space-y-4">
                        {activeTab === 'active' ? (
                            <div className="text-center text-gray-500 py-6 sm:py-8">
                                <p className="text-sm sm:text-base">Nenhuma reserva encontrada no histórico.</p>
                            </div>
                        ) : (
                            <div className="space-y-3 sm:space-y-4">
                                {/* Reserva ativa simulada */}
                                <CardModel 
                                    destinationImage="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400&h=300&fit=crop"
                                    destinationName="Cancún, México"
                                    departureDate="20/02/2025"
                                    returnDate="27/02/2025"
                                    guests="2 adultos, 1 criança"
                                    bookingId="CAM-2025-001"
                                    rating={4.8}
                                    onDetailsClick={(id) => console.log('Ver detalhes da reserva:', id)}
                                />
                                
                                {/* Segunda reserva simulada */}
                                <CardModel 
                                    destinationImage="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop"
                                    destinationName="Rio de Janeiro, Brasil"
                                    departureDate="15/03/2025"
                                    returnDate="18/03/2025"
                                    guests="2 adultos"
                                    bookingId="RJB-2025-002"
                                    rating={4.2}
                                    onDetailsClick={(id) => console.log('Ver detalhes da reserva:', id)}
                                />
                            </div>
                        )}
                    </div>
                </div>
                </div>
            </main>            
        </div>
    );
};

export default MyBookings;
