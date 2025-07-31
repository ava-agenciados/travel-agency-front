import React from 'react';

const AuthRequiredModal = ({ onLogin, onRegister, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm flex flex-col items-center relative animate-fade-in">
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
        onClick={onClose}
        aria-label="Fechar"
      >
        &times;
      </button>
      <h2 className="text-xl font-bold text-blue-600 mb-2 text-center">Autenticação necessária</h2>
      <p className="text-gray-700 text-center mb-4">Você precisa estar logado para finalizar o pagamento.</p>
      <div className="flex gap-4 w-full">
        <button
          className="flex-1 bg-[#223A5F] text-white font-bold rounded-lg py-2"
          onClick={onLogin}
        >
          Login
        </button>
        <button
          className="flex-1 bg-gray-200 text-[#223A5F] font-bold rounded-lg py-2"
          onClick={onRegister}
        >
          Cadastrar
        </button>
      </div>
    </div>
  </div>
);

export default AuthRequiredModal;
