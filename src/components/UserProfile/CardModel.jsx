const CardModel = ({ 
    destinationImage, 
    destinationName, 
    departureDate, 
    returnDate, 
    guests, 
    bookingId,
    rating = 4.5,
    onDetailsClick 
}) => {
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
        <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="flex flex-col sm:flex-row h-full">
                {/* Foto do destino - Lado esquerdo, altura completa */}
                <div className="flex-shrink-0 sm:w-56 h-48 sm:h-auto">
                    <img 
                        src={destinationImage} 
                        alt={destinationName}
                        className="w-full h-full object-cover"
                    />
                </div>
                
                {/* Informações da reserva - Lado direito */}
                <div className="flex-1 flex flex-col justify-between p-4">
                    <div className="space-y-3">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-1">
                                {destinationName}
                            </h3>
                            <p className="text-sm text-gray-500">
                                Pacote: #{bookingId}
                            </p>
                        </div>
                        
                        <div className="space-y-2">
                            <div className="flex flex-col sm:flex-row sm:gap-4">
                                <div>
                                    <span className="text-sm font-semibold text-gray-600">Data de Partida:</span>
                                    <p className="text-sm text-gray-800">{departureDate}</p>
                                </div>
                                <div>
                                    <span className="text-sm font-semibold text-gray-600">Data de Retorno:</span>
                                    <p className="text-sm text-gray-800">{returnDate}</p>
                                </div>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row sm:gap-4">
                                <div>
                                    <span className="text-sm font-semibold text-gray-600">Passageiros:</span>
                                    <p className="text-sm text-gray-800">{guests}</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Campo de avaliação com estrelas */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-600">Avaliação:</span>
                            <div className="flex items-center gap-1">
                                {renderStars(rating)}
                                <span className="text-sm text-gray-600 ml-1">({rating})</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Botão de detalhes no canto inferior direito */}
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={() => onDetailsClick && onDetailsClick(bookingId)}
                            className="bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                        >
                            Ver Detalhes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardModel;
