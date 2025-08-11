import React from 'react';

const ResponsibleForm = ({ responsible, handleResponsibleChange, handleAddCompanion, children }) => (
  <div className="bg-white rounded-xl shadow p-6 mb-4 border border-gray-200">
    <h2 className="text-lg font-bold mb-4 text-[#223A5F]">Dados da pessoa responsável</h2>
    {/* Mobile-first: 1 coluna, sm: 2 colunas */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Nome */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          value={responsible.firstName}
          onChange={e => handleResponsibleChange('firstName', e.target.value)}
          placeholder="Nome"
        />
      </div>
      {/* Sobrenome */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Sobrenome</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          value={responsible.lastName}
          onChange={e => handleResponsibleChange('lastName', e.target.value)}
          placeholder="Sobrenome"
        />
      </div>
      {/* CPF ou Passaporte */}
      <div>
        <label className="block text-sm font-medium text-gray-700">CPF ou Passaporte</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          value={responsible.cpfPassport}
          onChange={e => handleResponsibleChange('cpfPassport', e.target.value)}
          placeholder="CPF ou Passaporte"
        />
      </div>
      {/* Telefone */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Telefone</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          value={responsible.phoneNumber}
          onChange={e => handleResponsibleChange('phoneNumber', e.target.value)}
          placeholder="Telefone"
        />
      </div>
      {/* Checkbox - ocupa toda a largura */}
      <div className="col-span-1 sm:col-span-2 flex items-center mt-2">
        <input
          id="isForeigner-responsible"
          type="checkbox"
          checked={responsible.isForeigner}
          onChange={e => handleResponsibleChange('isForeigner', e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="isForeigner-responsible" className="text-sm text-gray-700">Sou estrangeiro</label>
      </div>
    </div>
    {/* Botão adicionar acompanhante */}
    <div className="flex justify-end mt-4">
      {children}
    </div>
  </div>
);

export default ResponsibleForm;
