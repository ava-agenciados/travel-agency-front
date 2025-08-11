import React from 'react';
import { Bar } from 'react-chartjs-2';

const MonthlyPaymentChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.paymentMethod),
    datasets: [
      {
        label: 'Uso no Mês',
        data: data.map(item => item.usageCount),
        backgroundColor: [
          '#3B82F6',
          '#10B981', 
          '#F59E0B',
          '#EF4444'
        ],
        borderRadius: 6,
        borderSkipped: false,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        callbacks: {
          label: function(context) {
            const value = context.parsed.y;
            const dataPoint = data[context.dataIndex];
            return [
              `Usos: ${value}`,
              `Valor: ${dataPoint.totalAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
            ];
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        border: {
          display: false
        },
        ticks: {
          maxRotation: 45,
          minRotation: 0
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        border: {
          display: false
        },
        ticks: {
          beginAtZero: true
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Pagamentos Mensais</h3>
      <div className="h-80">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default MonthlyPaymentChart;
