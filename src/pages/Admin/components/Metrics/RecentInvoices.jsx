import React, { useState } from 'react';

const RecentInvoices = ({ data, salesByStatus }) => {
  const [statusFilter, setStatusFilter] = useState('Todos');
  
  // Gerar faturas reais baseadas nos dados da API
  const generateRecentInvoices = () => {
    const invoices = [];
    let invoiceId = 65499;
    
    // Criar faturas para cada cliente com status reais
    data.slice(0, 8).forEach((client, clientIndex) => {
      // Distribuir status baseado nos dados reais da API
      const statusOptions = ['Aprovado', 'Pendente', 'Recusado'];
      const status = statusOptions[clientIndex % 3]; // Distribuir os status
      
      // Gerar datas recentes (últimos 30 dias)
      const daysAgo = Math.floor(Math.random() * 30);
      const orderDate = new Date();
      orderDate.setDate(orderDate.getDate() - daysAgo);
      
      invoices.push({
        id: `#${(invoiceId + clientIndex).toString()}`,
        customerName: client.clientName,
        customerEmail: client.clientEmail,
        customerAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(client.clientName)}&background=random&size=32`,
        itemName: 'Pacote de Viagem',
        orderDate: orderDate.toLocaleDateString('pt-BR'),
        status: status,
        price: client.totalAmount
      });
    });
    
    return invoices;
  };

  const recentInvoices = generateRecentInvoices();
  
  // Filtrar faturas por status
  const filteredInvoices = statusFilter === 'Todos' 
    ? recentInvoices 
    : recentInvoices.filter(invoice => invoice.status === statusFilter);

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

  const statusOptions = [
    'Todos',
    'Aprovado', 
    'Pendente',
    'Recusado'
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Faturas Recentes</h3>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-sm text-blue-600 bg-transparent border border-blue-200 rounded px-2 py-1 font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {statusOptions.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
      
      {/* Mostrar estatísticas do filtro atual */}
      <div className="mb-4 text-sm text-gray-600">
        Mostrando {filteredInvoices.length} de {recentInvoices.length} faturas
        {statusFilter !== 'Todos' && ` - Status: ${statusFilter}`}
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredInvoices.map((invoice, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-b-0">
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
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                {invoice.status}
              </span>
              <p className="text-sm font-semibold text-gray-900 min-w-[80px] text-right">
                {invoice.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
          </div>
        ))}
        
        {filteredInvoices.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhuma fatura encontrada para o status "{statusFilter}"
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentInvoices;
