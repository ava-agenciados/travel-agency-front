import { useState, useEffect } from "react";
import authService from "../../services/authService";

// Recebe opcionalmente a lista de pacotes para mapear nomes
const BookingsContent = ({ packages = [] }) => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const itemsPerPage = 7;
  const totalPages = Math.ceil(bookings.length / itemsPerPage);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/v1/dashboard/bookings");
        if (!res.ok) throw new Error("Erro ao buscar reservas");
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        setError("Erro ao buscar reservas");
      }
      setLoading(false);
    };
    fetchBookings();
  }, []);

  const handleView = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleDelete = async (booking) => {
    if (!window.confirm(`Tem certeza que deseja excluir a reserva de ${booking.contractingUser?.email || booking.customerName || booking.cliente || "cliente"}?`)) return;
    try {
      const bookingId = booking.id || booking.bookingId;
      const res = await fetch(`/api/v1/dashboard/bookings/${bookingId}`, { method: "DELETE" });
      if (res.ok) {
        setBookings((prev) => prev.filter(b => (b.id || b.bookingId) !== bookingId));
        setShowModal(false);
      } else {
        alert("Erro ao excluir reserva.");
      }
    } catch {
      alert("Erro ao excluir reserva.");
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Helper para buscar nome do pacote
  const getPackageName = (id) => {
    const pkg = packages.find(p => p.id === id || p.packageId === id);
    return pkg ? (pkg.nome || pkg.name) : id;
  };

  // Paginação
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedBookings = bookings.slice(startIdx, endIdx);

  return (
    <div className="w-full max-w-7xl flex-1 mx-auto rounded-lg bg-white p-2 md:p-10 flex flex-col justify-start shadow-xl mt-4 md:mt-16 overflow-auto" style={{ minHeight: '400px', maxHeight: 'calc(100vh - 6rem)' }}>
      <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 mt-4 md:mt-6 text-center">Reservas</h2>
      {loading ? (
        <p className="text-gray-500 text-center">Carregando reservas...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-500 text-center">Nenhuma reserva encontrada.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 md:px-4 py-2 text-center text-xs md:text-sm font-semibold text-gray-700 hidden md:table-cell">ID</th>
                  <th className="px-2 md:px-4 py-2 text-center text-xs md:text-sm font-semibold text-gray-700">Cliente</th>
                  <th className="px-2 md:px-4 py-2 text-center text-xs md:text-sm font-semibold text-gray-700 hidden md:table-cell">Pacote</th>
                  <th className="px-2 md:px-4 py-2 text-center text-xs md:text-sm font-semibold text-gray-700">Data</th>
                  <th className="px-2 md:px-4 py-2 text-center text-xs md:text-sm font-semibold text-gray-700 hidden sm:table-cell">Status</th>
                  <th className="px-2 md:px-4 py-2 text-center text-xs md:text-sm font-semibold text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {paginatedBookings.map((booking, idx) => {
                  // Nome ou email do cliente
                  let clientInfo = '-';
                  if (booking.contractingUser && booking.contractingUser.email) {
                    clientInfo = booking.contractingUser.email;
                  } else if (booking.clientName) clientInfo = booking.clientName;
                  else if (booking.cliente) clientInfo = booking.cliente;
                  else if (booking.companion && booking.companion.length > 0) clientInfo = booking.companion[0].fullName;

                  // Nome do pacote
                  let packageName = '-';
                  if (booking.packageName) packageName = booking.packageName;
                  else if (booking.pacote) packageName = booking.pacote;
                  else if (booking.packageId && packages && packages.length > 0) {
                    const pkg = packages.find(p => p.id === booking.packageId || p.packageId === booking.packageId);
                    if (pkg) packageName = pkg.nome || pkg.name;
                  }

                  // Data da viagem
                  let travelDate = '-';
                  
                  // Tenta vários campos possíveis para data da viagem
                  const possibleDateFields = [
                    booking.travelDate,
                    booking.date,
                    booking.departureDate,
                    booking.startDate,
                    booking.travel_date,
                    booking.departure_date,
                    booking.start_date
                  ];
                  
                  for (const dateField of possibleDateFields) {
                    if (dateField) {
                      // Se já está no formato brasileiro (dd/MM/yyyy), usa como está
                      if (typeof dateField === 'string' && dateField.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
                        travelDate = dateField;
                        break;
                      }
                      
                      // Tenta converter outros formatos
                      const d = new Date(dateField);
                      if (!isNaN(d.getTime())) {
                        travelDate = d.toLocaleDateString('pt-BR');
                        break;
                      }
                    }
                  }

                  return (
                    <tr key={booking.id || idx} className="hover:bg-blue-50">
                      <td className="px-2 md:px-4 py-2 whitespace-nowrap text-center font-medium text-xs md:text-sm hidden md:table-cell">{booking.id}</td>
                      <td className="px-2 md:px-4 py-2 whitespace-nowrap text-center text-xs md:text-sm">{clientInfo}</td>
                      <td className="px-2 md:px-4 py-2 whitespace-nowrap text-center text-xs md:text-sm hidden md:table-cell">{packageName}</td>
                      <td className="px-2 md:px-4 py-2 whitespace-nowrap text-center text-xs md:text-sm">{travelDate}</td>
                      <td className="px-2 md:px-4 py-2 whitespace-nowrap text-center text-xs md:text-sm hidden sm:table-cell">{booking.status || '-'}</td>
                      <td className="px-2 md:px-4 py-2 whitespace-nowrap flex gap-1 md:gap-2 justify-center">
                        <button onClick={() => handleView(booking)} className="p-1 md:p-2 rounded hover:bg-blue-100 text-blue-600" title="Visualizar">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 md:w-6 md:h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          </svg>
                        </button>
                        <button onClick={() => alert('Função de editar reserva ainda não implementada.')} className="p-1 md:p-2 rounded hover:bg-yellow-100 text-yellow-600" title="Editar">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 md:w-6 md:h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                          </svg>
                        </button>
                        {/* Botão de excluir - Apenas para Administradores */}
                        {(authService.getUserRole() === 'Admin' || authService.getUserRole() === 'Administrador') && (
                          <button onClick={() => handleDelete(booking)} className="p-1 md:p-2 rounded hover:bg-red-100 text-red-600" title="Excluir">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Paginação */}
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              className="px-2 md:px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 text-xs md:text-sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span className="mx-2 text-xs md:text-sm">Página {currentPage} de {totalPages}</span>
            <button
              className="px-2 md:px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 text-xs md:text-sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Próxima
            </button>
          </div>
        </>
      )}
      {/* Modal de detalhes da reserva */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full p-4 md:p-8 relative animate-fadeIn flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold">&times;</button>
            <h3 className="text-xl md:text-2xl font-bold mb-2">Detalhes da Reserva</h3>
            <div className="flex flex-col gap-2">
              <p><span className="font-semibold">ID:</span> {selectedBooking.id}</p>
              <p><span className="font-semibold">Cliente:</span> {selectedBooking.contractingUser ? `${selectedBooking.contractingUser.firstName || ''} ${selectedBooking.contractingUser.lastName || ''} (${selectedBooking.contractingUser.email || '-'})` : '-'}</p>
              <p><span className="font-semibold">CPF/Passaporte:</span> {selectedBooking.contractingUser?.cpfPassport || '-'}</p>
              <p><span className="font-semibold">Pacote:</span> {
                (() => {
                  const pkg = packages.find(p => p.id === selectedBooking.packageId || p.packageId === selectedBooking.packageId);
                  return pkg ? (pkg.nome || pkg.name) : selectedBooking.packageId;
                })()
              }</p>
              <p><span className="font-semibold">Data da Viagem:</span> {
                (() => {
                  const possibleDateFields = [
                    selectedBooking.travelDate,
                    selectedBooking.date,
                    selectedBooking.departureDate,
                    selectedBooking.startDate,
                    selectedBooking.travel_date,
                    selectedBooking.departure_date,
                    selectedBooking.start_date
                  ];
                  
                  for (const dateField of possibleDateFields) {
                    if (dateField) {
                      // Se já está no formato brasileiro (dd/MM/yyyy), retorna como está
                      if (typeof dateField === 'string' && dateField.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
                        return dateField;
                      }
                      
                      // Tenta converter outros formatos
                      const d = new Date(dateField);
                      if (!isNaN(d.getTime())) {
                        return d.toLocaleDateString('pt-BR');
                      }
                    }
                  }
                  return '-';
                })()
              }</p>
              <p><span className="font-semibold">Status:</span> {selectedBooking.status || '-'}</p>
              <p><span className="font-semibold">Desconto:</span> {
                (() => {
                  // Verifica se há desconto válido na reserva
                  const discount = selectedBooking.discountPercent || selectedBooking.discount;
                  if (discount !== null && discount !== undefined && discount > 0) {
                    return discount + '%';
                  }
                  return 'Sem desconto';
                })()
              }</p>
              <p><span className="font-semibold">Seguro Viagem:</span> {selectedBooking.hasTravelInsurance ? 'Sim' : 'Não'}</p>
              <p><span className="font-semibold">Guia Turístico:</span> {selectedBooking.hasTourGuide ? 'Sim' : 'Não'}</p>
              <p><span className="font-semibold">Passeio Incluso:</span> {selectedBooking.hasTour ? 'Sim' : 'Não'}</p>
              <p><span className="font-semibold">Atividades Inclusas:</span> {selectedBooking.hasActivities ? 'Sim' : 'Não'}</p>
              {/* Hospedagem */}
              {selectedBooking.lodgingInfo && (
                <div className="mt-2">
                  <span className="font-semibold">Hospedagem:</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm md:text-base mt-1">
                    <span><b>Banheiros:</b> {selectedBooking.lodgingInfo.baths}</span>
                    <span><b>Camas:</b> {selectedBooking.lodgingInfo.beds}</span>
                    <span><b>Wi-Fi:</b> {selectedBooking.lodgingInfo.wifiIncluded ? 'Sim' : 'Não'}</span>
                    <span><b>Estacionamento:</b> {selectedBooking.lodgingInfo.parkingSpot ? 'Sim' : 'Não'}</span>
                    <span><b>Piscina:</b> {selectedBooking.lodgingInfo.swimmingPool ? 'Sim' : 'Não'}</span>
                    <span><b>Academia:</b> {selectedBooking.lodgingInfo.fitnessCenter ? 'Sim' : 'Não'}</span>
                    <span><b>Restaurante:</b> {selectedBooking.lodgingInfo.restaurantOnSite ? 'Sim' : 'Não'}</span>
                    <span><b>Pet Friendly:</b> {selectedBooking.lodgingInfo.petAllowed ? 'Sim' : 'Não'}</span>
                    <span><b>Ar Condicionado:</b> {selectedBooking.lodgingInfo.airConditioned ? 'Sim' : 'Não'}</span>
                    <span><b>Café da Manhã:</b> {selectedBooking.lodgingInfo.breakfast ? 'Sim' : 'Não'}</span>
                  </div>
                  {selectedBooking.lodgingInfo.location && (
                    <div className="mt-2 text-sm md:text-base">
                      <b>Endereço:</b>
                      <div className="ml-2">
                        <div>{selectedBooking.lodgingInfo.location.street}, {selectedBooking.lodgingInfo.location.number}</div>
                        <div>{selectedBooking.lodgingInfo.location.neighborhood}</div>
                        <div>{selectedBooking.lodgingInfo.location.city} - {selectedBooking.lodgingInfo.location.state}, {selectedBooking.lodgingInfo.location.country}</div>
                        <div>CEP: {selectedBooking.lodgingInfo.location.zipCode}</div>
                        {selectedBooking.lodgingInfo.location.complement && <div>Compl.: {selectedBooking.lodgingInfo.location.complement}</div>}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* Companions */}
              {selectedBooking.companion && selectedBooking.companion.length > 0 && (
                <div>
                  <span className="font-semibold">Acompanhantes:</span>
                  <ul className="list-disc ml-6">
                    {selectedBooking.companion.map((c, idx) => (
                      <li key={idx}>{c.fullName} - Doc: {c.documentNumber}</li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Payments */}
              {selectedBooking.payment && selectedBooking.payment.length > 0 && (
                <div>
                  <span className="font-semibold">Pagamentos:</span>
                  <ul className="list-disc ml-6">
                    {selectedBooking.payment.map((p, idx) => (
                      <li key={idx}>Método: {p.paymentMethod}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="flex gap-2 justify-end mt-2">
              <button onClick={() => setShowModal(false)} className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">Fechar</button>
              {/* Botão de excluir - Apenas para Administradores */}
              {(authService.getUserRole() === 'Admin' || authService.getUserRole() === 'Administrador') && (
                <button onClick={() => handleDelete(selectedBooking)} className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600">Excluir</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default BookingsContent;