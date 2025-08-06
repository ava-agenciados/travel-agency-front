import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const InvoiceStatistics = ({ salesByStatus }) => {
  const totalInvoices = salesByStatus.reduce((sum, item) => sum + item.totalSales, 0);
  
  const pieData = {
    labels: ['Pagos', 'Vencidos', 'Pendentes'],
    datasets: [{
      data: [
        salesByStatus.find(s => s.status === 'Aprovado')?.totalSales || 0,
        salesByStatus.find(s => s.status === 'Recusado')?.totalSales || 0,
        salesByStatus.find(s => s.status === 'Pendente')?.totalSales || 0
      ],
      backgroundColor: ['#3B82F6', '#EF4444', '#F59E0B'],
      borderWidth: 0,
      cutout: '70%'
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.parsed;
            const percentage = ((value / totalInvoices) * 100).toFixed(1);
            return `${context.label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  const stats = [
    {
      label: 'Total Pago',
      value: salesByStatus.find(s => s.status === 'Aprovado')?.totalSales || 0,
      color: 'text-blue-600'
    },
    {
      label: 'Total Recusado',
      value: salesByStatus.find(s => s.status === 'Recusado')?.totalSales || 0,
      color: 'text-red-600'
    },
    {
      label: 'Total Pendente',
      value: salesByStatus.find(s => s.status === 'Pendente')?.totalSales || 0,
      color: 'text-yellow-600'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Estatísticas de Faturas</h3>
      
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-40 h-40">
          <Doughnut data={pieData} options={options} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-gray-900">{totalInvoices}</span>
            <span className="text-sm text-gray-500">Faturas</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${
                index === 0 ? 'bg-blue-500' : 
                index === 1 ? 'bg-red-500' : 'bg-yellow-500'
              }`}></div>
              <span className="text-sm text-gray-600">{stat.label}</span>
            </div>
            <span className={`text-sm font-semibold ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoiceStatistics;
