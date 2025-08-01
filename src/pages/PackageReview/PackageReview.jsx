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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// retornar na tela


const PackageReview = () => {
  const navigate = useNavigate();
  // Mock dos dados iniciais
  const [responsible, setResponsible] = useState({
    firstName: '',
    lastName: '',
    cpfPassport: '',
    phoneNumber: '',
    isForeigner: false,
  });
  const [companions, setCompanions] = useState([]);
  const [removingIndexes, setRemovingIndexes] = useState([]);

  // Mock dos dados do pacote (serão recebidos de outra página)
  const packageID = 1;
  const startTravel = '2025-07-31T21:40:26.107Z';
  const endTravel = '2025-08-05T21:40:26.107Z';

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

  // Função para navegar para a tela de pagamento
  const handleConfirmPayment = () => {
    navigate('/payment');
  };

  return (
    <MainLayout>
      <main className="flex-1 flex flex-col items-center py-8 px-4">
        <PaymentSteps currentStep={2} />
        <FormContainer onSubmit={handleSubmit}>
          <MobileOnly className="order-1">
            <PackageDetails />
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
            <ConfirmPayment onConfirm={handleConfirmPayment} />
          </MobileOnly>
          <DesktopOnly className="flex-col gap-6 w-full lg:w-[350px] order-3">
            <SidebarDetails onConfirm={handleConfirmPayment} />
          </DesktopOnly>
        </FormContainer>
      </main>
    </MainLayout>
  );
};

export default PackageReview;