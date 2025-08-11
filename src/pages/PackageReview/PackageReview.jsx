// importar o navbar e o footer
import ConfirmPayment from '../../components/Payment/ConfirmPayment.jsx';
import { calculateTotalPrice } from '../../utils/calculateTotalPrice';
import PaymentSteps from '../../components/Payment/PaymentSteps.jsx';
import PackageDetails from './components/PackageDetails.jsx';
import ReviewForm from './components/ReviewForm.jsx';
import SidebarDetails from './components/SidebarDetails.jsx';
import FormContainer from './components/FormContainer.jsx';
import MainLayout from './components/MainLayout.jsx';
import MobileOnly from './components/MobileOnly.jsx';
import DesktopOnly from './components/DesktopOnly.jsx';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api';

import { getUserProfile } from '../../services/userService';

// retornar na tela
const PackageReview = () => {
  const navigate = useNavigate();
  // Recebe dados via navegação
  const location = useLocation();
  // Recupera dados do sessionStorage se não vierem da navegação
  let { packageID, startTravel, endTravel } = location.state || {};
  // Se não vieram via state, tenta recuperar do sessionStorage
  if (!packageID) {
    packageID = sessionStorage.getItem('packageID');
    startTravel = sessionStorage.getItem('startTravel');
    endTravel = sessionStorage.getItem('endTravel');
  } else {
    // Salva no sessionStorage ao navegar normalmente
    sessionStorage.setItem('packageID', packageID);
    if (startTravel) sessionStorage.setItem('startTravel', startTravel);
    if (endTravel) sessionStorage.setItem('endTravel', endTravel);
  }

  // Estado para dados do pacote
  const [packageData, setPackageData] = useState(null);
  // Estado para responsável
  const [responsible, setResponsible] = useState({
    firstName: '',
    lastName: '',
    cpfPassport: '',
    phoneNumber: '',
    isForeigner: false,
  });
  const [companions, setCompanions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [removingIndexes, setRemovingIndexes] = useState([]);

  // Buscar dados do pacote ao montar
  useEffect(() => {
    if (packageID) {
      api.get(`/api/v1/packages/${packageID}`)
        .then(res => setPackageData(res.data))
        .catch(() => setPackageData(null));
    }
  }, [packageID]);
  // Preencher responsável com dados do usuário logado via API
  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const user = await getUserProfile();
        setResponsible(prev => ({
          ...prev,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          cpfPassport: user.cpfPassport,
          phoneNumber: user.phoneNumber || '',
          isForeigner: user.isForeigner || false,
        }));
      } catch (err) {
        // Se não conseguir buscar, mantém o estado padrão
      }
    }
    fetchUserProfile();
  }, []);

  // Adiciona um novo acompanhante
  const handleAddCompanion = () => {
    if (companions.length >= 2) return;
    setCompanions([
      ...companions,
      { firstName: '', lastName: '', cpfPassport: '', phoneNumber: '', isForeigner: false },
    ]);
  };

  // Remove acompanhante
  const handleRemoveCompanion = (index) => {
    setRemovingIndexes((prev) => [...prev, index]);
    setTimeout(() => {
      setCompanions((prev) => prev.filter((_, i) => i !== index));
      setRemovingIndexes((prev) => prev.filter((i) => i !== index));
    }, 400); // tempo igual ao da animação
  };

  // Atualiza dados do acompanhante (campo específico)
  const handleCompanionChange = (index, field, value) => {
    setCompanions(companions.map((c, i) =>
      i === index ? { ...c, [field]: value } : c
    ));
  };

  // Atualiza dados do responsável
  const handleResponsibleChange = (field, value) => {
    setResponsible({ ...responsible, [field]: value });
  };

  // Envio do formulário (exemplo, não implementado)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode montar o body para o endpoint
    // e chamar a API
  };

  // Função para validar acompanhantes
  function isValidCompanion(c) {
    if (!c) return false;
    const firstName = (c.firstName || '').trim();
    const lastName = (c.lastName || '').trim();
    const cpfPassport = (c.cpfPassport || '').replace(/\D/g, '').trim();
    const phoneNumber = (c.phoneNumber || '').replace(/\D/g, '').trim();
    return (
      firstName.length > 0 &&
      lastName.length > 0 &&
      cpfPassport.length > 0 &&
      phoneNumber.length > 0
    );
  }

  // Função para navegar para a tela de pagamento, passando todos os dados necessários
  const handleConfirmPayment = () => {
    // Log para depuração
    if (companions.length > 0) {
      companions.forEach((c, idx) => {
      });
    }
    // Valida acompanhantes
    if (companions.length > 0 && !companions.every(isValidCompanion)) {
      setErrorMessage('Preencha todos os campos obrigatórios dos acompanhantes antes de continuar.');
      return;
    }
    // Salva dados no sessionStorage para garantir persistência
    sessionStorage.setItem('packageID', packageID);
    if (startTravel) sessionStorage.setItem('startTravel', startTravel);
    if (endTravel) sessionStorage.setItem('endTravel', endTravel);
    sessionStorage.setItem('companions', JSON.stringify(companions));
    navigate('/payment', {
      state: {
        packageData,
        startTravel,
        endTravel,
        responsible,
        companions,
      },
    });
  }

  // Cálculo do valor total considerando acompanhantes (sem desconto PIX nesta tela)
  const companionsCount = companions.length;
  const totalPrice = calculateTotalPrice(packageData?.price, companionsCount);

  return (
    <MainLayout>
      {/* Exibe mensagem de erro se houver */}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-center">
          {errorMessage}
        </div>
      )}
      <main className="flex-1 flex flex-col items-center py-8 px-4">
        <PaymentSteps currentStep={2} />
        <FormContainer onSubmit={handleSubmit}>
          <MobileOnly className="order-1">
            <PackageDetails
              packageData={packageData}
              startTravel={startTravel}
              endTravel={endTravel}
            />
          </MobileOnly>
          <ReviewForm
            responsible={responsible}
            handleResponsibleChange={handleResponsibleChange}
            handleAddCompanion={handleAddCompanion}
            companions={companions}
            removingIndexes={removingIndexes}
            handleRemoveCompanion={handleRemoveCompanion}
            handleCompanionChange={handleCompanionChange}
          />
          <MobileOnly className="order-3">
            <ConfirmPayment 
              onConfirm={handleConfirmPayment} 
              price={totalPrice}
              companionsCount={companionsCount}
            />
          </MobileOnly>
          <DesktopOnly className="flex-col gap-6 w-full lg:w-[350px] order-3">
            <SidebarDetails
              onConfirm={handleConfirmPayment}
              packageData={packageData}
              startTravel={startTravel}
              endTravel={endTravel}
              companionsCount={companionsCount}
              totalPrice={totalPrice}
            />
          </DesktopOnly>
        </FormContainer>
      </main>
    </MainLayout>
  );
};

export default PackageReview;