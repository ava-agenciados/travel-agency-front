import PaymentSteps from '../../components/Payment/PaymentSteps';
import PaymentMethods from '../../components/Payment/PaymentMethods';
import ConfirmPayment from '../../components/Payment/ConfirmPayment';
import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../../components/Navbar/NavBar';
import Footer from '../../components/Footer/Footer';
import { calculateTotalPrice } from '../../utils/calculateTotalPrice';

const Payment = () => {

  // Recebe dados do pacote via navegação
  const location = useLocation();
  const packageData = location.state?.packageData;
  const startTravel = location.state?.startTravel;
  const endTravel = location.state?.endTravel;
  const responsible = location.state?.responsible;
  let companions = location.state?.companions;
  if (!companions) {
    try {
      const stored = sessionStorage.getItem('companions');
      companions = stored ? JSON.parse(stored) : [];
    } catch {
      companions = [];
    }
  }
  const companionsCount = companions.length;
  const totalPrice = calculateTotalPrice(packageData?.price, companionsCount);

  // Referência para acessar a função de confirmação do PaymentMethods
  const paymentMethodsRef = useRef();

  // Handler para passar para ConfirmPayment
  const handleConfirm = () => {
    if (paymentMethodsRef.current && paymentMethodsRef.current.handleConfirm) {
      paymentMethodsRef.current.handleConfirm();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#EBECF0]">
      <NavBar />
      <main className="flex-1 flex flex-col items-center py-8 px-4">
        {/* Component: Etapas do pagamento */}
        <PaymentSteps currentStep={3} />

        {/* Container principal do conteúdo */}
        <div className="w-full max-w-7xl">
          {/* Layout Desktop */}
          <div className="hidden lg:flex flex-row gap-8">
            {/* Card: métodos de pagamento */}
            <div className="flex-1">
              <PaymentMethods
                ref={paymentMethodsRef}
                packageData={packageData}
                startTravel={startTravel}
                endTravel={endTravel}
                responsible={responsible}
                companions={companions}
              />
            </div>

            {/* Sidebar direita */}
            <div className="flex flex-col gap-6 w-[350px]">

            {/* Card: detalhes do pacote */}
            <div className="bg-white rounded-xl shadow p-0 flex flex-col overflow-hidden border border-gray-200">
              <div className="bg-[#FFB800] px-3 py-1 w-fit rounded-br-lg rounded-tl-lg text-xs font-bold absolute mt-2 ml-2 z-10">Detalhes do pacote</div>
              <div className="relative">
                <img src={packageData?.packageMedia && packageData.packageMedia.length > 0
                  ? (packageData.packageMedia[0].mediaUrl.startsWith('http')
                      ? packageData.packageMedia[0].mediaUrl
                      : `https://localhost:8080/${packageData.packageMedia[0].mediaUrl}`)
                  : '/src/assets/images/Sorocaba.jpg'} alt="Pacote" className="w-full h-28 object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-base font-bold text-[#223A5F] mb-1">{packageData?.name || packageData?.title || '-'}</h3>
                <p className="text-sm text-gray-600 leading-snug">{packageData?.description || '-'}</p>
              </div>
            </div>

              {/* Card: Confirma pagamento */}
              <ConfirmPayment onConfirm={handleConfirm} price={totalPrice} companionsCount={companionsCount} />
            </div>
          </div>

          {/* Layout Mobile */}
          <div className="lg:hidden flex flex-col gap-6">

            {/* Card: detalhes do pacote - primeiro no mobile */}
            <div className="bg-white rounded-xl shadow p-0 flex flex-col overflow-hidden border border-gray-200">
              <div className="bg-[#FFB800] px-3 py-1 w-fit rounded-br-lg rounded-tl-lg text-xs font-bold absolute mt-2 ml-2 z-10">Detalhes do pacote</div>
              <div className="relative">
                <img src={packageData?.packageMedia && packageData.packageMedia.length > 0
                  ? (packageData.packageMedia[0].mediaUrl.startsWith('http')
                      ? packageData.packageMedia[0].mediaUrl
                      : `https://localhost:8080/${packageData.packageMedia[0].mediaUrl}`)
                  : '/src/assets/images/Sorocaba.jpg'} alt="Pacote" className="w-full h-28 object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-base font-bold text-[#223A5F] mb-1">{packageData?.name || packageData?.title || '-'}</h3>
                <p className="text-sm text-gray-600 leading-snug">{packageData?.description || '-'}</p>
              </div>
            </div>

            {/* Card: métodos de pagamento - segundo no mobile */}
            <div className="w-full">
            <PaymentMethods
              ref={paymentMethodsRef}
              packageData={packageData}
              startTravel={startTravel}
              endTravel={endTravel}
              responsible={responsible}
              companions={companions}
            />
            </div>

            {/* Card: Confirma pagamento - terceiro no mobile */}
            <ConfirmPayment onConfirm={handleConfirm} price={totalPrice} companionsCount={companionsCount} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;
