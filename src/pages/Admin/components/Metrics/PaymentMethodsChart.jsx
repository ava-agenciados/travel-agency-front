
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

const PaymentMethodsChart = () => {
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [bookingsRes, packagesRes] = await Promise.all([
          fetch('/api/v1/dashboard/bookings'),
          fetch('/api/v1/packages'),
        ]);
        const bookings = bookingsRes.ok ? await bookingsRes.json() : [];
        const packages = packagesRes.ok ? await packagesRes.json() : [];

        // Somar receita por método de pagamento
        const paymentStats = {};

        bookings.forEach(booking => {
          if (booking.status !== 'Aprovado') return;
          const paymentMethod = booking.payment?.[0]?.paymentMethod;
          if (!paymentMethod || paymentMethod === 'CartaoDebito') return;
          const pacote = packages.find(p => p.id === booking.packageId);
          const price = pacote?.price || 0;
          if (!paymentStats[paymentMethod]) {
            paymentStats[paymentMethod] = { usageCount: 0, totalValue: 0 };
          }
          paymentStats[paymentMethod].usageCount += 1;
          paymentStats[paymentMethod].totalValue += price;
        });

        const labels = Object.keys(paymentStats);
        const usageCounts = labels.map(method => paymentStats[method].usageCount);
        const totalValues = labels.map(method => paymentStats[method].totalValue);

        setChartData({
          labels,
          datasets: [
            {
              data: usageCounts,
              backgroundColor: colors.slice(0, labels.length),
              borderWidth: 0,
              totalValues,
            }
          ]
        });
      } catch (err) {
        setChartData(null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            const totalValue = context.dataset.totalValues?.[context.dataIndex] || 0;
            return `${label}: ${value} (${percentage}%)\nReceita total: ${totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
          }
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Métodos de Pagamento</h3>
      <div className="h-64 flex items-center justify-center">
        {loading || !chartData ? (
          <span className="text-gray-500">Carregando...</span>
        ) : (
          <Pie data={chartData} options={options} />
        )}
      </div>
    </div>
  );
};

export default PaymentMethodsChart;
