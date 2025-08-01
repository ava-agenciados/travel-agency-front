import React, { useEffect, useState } from 'react';
import Images from '../../../assets/image';

const QrCodeModal = ({ onClose, qrCodeUrl = Images.IconQrCode, code = 'DFIkfmsdfm324mklsdm//sao-paulo-recife/DECOLA...' }) => {
  const [show, setShow] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      if (onClose) onClose();
    }, 8000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!show) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xs flex flex-col items-center relative animate-fade-in">
        <h2 className="text-base font-semibold text-[#223A5F] mb-4 text-center">Para prosseguir, é necessário realizar o pagamento</h2>
        <img
          src={qrCodeUrl}
          alt="QR Code"
          className="h-40 w-40 my-2 object-contain"
        />
        <div className="w-full flex flex-row items-center mt-4">
          <input
            type="text"
            value={code}
            readOnly
            className="flex-1 border rounded-md px-2 py-1 text-xs bg-gray-100 text-gray-700"
            style={{ minWidth: 0 }}
          />
          <button
            onClick={handleCopy}
            className="ml-2 px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-xs"
            title="Copiar código"
          >
            {copied ? 'Copiado!' : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><rect width="14" height="14" x="5" y="5" stroke="#223A5F" strokeWidth="2" rx="2"/><path stroke="#223A5F" strokeWidth="2" d="M7 3v2m10-2v2M3 7h2m16 0h-2"/></svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QrCodeModal;
