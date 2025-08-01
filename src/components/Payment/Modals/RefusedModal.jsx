import React, { useEffect, useState } from 'react';
import Images from '../../../assets/image';

const RefusedModal = ({ onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      if (onClose) onClose();
    }, 8000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm flex flex-col items-center relative animate-fade-in">
        <img
          src={Images.IconRefuse}
          alt="Recusado"
          className="h-16 w-16 my-4"
        />
        <h2 className="text-xl font-bold text-red-600 mb-2 text-center">Pagamento recusado</h2>
        <p className="text-gray-700 text-center mb-2">Enviamos um e-mail com mais detalhes.</p>
      </div>
    </div>
  );
};

export default RefusedModal;
