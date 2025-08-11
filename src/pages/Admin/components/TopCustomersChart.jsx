import React, { useState, useEffect } from 'react';

const TopCustomersChart = ({ isVisible = true, onClose }) => {
  const [customerStats, setCustomerStats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isVisible) {
      fetchTopCustomers();
    }
  }, [isVisible]);

  const fetchTopCustomers = async () => {
    setLoading(true);
    try {
      const [bookingsRes, packagesRes] = await Promise.all([
        fetch('/api/v1/dashboard/bookings'),
        fetch('/api/v1/packages'),
      ]);
      
      const bookingsData = bookingsRes.ok ? await bookingsRes.json() : [];
      const packagesData = packagesRes.ok ? await packagesRes.json() : [];

      // Filtrar apenas reservas aprovadas
      const approvedBookings = bookingsData.filter(booking => booking.status === 'Aprovado');

      // Agrupar por usuário e calcular estatísticas
      const customerMap = new Map();

      approvedBookings.forEach(booking => {
        const user = booking.contractingUser;
        if (!user) return;

        const userName = `${user.firstName} ${user.lastName}`;
        const userEmail = user.email;
        const packageInfo = packagesData.find(p => p.id === booking.packageId);
        const packagePrice = packageInfo?.price || 0;

        if (customerMap.has(userEmail)) {
          const existing = customerMap.get(userEmail);
          existing.totalPurchases += 1;
          existing.totalValue += packagePrice;
        } else {
          customerMap.set(userEmail, {
            name: userName,
            email: userEmail,
            totalPurchases: 1,
            totalValue: packagePrice,
          });
        }
      });

      // Converter para array e ordenar por quantidade de compras
      const sortedCustomers = Array.from(customerMap.values())
        .sort((a, b) => b.totalPurchases - a.totalPurchases)
        .slice(0, 15); // Top 15

      setCustomerStats(sortedCustomers);
    } catch (err) {
      console.error('Erro ao buscar dados dos clientes:', err);
      setCustomerStats([]);
    } finally {
      setLoading(false);
    }
  };

  const maxPurchases = Math.max(...customerStats.map(c => c.totalPurchases), 1);

  if (!isVisible) return null;

  // Se onClose não foi fornecido, renderiza inline (para uso no dashboard)
  if (!onClose) {
    return (
      <div className="w-full">
        <div className="mb-4">
          {/* <h4 className="text-lg font-semibold text-gray-900 mb-2">
            Top 15 Clientes - Compras Aprovadas
          </h4> */}
          <p className="text-sm text-gray-600">
            Ranking dos clientes com mais compras aprovadas
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 mt-4">Carregando dados...</p>
            </div>
          </div>
        ) : customerStats.length > 0 ? (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {customerStats.map((customer, index) => (
              <div key={customer.email} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-blue-600">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                    <p className="text-xs text-gray-500">{customer.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      {customer.totalPurchases} compra{customer.totalPurchases !== 1 ? 's' : ''}
                    </p>
                    <p className="text-xs text-gray-500">
                      {customer.totalValue.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </p>
                  </div>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(customer.totalPurchases / maxPurchases) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            Nenhum cliente com compras aprovadas encontrado
          </div>
        )}
      </div>
    );
  }

  // Renderização modal (versão original)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mt-1">
                Ranking dos clientes com mais compras aprovadas desde o início
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-500 mt-4">Carregando dados...</p>
              </div>
            </div>
          ) : customerStats.length > 0 ? (
            <div className="space-y-6">
              {/* Legenda */}
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span>Quantidade de Compras</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Valor Total (R$)</span>
                </div>
              </div>

              {/* Gráfico */}
              <div className="space-y-4">
                {customerStats.map((customer, index) => (
                  <div key={customer.email} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{customer.name}</p>
                          <p className="text-xs text-gray-500">{customer.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">
                          {customer.totalPurchases} compra{customer.totalPurchases !== 1 ? 's' : ''}
                        </p>
                        <p className="text-xs text-green-600 font-medium">
                          {customer.totalValue.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Barra de progresso para compras */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>Compras</span>
                        <span>{customer.totalPurchases}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${(customer.totalPurchases / maxPurchases) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Barra de progresso para valor */}
                    <div className="space-y-2 mt-3">
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>Valor Total</span>
                        <span>
                          {customer.totalValue.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${(customer.totalValue / Math.max(...customerStats.map(c => c.totalValue))) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Resumo */}
              <div className="bg-blue-50 rounded-lg p-4 mt-6">
                <h3 className="font-medium text-blue-900 mb-2">Resumo Geral</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-blue-600 font-medium">Total de Clientes</p>
                    <p className="text-blue-900 font-semibold">{customerStats.length}</p>
                  </div>
                  <div>
                    <p className="text-blue-600 font-medium">Total de Compras</p>
                    <p className="text-blue-900 font-semibold">
                      {customerStats.reduce((sum, c) => sum + c.totalPurchases, 0)}
                    </p>
                  </div>
                  <div>
                    <p className="text-blue-600 font-medium">Valor Total</p>
                    <p className="text-blue-900 font-semibold">
                      {customerStats.reduce((sum, c) => sum + c.totalValue, 0).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-blue-600 font-medium">Média por Cliente</p>
                    <p className="text-blue-900 font-semibold">
                      {(customerStats.reduce((sum, c) => sum + c.totalPurchases, 0) / customerStats.length).toFixed(1)} compras
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-6a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">Nenhum dado encontrado</p>
              <p className="text-gray-400 text-sm mt-2">
                Não há compras aprovadas para exibir no ranking
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopCustomersChart;
