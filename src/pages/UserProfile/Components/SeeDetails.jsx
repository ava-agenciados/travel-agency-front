import { useState } from 'react';

const SeeDetails = ({ isOpen, onClose, booking, packageInfo }) => {
    if (!isOpen || !booking) return null;

    // Função para determinar a cor do status
    const getStatusColor = (status) => {
        if (!status) return 'text-gray-500';
        
        const statusLower = status.toLowerCase();
        if (statusLower.includes('aprovado') || statusLower.includes('concluído')) {
            return 'text-green-600';
        } else if (statusLower.includes('recusado') || statusLower.includes('cancelado')) {
            return 'text-red-600';
        } else if (statusLower.includes('pendente')) {
            return 'text-orange-400';
        }
        return 'text-gray-500';
    };

    // Função para renderizar estrelas
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <span key={i} className="text-yellow-400">★</span>
            );
        }
        
        if (hasHalfStar) {
            stars.push(
                <span key="half" className="text-yellow-400">☆</span>
            );
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <span key={`empty-${i}`} className="text-gray-300">★</span>
            );
        }
        
        return stars;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header do Modal */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-blue-900">Detalhes da Reserva</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                    >
                        ×
                    </button>
                </div>

                {/* Conteúdo do Modal */}
                <div className="p-6 space-y-6">
                    {/* Informações Básicas da Reserva */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Coluna Esquerda */}
                        <div className="space-y-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-blue-900 mb-3">Informações da Reserva</h3>
                                <div className="space-y-2">
                                    <div>
                                        <span className="font-semibold text-gray-700">ID da Reserva:</span>
                                        <p className="text-gray-800">#{booking.id}</p>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-700">Status:</span>
                                        <p className={`font-semibold ${getStatusColor(booking.status)}`}>
                                            {booking.status}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-700">Data de Viagem:</span>
                                        <p className="text-gray-800">{booking.travelDate}</p>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-700">Data de Retorno:</span>
                                        <p className="text-gray-800">{booking.endTravel}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Informações do Pacote */}
                            {packageInfo && (
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-green-900 mb-3">Avaliação do Pacote</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1">
                                            {renderStars(packageInfo.rating || 0)}
                                        </div>
                                        <span className="text-gray-600">({packageInfo.rating || 0})</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Coluna Direita */}
                        <div className="space-y-4">
                            {/* Pagamento */}
                            <div className="bg-yellow-50 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-yellow-900 mb-3">Pagamento</h3>
                                {booking.payment && booking.payment.length > 0 ? (
                                    <div className="space-y-2">
                                        {booking.payment.map((payment, index) => (
                                            <div key={index}>
                                                <span className="font-semibold text-gray-700">Método:</span>
                                                <p className="text-gray-800">{payment.paymentMethod}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500">Informações de pagamento não disponíveis</p>
                                )}
                            </div>

                            {/* Acompanhantes */}
                            <div className="bg-purple-50 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-purple-900 mb-3">Acompanhantes</h3>
                                {booking.companion && booking.companion.length > 0 ? (
                                    <div className="space-y-2">
                                        <p className="text-gray-800">
                                            <span className="font-semibold">Total de pessoas:</span> {booking.companion.length + 1}
                                        </p>
                                        <p className="text-gray-800">
                                            <span className="font-semibold">Acompanhantes:</span> {booking.companion.length}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-gray-800">Viagem individual (1 pessoa)</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Informações da Hospedagem */}
                    {booking.lodgingInfo && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações da Hospedagem</h3>
                            
                            {/* Localização */}
                            {booking.lodgingInfo.location && (
                                <div className="mb-4">
                                    <h4 className="font-semibold text-gray-700 mb-2">Localização</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="font-medium text-gray-600">Endereço:</span>
                                            <p className="text-gray-800">
                                                {booking.lodgingInfo.location.street}, {booking.lodgingInfo.location.number}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-600">Bairro:</span>
                                            <p className="text-gray-800">{booking.lodgingInfo.location.neighborhood}</p>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-600">Cidade:</span>
                                            <p className="text-gray-800">{booking.lodgingInfo.location.city}</p>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-600">Estado:</span>
                                            <p className="text-gray-800">{booking.lodgingInfo.location.state}</p>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-600">País:</span>
                                            <p className="text-gray-800">{booking.lodgingInfo.location.country}</p>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-600">CEP:</span>
                                            <p className="text-gray-800">{booking.lodgingInfo.location.zipCode}</p>
                                        </div>
                                    </div>
                                    {booking.lodgingInfo.location.complement && (
                                        <div className="mt-2">
                                            <span className="font-medium text-gray-600">Complemento:</span>
                                            <p className="text-gray-800">{booking.lodgingInfo.location.complement}</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Comodidades */}
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-3">Comodidades</h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-3 h-3 rounded-full ${booking.lodgingInfo.wifiIncluded ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                        <span className="text-gray-700">Wi-Fi</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`w-3 h-3 rounded-full ${booking.lodgingInfo.parkingSpot ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                        <span className="text-gray-700">Estacionamento</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`w-3 h-3 rounded-full ${booking.lodgingInfo.swimmingPool ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                        <span className="text-gray-700">Piscina</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`w-3 h-3 rounded-full ${booking.lodgingInfo.fitnessCenter ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                        <span className="text-gray-700">Academia</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`w-3 h-3 rounded-full ${booking.lodgingInfo.restaurantOnSite ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                        <span className="text-gray-700">Restaurante</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`w-3 h-3 rounded-full ${booking.lodgingInfo.petAllowed ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                        <span className="text-gray-700">Pet Friendly</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`w-3 h-3 rounded-full ${booking.lodgingInfo.airConditioned ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                        <span className="text-gray-700">Ar Condicionado</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`w-3 h-3 rounded-full ${booking.lodgingInfo.breakfast ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                        <span className="text-gray-700">Café da Manhã</span>
                                    </div>
                                </div>
                                
                                {/* Quartos e Banheiros */}
                                <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                                    <div>
                                        <span className="font-medium text-gray-600">Quartos:</span>
                                        <p className="text-gray-800">{booking.lodgingInfo.beds}</p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-600">Banheiros:</span>
                                        <p className="text-gray-800">{booking.lodgingInfo.baths}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer do Modal */}
                <div className="flex justify-end p-6 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SeeDetails;