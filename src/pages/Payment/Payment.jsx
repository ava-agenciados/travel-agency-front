import { useState } from 'react';
import CreditCardForm from '../../components/Payment/CreditCardForm';

import NavBar from '../../components/Navbar/NavBar';
import Footer from '../../components/Footer/Footer';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('credit');

  return (
    <div className="min-h-screen flex flex-col bg-[#EBECF0]">
      <NavBar />
      <main className="flex-1 flex flex-col items-center py-8 px-2">
        {/* Etapas do pagamento */}
        <div className="flex justify-center items-center gap-12 mb-10">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div className={`rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold border-2 ${step === 3 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-600'}`}>{step}</div>
              <span className="mt-2 text-xs text-gray-700 font-semibold">
                {step === 1 && 'Escolha do pacote'}
                {step === 2 && 'Revisão'}
                {step === 3 && 'Finalizar pagamento'}
              </span>
            </div>
          ))}
        </div>

        {/* Container principal do conteúdo */}
        <div className="w-full max-w-7xl flex flex-col md:flex-row gap-8">
          {/* Coluna esquerda: métodos de pagamento */}
          <div className="flex-1 bg-white rounded-xl shadow p-6 min-w-[340px]">
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
            {/* Métodos de pagamento */}
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

          {/* Coluna direita: detalhes do pacote e resumo */}
          <div className="flex flex-col gap-6 w-full md:w-[350px]">
            {/* Detalhes do pacote - layout igual ao exemplo */}
            <div className="bg-white rounded-xl shadow p-0 flex flex-col overflow-hidden border border-gray-200">
              {/* Banner amarelo */}
              <div className="bg-[#FFB800] px-3 py-1 w-fit rounded-br-lg rounded-tl-lg text-xs font-bold absolute mt-2 ml-2 z-10">Detalhes do pacote</div>
              <div className="relative">
                <img src="/src/assets/images/bg_herosection.png" alt="Pacote" className="w-full h-28 object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-base font-bold text-[#223A5F] mb-1">Lorem ipsum sit amet delok sit amet dolok</h3>
                <p className="text-sm text-gray-600 leading-snug">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia porro magni quaerat nostrum excepturi. Quasi qui veniam iusto molestias beatae, iste eius voluptatum consectetur et...</p>
              </div>
            </div>
            {/* Resumo */}
            <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
              <h4 className="text-sm font-bold mb-2">Resumo</h4>
              <div className="flex flex-col gap-1 text-xs">
                <div className="flex justify-between"><span>Pacote</span><span>1.200</span></div>
                <div className="flex justify-between"><span>Impostos</span><span>34,65</span></div>
                <div className="flex justify-between"><span className="text-blue-600 cursor-pointer hover:underline">Cupons</span><span className="text-blue-600">DECOLA6</span></div>
                <div className="flex justify-between"><span className="text-blue-600 cursor-pointer hover:underline">Desconto no pix</span><span className="text-blue-600">-48,66</span></div>
                <div className="flex justify-between"><span className="text-blue-600">-300,00</span></div>
              </div>
              <div className="flex justify-between font-bold text-base mt-2">
                <span>Total</span>
                <span>868,34</span>
              </div>
              <button className="mt-4 bg-[#223A5F] text-white font-bold rounded-lg py-2">Confirmar pedido</button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;
