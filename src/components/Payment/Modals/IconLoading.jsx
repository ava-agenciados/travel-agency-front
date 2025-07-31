import React from 'react';
import Images from '../../../assets/image';

const IconLoading = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm flex flex-col items-center relative animate-fade-in">
      <span className="text-center text-base font-semibold text-[#223A5F] mb-6 mt-2">Seu pagamento está sendo processado,<br/>aguarde um momento</span>
      <img
        src={Images.IconLoading}
        alt="Carregando"
        className="animate-spin-slow h-16 w-16 my-4"
        style={{ animation: 'spin 1.5s linear infinite' }}
      />
      <span className="text-gray-500 text-sm mt-2">Estamos verificando disponibilidades...</span>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin 1.5s linear infinite;
        }
      `}</style>
    </div>
  </div>
);

export default IconLoading;
