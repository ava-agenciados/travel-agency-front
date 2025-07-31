
import React, { useState } from 'react';
import PasswordField from '../PasswordField/PasswordField';


const CreditCardForm = ({ fields, setFields }) => {
  const [documentType, setDocumentType] = useState('CPF');
  // Máscara e validação para CPF
  function formatCPF(value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .slice(0, 14);
  }

  // Impede números no nome
  function handleNameChange(e) {
    const value = e.target.value.replace(/\d/g, '');
    setFields(f => ({ ...f, cardName: value }));
  }

  // Limita e formata número do cartão
  function handleCardNumberChange(e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.slice(0, 16);
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setFields(f => ({ ...f, cardNumber: value }));
  }

  // Validação de vencimento
  function handleExpiryChange(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) value = value.replace(/(\d{2})(\d{1,2})/, '$1/$2');
    setFields(f => ({ ...f, expiry: value }));
  }

  // Só permite números no CVV
  function handleCvvChange(e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.slice(0, 4);
    setFields(f => ({ ...f, cvv: value }));
  }

  // Máscara para CPF
  function handleDocumentChange(e) {
    let value = e.target.value;
    if (documentType === 'CPF') {
      value = formatCPF(value);
    }
    setFields(f => ({ ...f, document: value }));
  }

  return (
    <div className="w-full bg-white rounded-xl border border-blue-200 p-4 sm:p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-gray-700">Número do cartão</label>
        <input
          type="text"
          value={fields.cardNumber}
          onChange={handleCardNumberChange}
          placeholder="1234 1234 1234 1234"
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#F8F9FB] w-full"
          maxLength={19}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-gray-700">Nome do titular</label>
        <input
          type="text"
          value={fields.cardName}
          onChange={handleNameChange}
          placeholder="Ex.: Maria Lopes"
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#F8F9FB] w-full"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex flex-col flex-1 gap-2">
          <label className="text-xs font-semibold text-gray-700">Vencimento</label>
          <input
            type="text"
            value={fields.expiry}
            onChange={handleExpiryChange}
            placeholder="MM/AA"
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#F8F9FB] w-full"
            maxLength={5}
          />
        </div>
        <div className="flex flex-col flex-1 gap-2">
          <label className="text-xs font-semibold text-gray-700">Código de segurança</label>
          <PasswordField
            label="CVV"
            name="cvv"
            value={fields.cvv}
            onChange={handleCvvChange}
            placeholder="Ex.: 123"
            required={true}
            id="cvv"
            variant="light"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex flex-col flex-1 gap-2">
          <label className="text-xs font-semibold text-gray-700">Documento do titular</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              value={documentType}
              onChange={e => setDocumentType(e.target.value)}
              className="border border-gray-300 rounded px-2 py-2 text-sm bg-[#F8F9FB] focus:outline-none w-full sm:w-20"
            >
              <option>CPF</option>
              <option>CNPJ</option>
            </select>
            <input
              type="text"
              value={fields.document}
              onChange={handleDocumentChange}
              placeholder={documentType === 'CPF' ? '999.999.999-99' : '99.999.999/0001-99'}
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#F8F9FB] flex-1 w-full"
              maxLength={documentType === 'CPF' ? 14 : 18}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardForm;
