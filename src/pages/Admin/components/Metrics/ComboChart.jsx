import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ComboChart = ({ salesByPeriod, salesByClient, totalRevenue }) => {
  // Calcular métricas
  const totalSales = salesByPeriod.reduce((sum, item) => sum + item.totalAmount, 0);
  const totalClients = salesByClient.length;
  const avgTicket = totalClients > 0 ? totalSales / totalClients : 0;

  // Dados do gráfico de barras (usar períodos)
  const chartData = {
    labels: salesByPeriod.map(item => {
      const [year, month] = item.period.split('-');
      const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      return monthNames[parseInt(month) - 1];
    }),
    datasets: [{
      data: salesByPeriod.map(item => item.totalAmount),
      backgroundColor: '#3B82F6',
      borderRadius: 4,
      borderSkipped: false,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#374151',
        titleColor: '#F9FAFB',
        bodyColor: '#F9FAFB',
        callbacks: {
          label: function(context) {
            return `R$ ${context.parsed.y.toLocaleString('pt-BR')}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#6B7280', font: { size: 12 } }
      },
      y: {
        display: false,
        grid: { display: false }
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Visão geral das vendas e métricas principais</h3>
      </div>

      {/* Valor principal */}
      <div className="mb-6">

        <p className="text-sm text-gray-500 mt-1">Total do período analisado</p>
      </div>

      {/* Gráfico de barras */}
      <div className="h-32 mb-6">
        <Bar data={chartData} options={options} />
      </div>

      {/* Cards de métricas inferiores */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-2xl font-bold text-gray-900">
            {totalSales.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          <p className="text-sm text-gray-600">Vendas</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">
            {avgTicket.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          <p className="text-sm text-gray-600">Ticket Médio</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{totalClients}</p>
          <p className="text-sm text-gray-600">Clientes</p>
        </div>
      </div>
    </div>
  );
};

export default ComboChart;
