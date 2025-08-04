// Importa hooks e componentes necessários do React e do projeto
import { useState, useEffect } from 'react';
import { getUserProfile } from '../../services/userService';
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
import api from '../../services/api';
import PendingModal from './Modals/PendingModal';

// Componente principal de métodos de pagamento, usando forwardRef para expor funções ao pai
const PaymentMethods = forwardRef((props, ref) => {
  // Recebe dados do pacote, acompanhantes e datas via props (primeira linha do corpo do componente)
  const { packageData, startTravel, endTravel, companions } = props;
  // Log para depuração dos acompanhantes recebidos via props (evita ReferenceError)
  useEffect(() => {
    console.log('companions recebidos no PaymentMethods:', companions);
  }, [companions]);
  // Estado para o responsável pelo pagamento (usuário logado)
  const [responsible, setResponsible] = useState(null);
  // Busca dados do usuário logado ao montar o componente
  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getUserProfile();
        setResponsible({
          firstName: user.firstName,
          lastName: user.lastName,
          cpfPassport: user.cpfPassport,
          phoneNumber: user.phoneNumber,
        });
      } catch {
        setResponsible(null);
      }
    }
    fetchUser();
  }, []);
  // Estado para o método de pagamento selecionado
  const [paymentMethod, setPaymentMethod] = useState('credit');
  // Hook para navegação de rotas
  const navigate = useNavigate();
  // Hook de autenticação
  const { isAuthenticated } = useAuth();
  // Estado dos campos do formulário de cartão de crédito
  const [fields, setFields] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    document: '',
    installments: '', // Adiciona o campo de parcelas
  });
  // Estados para controle de modais e mensagens
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showRefusedModal, setShowRefusedModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showQrCodeModal, setShowQrCodeModal] = useState(false);
  const [showPixConfirmModal, setShowPixConfirmModal] = useState(false);
  const [showPendingModal, setShowPendingModal] = useState(false);

  // Função para validar os campos do cartão de crédito
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

  // Função chamada ao confirmar o pagamento
  const handleConfirm = async () => {
    // Função para validar se um acompanhante tem todos os campos obrigatórios preenchidos
    function isValidCompanion(c) {
      return (
        c &&
        c.firstName && c.lastName &&
        c.cpfPassport && c.phoneNumber
      );
    }
    // Filtra apenas acompanhantes válidos (declaração única)
    const validCompanions = Array.isArray(companions)
      ? companions.filter(isValidCompanion)
      : [];
    // Log para depuração dos acompanhantes antes do envio
    console.log('companions enviados no payload:', validCompanions);
    // Função para normalizar CPF (remove tudo que não for número)
    function normalizeCPF(cpf) {
      if (!cpf) return '';
      return cpf.replace(/\D/g, '');
    }

    // Função para normalizar telefone para formato internacional (+55DDDNUMERO)
    function normalizePhone(phone) {
      if (!phone) return '';
      const onlyNumbers = phone.replace(/\D/g, '');
      // Se já começa com 55 e tem 13 dígitos, retorna com +
      if (onlyNumbers.length === 13 && onlyNumbers.startsWith('55')) {
        return `+${onlyNumbers}`;
      }
      // Se tem 11 dígitos (celular), adiciona +55
      if (onlyNumbers.length === 11) {
        return `+55${onlyNumbers}`;
      }
      // Se tem 10 dígitos (fixo), adiciona +55
      if (onlyNumbers.length === 10) {
        return `+55${onlyNumbers}`;
      }
      // Caso contrário, retorna vazio (inválido)
      return '';
    }

    // Normaliza os dados do responsável
    const normalizedResponsible = {
      ...responsible,
      cpfPassport: normalizeCPF(responsible?.cpfPassport || responsible?.CPFPassport),
      phoneNumber: normalizePhone(responsible?.phoneNumber || responsible?.PhoneNumber),
    };
    // Log para depuração dos dados do responsável
    console.log('responsible:', responsible);
    // Função para validar se um acompanhante tem todos os campos obrigatórios preenchidos
    function isValidCompanion(c) {
      return (
        c &&
        c.firstName && c.lastName &&
        c.cpfPassport && c.phoneNumber
      );
    }

    // ...

    // Validação dos campos do responsável
    // Validação dos campos do responsável (CPFPassport: 11 dígitos, PhoneNumber: formato internacional)
    if (!normalizedResponsible.cpfPassport || normalizedResponsible.cpfPassport.length < 11) {
      setErrorMessage('CPF/Passaporte do responsável está vazio ou inválido.');
      setShowErrorModal(true);
      return;
    }
    if (!normalizedResponsible.phoneNumber || !/^\+55\d{10,11}$/.test(normalizedResponsible.phoneNumber)) {
      setErrorMessage('Telefone do responsável está vazio ou em formato inválido. Use o formato +55DDDNÚMERO.');
      setShowErrorModal(true);
      return;
    }
    // Se não autenticado, mostra modal de login
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    // Mapeia o método de pagamento para o valor esperado pelo backend
    let paymentMethodValue;
    // Corrige o mapeamento conforme backend
    if (paymentMethod === 'pix') paymentMethodValue = 1; // Pix
    else if (paymentMethod === 'boleto') paymentMethodValue = 2; // Boleto
    else if (paymentMethod === 'credit') paymentMethodValue = 3; // Cartão de Crédito
    else if (paymentMethod === 'debit') paymentMethodValue = 4; // Cartão de Débito
    else {
      setErrorMessage('Método de pagamento inválido.');
      setShowErrorModal(true);
      return;
    }

    // Monta o objeto de método de pagamento
    // Função auxiliar para converter data ISO para dd/MM/yyyy
    function formatDateBR(dateStr) {
      if (!dateStr) return '';
      const d = new Date(dateStr);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    }

    // Função auxiliar para converter data para dd/MM/yyyy
    function toDDMMYYYY(date) {
      if (!date) return '';
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    }

    let paymentMethodObj = {
      paymentMethod: paymentMethodValue,
      paymentDate: toDDMMYYYY(new Date()),
      cpfPassport: normalizedResponsible.cpfPassport || '',
      phoneNumber: normalizedResponsible.phoneNumber || '',
      // Só inclui transactionId se houver valor válido (GUID), senão omite
    };
    // Se for cartão de crédito, valida e adiciona campos extras
    if (paymentMethod === 'credit') {
      if (!isValid(fields)) {
        setShowErrorModal(true);
        return;
      }
      paymentMethodObj = {
        ...paymentMethodObj,
        firstName: normalizedResponsible?.firstName || '',
        lastName: normalizedResponsible?.lastName || '',
        cardNumber: fields.cardNumber,
        cardHolderName: fields.cardName,
        expirationDate: fields.expiry,
        cvv: fields.cvv,
        installments: parseInt(fields.installments, 10) || 1,
        isCreditCard: true,
      };
    }

    // Função auxiliar para converter data ISO para dd/MM/yyyy
    function formatDateBR(dateStr) {
      if (!dateStr) return '';
      const d = new Date(dateStr);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    }

    // Função para converter data ISO para dd/MM/yyyy
    function toDDMMYYYY(date) {
      if (!date) return '';
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    }

    // Monta o payload para enviar à API
    const payload = {
      packageID: packageData?.id,
      startTravel: toDDMMYYYY(startTravel),
      endTravel: toDDMMYYYY(endTravel),
      companions: validCompanions,
      paymentMethods: [
        paymentMethodObj
      ],
      hasTravelInsurance: false, 
      hasTourGuide: false,
      hasTour: false,
      hasActivities: false,
      createNewBooking: true,
    };

    if (paymentMethod === 'pix') {
      setShowQrCodeModal(true);
      setTimeout(() => {
        setShowQrCodeModal(false);
        setShowLoading(true);
        setTimeout(() => {
          setShowLoading(false);
          setShowPixConfirmModal(true);
          setTimeout(() => {
            setShowPixConfirmModal(false);
            navigate('/mybookings');
          }, 3400);
        }, 2000);
      }, 3500);
      return;
    }
    if (paymentMethod === 'boleto') {
      setShowLoading(true);
      setTimeout(() => {
        setShowLoading(false);
        setShowPendingModal(true);
        setTimeout(() => {
          setShowPendingModal(false);
          navigate('/mybookings');
        }, 4000);
      }, 3000);
      return;
    }
    // Cartão, boleto, etc: fluxo normal
    setShowLoading(true);
    try {
      await api.put('/api/v1/bookings/payment', payload);
      setShowLoading(false);
      setShowRefusedModal(true); // Mostra o modal de recusado mesmo com sucesso
    } catch (e) {
      setShowLoading(false);
      setShowErrorModal(true);
      setErrorMessage('Erro ao processar pagamento.');
    }
  };

  // Handlers para login/cadastro (usados nos modais)
  const handleLogin = () => setShowAuthModal(false);
  const handleRegister = () => setShowAuthModal(false);

  // Expõe a função handleConfirm para o componente pai via ref
  useImperativeHandle(ref, () => ({
    handleConfirm
  }));

  // Renderização do componente
  return (
    <div className="flex-1 bg-white rounded-xl shadow p-4 sm:p-6">
      {/* Botão para voltar para a revisão do pacote */}
      <button
        className="flex items-center gap-2 mb-4 sm:mb-6 text-[#223A5F] text-lg sm:text-2xl font-bold hover:underline focus:outline-none"
        style={{ background: 'none', border: 'none', padding: 0, boxShadow: 'none' }}
        onClick={() => navigate('/package-review')}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 19L8 12L15 5" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-sm sm:text-base">Voltar para revisão</span>
      </button>
      <h2 className="text-sm sm:text-base font-bold mb-4">Dados do pagamento</h2>
      <div className="space-y-3">
        {/* Opção de cartão de crédito */}
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
              <CreditCardPaymentFlow fields={fields} setFields={setFields} packagePrice={packageData?.price} />
            </div>
          )}
        </div>
        {/* Opção de Pix */}
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
        {/* Opção de Boleto */}
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

// Exporta o componente para uso em outros lugares
export default PaymentMethods;