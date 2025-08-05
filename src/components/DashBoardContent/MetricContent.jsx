import { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { fetchMetrics, fetchUserCount, fetchMetricsPDF } from '../../services/metricService';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const cardStyle = "bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center min-w-[180px]";
const pieColors = ['#FAC032', '#558EFF', '#FF6384', '#4BC0C0', '#9966FF', '#FF9F40'];

const MetricContent = () => {
  const [metrics, setMetrics] = useState(null);
  const [userCount, setUserCount] = useState('-');

  useEffect(() => {
    fetchMetrics()
      .then(data => {
        setMetrics(data),
          console.log('Métricas:', data);
      })
      .catch(err => console.error('Erro ao buscar métricas:', err));

    fetchUserCount()
      .then(count => setUserCount(count))
      .catch(err => console.error('Erro ao buscar total de clientes:', err));
  }, []);

  if (!metrics) return <div>Carregando...</div>;

  const cards = [
    {
      label: 'Receita Anual',
      value: metrics?.annualRevenue
        ? metrics.annualRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        : '-'
    },
    {
      label: 'Receita Mensal',
      value: metrics?.monthlyRevenue
        ? metrics.monthlyRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        : '-'
    },
    {
      label: 'Total de Clientes',
      value: userCount && userCount !== '-' ? userCount : '-'
    },
    {
      label: 'Total de Vendas Aprovadas',
      value: metrics?.salesByStatus?.find(s => s.status === 'Aprovado')?.totalSales ?? '-'
    }
  ];

  const handleDownloadPDF = async () => {
    try {
      const blob = await fetchMetricsPDF();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'metricas.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Erro ao baixar PDF');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  function renderPieChart(title, dataArr, labelKey, valueKey, idx) {
    const labels = dataArr.map(item => item[labelKey]);
    const values = dataArr.map(item => item[valueKey]);
    return (
      <div className="w-full md:w-1/2 lg:w-1/3 p-4" key={`pie-${idx}`}>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <Pie
          data={{
            labels,
            datasets: [{
              data: values,
              backgroundColor: pieColors.slice(0, dataArr.length),
            }]
          }}
        />
      </div>
    );
  }

  function renderStackedBarChart(title, dataArr, idx) {
    const destinations = [...new Set(dataArr.map(item => item.destination))];
    const methods = [...new Set(dataArr.map(item => item.method))];
    const datasets = methods.map((method, i) => ({
      label: method,
      data: destinations.map(dest =>
        dataArr.find(v => v.destination === dest && v.method === method)?.total || 0
      ),
      backgroundColor: pieColors[i % pieColors.length],
    }));

    return (
      <div className="w-full md:w-2/3 lg:w-1/2 p-4" key={`stacked-${idx}`}>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <Bar
          data={{
            labels: destinations,
            datasets: datasets,
          }}
          options={{
            responsive: true,
            plugins: { legend: { display: true } },
            scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } }
          }}
        />
      </div>
    );
  }

  function renderHorizontalBarChart(title, dataArr, labelKey, valueKey, idx) {
    const labels = dataArr.map(item => item[labelKey]);
    const values = dataArr.map(item => item[valueKey]);
    return (
      <div className="w-full md:w-2/3 lg:w-1/2 p-4" key={`horizontal-${idx}`}>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <Bar
          data={{
            labels,
            datasets: [{
              label: title,
              data: values,
              backgroundColor: pieColors.slice(0, dataArr.length),
            }]
          }}
          options={{
            indexAxis: 'y',
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { x: { beginAtZero: true } }
          }}
        />
      </div>
    );
  }

  function renderBarChart(title, dataArr, labelKey, valueKey, idx) {
    const labels = dataArr.map(item => item[labelKey]);
    const values = dataArr.map(item => item[valueKey]);
    return (
      <div className="w-full md:w-2/3 lg:w-1/2 p-4" key={`bar-${idx}`}>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <Bar
          data={{
            labels,
            datasets: [{
              label: title,
              data: values,
              backgroundColor: pieColors.slice(0, dataArr.length),
            }]
          }}
          options={{
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { x: { beginAtZero: true } }
          }}
        />
      </div>
    );
  }

  const charts = [];
  if (metrics?.mostUsedPaymentMethods?.length) {
    charts.push(
      renderPieChart(
        'Métodos de Pagamento Mais Usados',
        metrics.mostUsedPaymentMethods,
        'method',
        'total',
        0
      )
    );
  }
  if (metrics?.mostUsedPaymentMethodsByMonth?.length) {
    charts.push(
      renderPieChart(
        'Métodos de Pagamento por Mês',
        metrics.mostUsedPaymentMethodsByMonth,
        'method',
        'total',
        1
      )
    );
  }
  if (metrics?.mostUsedPaymentMethodsByDestination?.length) {
    charts.push(
      renderStackedBarChart(
        'Métodos de Pagamento por Destino',
        metrics.mostUsedPaymentMethodsByDestination,
        2
      )
    );
  }
  if (metrics?.revenueByDestination?.length) {
    charts.push(
      renderHorizontalBarChart(
        'Receita por Destino',
        metrics.revenueByDestination,
        'destination',
        'totalRevenue',
        3
      )
    );
  }
  if (metrics?.salesByDestination?.length) {
    charts.push(
      renderBarChart(
        'Vendas por Destino',
        metrics.salesByDestination,
        'destination',
        'totalSales',
        4
      )
    );
  }
  if (metrics?.salesByPeriod?.length) {
    charts.push(
      renderBarChart(
        'Vendas por Período',
        metrics.salesByPeriod,
        'period',
        'totalSales',
        5
      )
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* CARDS */}
      <div id="print-area" className="flex gap-6 mb-8 flex-wrap justify-center">
        {cards.map(card => (
          <div className={cardStyle} key={card.label}>
            <span className="text-gray-500 text-sm">{card.label}</span>
            <span className="text-2xl font-bold mt-2">{card.value}</span>
          </div>
        ))}
      </div>

      {/* BOTÕES */}
      <div className="flex gap-4 mb-6">
        <button
          className="px-4 py-2 rounded bg-blue-500 text-white font-semibold shadow hover:bg-blue-600"
          onClick={handleDownloadPDF}
        >
          Baixar PDF das Métricas
        </button>
        <button
          className="px-4 py-2 rounded bg-green-500 text-white font-semibold shadow hover:bg-green-600"
          onClick={handlePrint}
        >
          Imprimir Cards e Gráficos
        </button>
      </div>

      {/* GRÁFICOS */}
      <div className="flex flex-wrap justify-center">
        {charts}
      </div>
    </div>
  );

};

export default MetricContent;