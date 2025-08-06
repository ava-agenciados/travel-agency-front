



// // -=-=-=-=-=-=-=-=-=- cards funcionando

// import { useEffect, useState } from 'react';
// import { Bar, Pie } from 'react-chartjs-2';
// import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// import { fetchMetrics, fetchUserCount, fetchMetricsPDF } from '../../services/metricService';

// // Registro dos elementos do Chart.js (necessário para Pie/Bar)
// Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// const cardStyle = "bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center min-w-[180px]";

// const MetricContent = () => {
//   const [metrics, setMetrics] = useState(null);
//   const [userCount, setUserCount] = useState('-');

//   useEffect(() => {
//     fetchMetrics()
//       .then(data => {
//         setMetrics(data),
//           console.log('Métricas:', data);
//       })
//       .catch(err => console.error('Erro ao buscar métricas:', err));

//     fetchUserCount()
//       .then(count => setUserCount(count))
//       .catch(err => console.error('Erro ao buscar total de clientes:', err));
//   }, []);

//   if (!metrics) return <div>Carregando...</div>;

//   const cards = [
//     {
//       label: 'Receita Anual',
//       value: metrics?.annualRevenue
//         ? metrics.annualRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
//         : '-'
//     },
//     {
//       label: 'Receita Mensal',
//       value: metrics?.monthlyRevenue
//         ? metrics.monthlyRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
//         : '-'
//     },
//     {
//       label: 'Total de Clientes',
//       value: userCount && userCount !== '-' ? userCount : '-'
//     },
//     {
//       label: 'Total de Vendas Aprovadas',
//       value: metrics?.salesByStatus?.find(s => s.status === 'Aprovado')?.totalSales ?? '-'
//     }
//   ];
  
//   function renderChart(key, arr, labelKey = 'label', valueKey = 'value') {
//     const labels = arr.map(item => item[labelKey]);
//     const values = arr.map(item => item[valueKey]);
//     const colors = [
//       '#FAC032', '#558EFF', '#FF6384', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF', '#B2FF66', '#FF66B2', '#66FFB2'
//     ];

//     if (arr.length <= 4) {
//       // Pie chart
//       return (
//         <div className="w-full md:w-1/2 lg:w-1/3 p-4" key={key}>
//           <h3 className="text-lg font-semibold mb-2">{key}</h3>
//           <Pie
//             data={{
//               labels,
//               datasets: [{
//                 data: values,
//                 backgroundColor: colors.slice(0, arr.length),
//               }]
//             }}
//           />
//         </div>
//       );
//     }
//   }
//   const charts = [];
//   for (const [key, value] of Object.entries(metrics)) {
//     if (Array.isArray(value) && value.length > 0) {
//       // Tenta detectar os campos label/value
//       const labelKey = Object.keys(value[0]).find(k => k.toLowerCase().includes('label') || k.toLowerCase().includes('name') || k.toLowerCase().includes('method') || k.toLowerCase().includes('destination') || k.toLowerCase().includes('client') || k.toLowerCase().includes('period') || k.toLowerCase().includes('status'));
//       const valueKey = Object.keys(value[0]).find(k => k.toLowerCase().includes('value') || k.toLowerCase().includes('total') || k.toLowerCase().includes('amount') || k.toLowerCase().includes('sales') || k.toLowerCase().includes('revenue'));
//       charts.push(renderChart(key, value, labelKey || 'label', valueKey || 'value'));
//     }
//   }

//   // Botão para baixar PDF
//   const handleDownloadPDF = async () => {
//     try {
//       const blob = await fetchMetricsPDF();
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = 'metricas.pdf';
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       alert('Erro ao baixar PDF');
//     }
//   };

//   // Botão para imprimir apenas cards e gráficos
//   const handlePrint = () => {
//     window.print();
//   };


//   return (
//     <div className="w-full flex flex-col items-center" style={{ marginTop: '60%' }}>
//       {/* Cards logo abaixo do navbar, com espaçamento superior responsivo */}
//       <div
//         id="print-area"
//         className="w-full flex flex-col sm:flex-row flex-wrap justify-center items-stretch gap-4 mt-4 px-2"
//         style={{ maxWidth: '1200px' }}
//       >
//         {cards.map(card => (
//           <div
//             className={cardStyle + ' w-full sm:w-[45%] md:w-[22%] min-w-[160px] max-w-xs m-0'}
//             key={card.label}
//             style={{ margin: '0 8px 8px 8px' }}
//           >
//             <span className="text-gray-500 text-sm text-center w-full block">{card.label}</span>
//             <span className="text-2xl font-bold mt-2 text-center w-full block">{card.value}</span>
//           </div>
//         ))}
//       </div>
//       {/* Botões de ação logo abaixo dos cards */}
//       <div className="flex flex-wrap gap-4 mb-8 mt-4 justify-center w-full px-2" style={{ maxWidth: '1200px' }}>
//         <button
//           className="px-4 py-2 rounded bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 w-full sm:w-auto"
//           onClick={handleDownloadPDF}
//         >
//           Baixar PDF das Métricas
//         </button>
//         <button
//           className="px-4 py-2 rounded bg-green-500 text-white font-semibold shadow hover:bg-green-600 w-full sm:w-auto"
//           onClick={handlePrint}
//         >
//           Imprimir Cards e Gráficos
//         </button>
//       </div>
//       {/* Gráficos responsivos */}
//       <div className="flex flex-wrap w-full justify-center gap-4 md:gap-8">
//         {charts.length > 0 ? charts : <div>Nenhum gráfico disponível</div>}
//       </div>
//     </div>
//   );
// };

// export default MetricContent;