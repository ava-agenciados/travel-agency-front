// importar o navbar e o footer

import ConfirmPayment from '../../components/Payment/ConfirmPayment.jsx';
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
import authService from '../../services/authService';

// retornar na tela


const PackageReview = () => {
  const navigate = useNavigate();
  // Recebe dados via navegação
  const location = useLocation();
  const { packageID, startTravel, endTravel } = location.state || {};

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
  const [removingIndexes, setRemovingIndexes] = useState([]);

  // Buscar dados do pacote ao montar
  useEffect(() => {
    if (packageID) {
      api.get(`/api/v1/packages/${packageID}`)
        .then(res => setPackageData(res.data))
        .catch(() => setPackageData(null));
    }
  }, [packageID]);

  // Preencher responsável com dados do usuário logado
  useEffect(() => {
    const user = authService.getUserInfo();
    if (user) {
      setResponsible(prev => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        cpfPassport: user.cpf || '',
        phoneNumber: user.phoneNumber || '',
        // isForeigner pode ser ajustado conforme o backend
      }));
    }
  }, []);

  // Adiciona um novo acompanhante
  const handleAddCompanion = () => {
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

  // Atualiza dados do acompanhante
  const handleCompanionChange = (index, newData) => {
    setCompanions(companions.map((c, i) => (i === index ? newData : c)));
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

  // Função para navegar para a tela de pagamento, passando todos os dados necessários
  const handleConfirmPayment = () => {
    navigate('/payment', {
      state: {
        packageData,
        startTravel,
        endTravel,
        responsible,
        companions,
      },
    });
  };

  return (
    <MainLayout>
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
            <ConfirmPayment onConfirm={handleConfirmPayment} price={packageData?.price} />
          </MobileOnly>
          <DesktopOnly className="flex-col gap-6 w-full lg:w-[350px] order-3">
            <SidebarDetails
              onConfirm={handleConfirmPayment}
              packageData={packageData}
              startTravel={startTravel}
              endTravel={endTravel}
            />
          </DesktopOnly>
        </FormContainer>
      </main>
    </MainLayout>
  );
};

export default PackageReview;