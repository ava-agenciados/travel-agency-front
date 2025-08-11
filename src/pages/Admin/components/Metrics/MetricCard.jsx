import React from 'react';

const MetricCard = ({ title, value, change, changeType, icon }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-green-500';
    if (changeType === 'negative') return 'text-red-500';
    return 'text-gray-500';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return '↗';
    if (changeType === 'negative') return '↘';
    return '→';
  };

  // Centralizar e diminuir fonte para os três primeiros cards
  // Usar text-xl para valor e text-center para todo conteúdo
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-600 text-sm font-medium">{title}</span>
        {icon && (
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-gray-900 text-center mb-1">{value}</span>
        {change && (
          <div className={`flex items-center text-sm ${getChangeColor()} justify-center`}>
            <span className="mr-1">{getChangeIcon()}</span>
            <span>{change}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
