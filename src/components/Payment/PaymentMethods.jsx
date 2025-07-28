import { useState } from 'react';
import CreditCardForm from './CreditCardForm';

const PaymentMethods = () => {
  const [paymentMethod, setPaymentMethod] = useState('credit');

  return (
    <div className="flex-1 bg-white rounded-xl shadow p-4 sm:p-6">
      <button
        className="flex items-center gap-2 mb-4 sm:mb-6 text-[#223A5F] text-lg sm:text-2xl font-bold hover:underline focus:outline-none"
        style={{ background: 'none', border: 'none', padding: 0, boxShadow: 'none' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 19L8 12L15 5" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-sm sm:text-base">Voltar para revisão</span>
      </button>
      <h2 className="text-sm sm:text-base font-bold mb-4">Dados do pagamento</h2>
      <div className="space-y-3">
        {/* Cartão de crédito */}
        <div className={`border rounded-lg p-3 flex flex-col gap-2 ${paymentMethod === 'credit' ? 'border-blue-600 bg-blue-50' : ''}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="flex items-center gap-2 cursor-pointer flex-wrap">
              <input
                type="radio"
                name="payment"
                className="accent-blue-600"
                checked={paymentMethod === 'credit'}
                onChange={() => setPaymentMethod('credit')}
              />
              <span className="text-sm sm:text-base">Cartão de crédito</span>
              <span className="flex gap-1">
                <img src="https://img.icons8.com/color/20/000000/visa.png" alt="Visa" className="w-5 h-5 sm:w-6 sm:h-6" />
                <img src="https://img.icons8.com/color/20/000000/mastercard-logo.png" alt="Mastercard" className="w-5 h-5 sm:w-6 sm:h-6" />
                <img src="https://img.icons8.com/color/20/000000/amex.png" alt="Amex" className="w-5 h-5 sm:w-6 sm:h-6" />
              </span>
            </label>
            <button className="bg-yellow-400 text-xs font-bold rounded px-2 py-1 w-fit self-start sm:self-center">12x disponível</button>
          </div>
          {paymentMethod === 'credit' && (
            <div className="mt-2">
              <CreditCardForm />
            </div>
          )}
        </div>
        {/* Pix */}
        <div className={`border rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${paymentMethod === 'pix' ? 'border-blue-600 bg-blue-50' : ''}`}>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="payment"
              className="accent-blue-600"
              checked={paymentMethod === 'pix'}
              onChange={() => setPaymentMethod('pix')}
            />
            <span className="text-sm sm:text-base">Pix</span>
          </label>
          <button className="bg-yellow-400 text-xs font-bold rounded px-2 py-1 w-fit self-start sm:self-center">5% Desconto</button>
        </div>
        {/* Boleto */}
        <div className={`border rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${paymentMethod === 'boleto' ? 'border-blue-600 bg-blue-50' : ''}`}>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="payment"
              className="accent-blue-600"
              checked={paymentMethod === 'boleto'}
              onChange={() => setPaymentMethod('boleto')}
            />
            <span className="text-sm sm:text-base">Boleto</span>
          </label>
          <button className="bg-yellow-400 text-xs font-bold rounded px-2 py-1 w-fit self-start sm:self-center">15x disponível</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
