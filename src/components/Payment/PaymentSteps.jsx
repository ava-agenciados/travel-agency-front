const PaymentSteps = ({ currentStep = 3 }) => {
  const steps = [
    { number: 1, label: 'Escolha do pacote' },
    { number: 2, label: 'Revisão' },
    { number: 3, label: 'Finalizar pagamento' }
  ];

  return (
    <div className="flex justify-center items-center gap-6 md:gap-12 mb-8 md:mb-10 w-full">
      {steps.map((step) => (
        <div key={step.number} className="flex flex-col items-center">
          <div className={`rounded-full w-8 md:w-10 h-8 md:h-10 flex items-center justify-center text-sm md:text-lg font-bold border-2 ${
            step.number === currentStep 
              ? 'bg-blue-600 text-white border-blue-600' 
              : 'bg-white text-blue-600 border-blue-600'
          }`}>
            {step.number}
          </div>
          <span className="mt-2 text-xs text-gray-700 font-semibold text-center">
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default PaymentSteps;
