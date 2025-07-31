import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreditCardPaymentFlow from './Flow/CreditCardPaymentFlow';
import ConfirmPayment from './ConfirmPayment';
import AuthRequiredModal from './Modals/AuthRequiredModal';
import RefusedModal from './Modals/RefusedModal';
import IconLoading from './Modals/IconLoading';

import { forwardRef, useImperativeHandle } from 'react';
import QrCodeModal from './Modals/QrCodeModal';
import ConfirmModal from './Modals/ConfirmModal';
import { useAuth } from '../../hooks/useAuth';
import PendingModal from './Modals/PendingModal';

const PaymentMethods = forwardRef((props, ref) => {
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  // Estado do formulário de cartão
  const [fields, setFields] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    document: '',
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showRefusedModal, setShowRefusedModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  // Estados para fluxo Pix e Boleto
  const [showQrCodeModal, setShowQrCodeModal] = useState(false);
  const [showPixConfirmModal, setShowPixConfirmModal] = useState(false);
  const [showPendingModal, setShowPendingModal] = useState(false);
  // Validação dos campos do cartão
  const isValid = (fields) => {
    const cardNumber = fields.cardNumber.replace(/\D/g, '');
    if (!cardNumber || cardNumber.length < 13) {
      setErrorMessage('Número do cartão inválido.');
      return false;
    }
    if (!fields.cardName || fields.cardName.trim().length < 2) {
      setErrorMessage('Nome do titular inválido.');
      return false;
    }
    if (!fields.expiry || !/^\d{2}\/\d{2,4}$/.test(fields.expiry)) {
      setErrorMessage('Vencimento inválido. Use o formato MM/AA ou MM/AAAA.');
      return false;
    }
    if (!fields.cvv || fields.cvv.length < 3) {
      setErrorMessage('Código de segurança inválido.');
      return false;
    }
    if (!fields.document || fields.document.trim().length < 6) {
      setErrorMessage('Documento do titular inválido.');
      return false;
    }
    setErrorMessage('');
    return true;
  };
  // Handler do botão de confirmação
  const handleConfirm = () => {
    if (paymentMethod === 'credit') {
      if (!isValid(fields)) {
        setShowErrorModal(true);
        return;
      }
      setShowLoading(true);
      setTimeout(() => {
        setShowLoading(false);
        setShowRefusedModal(true);
        setTimeout(() => {
          setShowRefusedModal(false);
          navigate('/notfound');
        }, 10000);
      }, 10000);
    } else if (paymentMethod === 'pix') {
      if (!isAuthenticated) {
        setShowAuthModal(true);
        return;
      }
      // Fluxo Pix: QrCode -> Loading -> Confirm -> notfound
      setShowQrCodeModal(true);
      setTimeout(() => {
        setShowQrCodeModal(false);
        setShowLoading(true);
        setTimeout(() => {
          setShowLoading(false);
          setShowPixConfirmModal(true);
          setTimeout(() => {
            setShowPixConfirmModal(false);
            navigate('/notfound');
          }, 10000);
        }, 10000);
      }, 10000);
    } else if (paymentMethod === 'boleto') {
      if (!isAuthenticated) {
        setShowAuthModal(true);
        return;
      }
      setShowLoading(true);
      setTimeout(() => {
        setShowLoading(false);
        setShowPendingModal(true);
        setTimeout(() => {
          setShowPendingModal(false);
          navigate('/notfound');
        }, 10000);
      }, 10000);
    }
    // Adicione lógica para outros métodos se necessário
  };
  // Handlers de login/cadastro (exemplo, ajuste conforme necessário)
  const handleLogin = () => setShowAuthModal(false);
  const handleRegister = () => setShowAuthModal(false);

  // Expor função para o componente pai
  useImperativeHandle(ref, () => ({
    handleConfirm
  }));

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
              <CreditCardPaymentFlow fields={fields} setFields={setFields} />
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
      {/* Modais globais para cartão de crédito */}
      {showAuthModal && (
        <AuthRequiredModal
          onLogin={handleLogin}
          onRegister={handleRegister}
          onClose={() => setShowAuthModal(false)}
        />
      )}
      {showErrorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm flex flex-col items-center relative animate-fade-in">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              onClick={() => setShowErrorModal(false)}
              aria-label="Fechar"
            >
              &times;
            </button>
            <h2 className="text-center text-base font-semibold mb-4 text-[#223A5F]">
              {errorMessage || 'Preencha as informações para concluir o pagamento'}
            </h2>
          </div>
        </div>
      )}
      {showLoading && <IconLoading />}
      {showPendingModal && <PendingModal onClose={() => setShowPendingModal(false)} />}
      {showQrCodeModal && <QrCodeModal onClose={() => setShowQrCodeModal(false)} />}
      {showPixConfirmModal && <ConfirmModal onClose={() => setShowPixConfirmModal(false)} />}
      {showRefusedModal && <RefusedModal onClose={() => setShowRefusedModal(false)} />}
      {/* ConfirmPayment removido daqui, pois já é renderizado fora deste componente */}
    </div>
  );
});

export default PaymentMethods;
