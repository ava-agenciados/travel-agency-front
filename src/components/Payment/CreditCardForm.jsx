
import React, { useState } from 'react';

const CreditCardForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [documentType, setDocumentType] = useState('CPF');
  const [document, setDocument] = useState('');

  return (
    <div className="w-full bg-white rounded-xl border border-blue-200 p-4 sm:p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-gray-700">Número do cartão</label>
        <input
          type="text"
          value={cardNumber}
          onChange={e => setCardNumber(e.target.value)}
          placeholder="1234 1234 1234 1234"
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#F8F9FB] w-full"
          maxLength={19}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-gray-700">Nome do titular</label>
        <input
          type="text"
          value={cardName}
          onChange={e => setCardName(e.target.value)}
          placeholder="Ex.: Maria Lopes"
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#F8F9FB] w-full"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex flex-col flex-1 gap-2">
          <label className="text-xs font-semibold text-gray-700">Vencimento</label>
          <input
            type="text"
            value={expiry}
            onChange={e => setExpiry(e.target.value)}
            placeholder="MM/AA"
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#F8F9FB] w-full"
            maxLength={5}
          />
        </div>
        <div className="flex flex-col flex-1 gap-2">
          <label className="text-xs font-semibold text-gray-700">Código de segurança</label>
          <input
            type="password"
            value={cvv}
            onChange={e => setCvv(e.target.value)}
            placeholder="Ex.: 123"
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#F8F9FB] w-full"
            maxLength={4}
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
              value={document}
              onChange={e => setDocument(e.target.value)}
              placeholder={documentType === 'CPF' ? '999.999.999-99' : '99.999.999/0001-99'}
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#F8F9FB] flex-1 w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardForm;
