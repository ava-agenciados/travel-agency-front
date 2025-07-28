import { useState } from 'react';
import CreditCardForm from './CreditCardForm';

const PaymentMethods = () => {
  const [paymentMethod, setPaymentMethod] = useState('credit');

  return (
    <div className="flex-1 bg-white rounded-xl shadow p-6">
      <button
        className="flex items-center gap-2 mb-6 text-[#223A5F] text-2xl font-bold hover:underline focus:outline-none"
        style={{ background: 'none', border: 'none', padding: 0, boxShadow: 'none' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 19L8 12L15 5" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Voltar para revisão
      </button>
      <h2 className="text-base font-bold mb-4">Dados do pagamento</h2>
      <div className="space-y-3">
        {/* Cartão de crédito */}
        <div className={`border rounded-lg p-3 flex flex-col gap-2 ${paymentMethod === 'credit' ? 'border-blue-600 bg-blue-50' : ''}`}>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="payment"
              className="accent-blue-600"
              checked={paymentMethod === 'credit'}
              onChange={() => setPaymentMethod('credit')}
            />
            Cartão de crédito
            <span className="flex gap-1 ml-2">
              <img src="https://img.icons8.com/color/24/000000/visa.png" alt="Visa" />
              <img src="https://img.icons8.com/color/24/000000/mastercard-logo.png" alt="Mastercard" />
              <img src="https://img.icons8.com/color/24/000000/amex.png" alt="Amex" />
            </span>
          </label>
          <button className="bg-yellow-400 text-xs font-bold rounded px-2 py-1 w-fit">12x disponível</button>
          {paymentMethod === 'credit' && (
            <div className="mt-2">
              <CreditCardForm />
            </div>
          )}
        </div>
        {/* Pix */}
        <div className={`border rounded-lg p-3 flex items-center justify-between ${paymentMethod === 'pix' ? 'border-blue-600 bg-blue-50' : ''}`}>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="payment"
              className="accent-blue-600"
              checked={paymentMethod === 'pix'}
              onChange={() => setPaymentMethod('pix')}
            />
            Pix
          </label>
          <button className="bg-yellow-400 text-xs font-bold rounded px-2 py-1">5% Desconto</button>
        </div>
        {/* Boleto */}
        <div className={`border rounded-lg p-3 flex items-center justify-between ${paymentMethod === 'boleto' ? 'border-blue-600 bg-blue-50' : ''}`}>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="payment"
              className="accent-blue-600"
              checked={paymentMethod === 'boleto'}
              onChange={() => setPaymentMethod('boleto')}
            />
            Boleto
          </label>
          <button className="bg-yellow-400 text-xs font-bold rounded px-2 py-1">15x disponível</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
