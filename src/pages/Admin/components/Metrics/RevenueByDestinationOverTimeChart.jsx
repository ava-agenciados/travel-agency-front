import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
Chart.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

// Espera props: salesByPeriod, revenueByDestination
const RevenueByDestinationOverTimeChart = ({ salesByPeriod, revenueByDestination }) => {
  // Extrai todos os destinos
  const destinos = revenueByDestination.map(d => d.destination);
  // Extrai todos os períodos (YYYY-MM)
  const periodos = salesByPeriod.map(p => p.period);

  // Gera dados fake para cada destino por período (exemplo: divide receita total do destino igualmente entre os períodos)
  // Em produção, o ideal é ter a receita por destino e por período vinda da API
  const receitasPorDestinoPorPeriodo = destinos.map(destino => {
    const receitaTotal = revenueByDestination.find(d => d.destination === destino)?.revenue || 0;
    const receitaPorPeriodo = Array(periodos.length).fill(Math.round(receitaTotal / periodos.length));
    return receitaPorPeriodo;
  });

  const colors = [
    '#3B82F6', '#EF4444', '#F59E0B', '#10B981', '#6366F1', '#F472B6', '#FBBF24', '#6EE7B7', '#A78BFA', '#F87171', '#34D399', '#818CF8'
  ];

  const data = {
    labels: periodos,
    datasets: destinos.map((destino, idx) => ({
      label: destino,
      data: receitasPorDestinoPorPeriodo[idx],
      borderColor: colors[idx % colors.length],
      backgroundColor: colors[idx % colors.length] + '33',
      tension: 0.3,
      fill: false,
      pointRadius: 4,
      pointHoverRadius: 6,
    }))
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Evolução da Receita por Destino',
        font: { size: 18 }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: R$ ${context.parsed.y.toLocaleString('pt-BR')}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: value => 'R$ ' + value.toLocaleString('pt-BR')
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <Line data={data} options={options} height={320} />
    </div>
  );
};

export default RevenueByDestinationOverTimeChart;
