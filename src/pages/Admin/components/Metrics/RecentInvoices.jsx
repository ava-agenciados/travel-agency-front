import React, { useState, useEffect } from 'react';
import TopCustomersChart from '../TopCustomersChart';

const RecentInvoices = () => {
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [bookings, setBookings] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTopCustomers, setShowTopCustomers] = useState(false);

  // Buscar reservas e pacotes
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [bookingsRes, packagesRes] = await Promise.all([
          fetch('/api/v1/dashboard/bookings'),
          fetch('/api/v1/packages'),
        ]);
        const bookingsData = bookingsRes.ok ? await bookingsRes.json() : [];
        const packagesData = packagesRes.ok ? await packagesRes.json() : [];
        setBookings(bookingsData);
        setPackages(packagesData);
      } catch (err) {
        setBookings([]);
        setPackages([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Montar invoices a partir das reservas e pacotes
  const invoices = bookings.map((booking) => {
    const pacote = packages.find((p) => p.id === booking.packageId);
    return {
      id: `#${booking.id}`,
      customerName: booking.contractingUser
        ? `${booking.contractingUser.firstName} ${booking.contractingUser.lastName}`
        : 'Cliente',
      customerEmail: booking.contractingUser?.email || '-',
      customerAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        booking.contractingUser
          ? `${booking.contractingUser.firstName} ${booking.contractingUser.lastName}`
          : 'Cliente'
      )}&background=random&size=32`,
      itemName: pacote?.name || 'Pacote de Viagem',
      orderDate: booking.travelDate || '-',
      status: booking.status || '-',
      price: pacote?.price ?? 0,
    };
  });

  // Ordenar por data (opcional, se travelDate for dd/MM/yyyy)
  const sortedInvoices = invoices.sort((a, b) => {
    const [diaA, mesA, anoA] = (a.orderDate || '01/01/1970').split('/').map(Number);
    const [diaB, mesB, anoB] = (b.orderDate || '01/01/1970').split('/').map(Number);
    const dateA = new Date(anoA, mesA - 1, diaA);
    const dateB = new Date(anoB, mesB - 1, diaB);
    return dateB - dateA;
  });

  // Filtrar por status
  const filteredInvoices =
    statusFilter === 'Todos'
      ? sortedInvoices
      : sortedInvoices.filter((invoice) => invoice.status === statusFilter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Aprovado':
        return 'bg-green-100 text-green-800';
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Recusado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const statusOptions = ['Todos', 'Aprovado', 'Pendente', 'Recusado'];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {showTopCustomers ? 'Top 15 Clientes' : 'Vendas Recentes'}
        </h3>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showTopCustomers}
              onChange={(e) => setShowTopCustomers(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            Exibir Ranking de clientes
          </label>
          {!showTopCustomers && (
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-sm text-blue-600 bg-transparent border border-blue-200 rounded px-2 py-1 font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {showTopCustomers ? (
        <TopCustomersChart />
      ) : (
        <>
          <div className="mb-4 text-sm text-gray-600">
            Exibindo {filteredInvoices.length} de {sortedInvoices.length} vendas
            {statusFilter !== 'Todos' && ` - Status: ${statusFilter}`}
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {loading ? (
              <div className="text-center py-8 text-gray-500">Carregando...</div>
            ) : filteredInvoices.length > 0 ? (
              filteredInvoices.map((invoice, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-gray-50 last:border-b-0"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={invoice.customerAvatar}
                      alt={invoice.customerName}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{invoice.customerName}</p>
                      <p className="text-xs text-gray-500">{invoice.itemName}</p>
                      <p className="text-xs text-gray-400">{invoice.customerEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-900">{invoice.orderDate}</p>
                      <p className="text-xs text-gray-500">{invoice.id}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        invoice.status
                      )}`}
                    >
                      {invoice.status}
                    </span>
                    <p className="text-sm font-semibold text-gray-900 min-w-[80px] text-right">
                      <span className="mr-4">
                        {Number(invoice.price).toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                Nenhuma fatura encontrada para o status "{statusFilter}"
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default RecentInvoices;