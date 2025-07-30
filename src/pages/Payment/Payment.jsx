import PaymentSteps from '../../components/Payment/PaymentSteps';
import PaymentMethods from '../../components/Payment/PaymentMethods';
import ConfirmPayment from '../../components/Payment/ConfirmPayment';
import { useRef } from 'react';

import NavBar from '../../components/Navbar/NavBar';
import Footer from '../../components/Footer/Footer';

const Payment = () => {
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
              <PaymentMethods ref={paymentMethodsRef} />
            </div>

            {/* Sidebar direita */}
            <div className="flex flex-col gap-6 w-[350px]">
              {/* Card: detalhes do pacote */}
              <div className="bg-white rounded-xl shadow p-0 flex flex-col overflow-hidden border border-gray-200">
                <div className="bg-[#FFB800] px-3 py-1 w-fit rounded-br-lg rounded-tl-lg text-xs font-bold absolute mt-2 ml-2 z-10">Detalhes do pacote</div>
                <div className="relative">
                  <img src="/src/assets/images/bg_herosection.png" alt="Pacote" className="w-full h-28 object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-bold text-[#223A5F] mb-1">Lorem ipsum sit amet delok sit amet dolok</h3>
                  <p className="text-sm text-gray-600 leading-snug">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia porro magni quaerat nostrum excepturi. Quasi qui veniam iusto molestias beatae, iste eius voluptatum consectetur et...</p>
                </div>
              </div>

              {/* Card: Confirma pagamento */}
              <ConfirmPayment onConfirm={handleConfirm} />
            </div>
          </div>

          {/* Layout Mobile */}
          <div className="lg:hidden flex flex-col gap-6">
            {/* Card: detalhes do pacote - primeiro no mobile */}
            <div className="bg-white rounded-xl shadow p-0 flex flex-col overflow-hidden border border-gray-200">
              <div className="bg-[#FFB800] px-3 py-1 w-fit rounded-br-lg rounded-tl-lg text-xs font-bold absolute mt-2 ml-2 z-10">Detalhes do pacote</div>
              <div className="relative">
                <img src="/src/assets/images/bg_herosection.png" alt="Pacote" className="w-full h-28 object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-base font-bold text-[#223A5F] mb-1">Lorem ipsum sit amet delok sit amet dolok</h3>
                <p className="text-sm text-gray-600 leading-snug">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia porro magni quaerat nostrum excepturi. Quasi qui veniam iusto molestias beatae, iste eius voluptatum consectetur et...</p>
              </div>
            </div>

            {/* Card: métodos de pagamento - segundo no mobile */}
            <div className="w-full">
              <PaymentMethods ref={paymentMethodsRef} />
            </div>

            {/* Card: Confirma pagamento - terceiro no mobile */}
            <ConfirmPayment onConfirm={handleConfirm} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;
