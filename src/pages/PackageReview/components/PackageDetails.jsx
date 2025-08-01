import React from 'react';

const PackageDetails = () => (
  <div className="bg-white rounded-xl shadow p-0 flex flex-col overflow-hidden border border-gray-200 relative">
    <div className="bg-[#FFB800] px-3 py-1 w-fit rounded-br-lg rounded-tl-lg text-xs font-bold absolute mt-2 ml-2 z-10">Detalhes do pacote</div>
    <div className="relative">
      <img src="/src/assets/images/Sorocaba.jpg" alt="Pacote" className="w-full h-28 object-cover" />
    </div>
    <div className="p-4">
      <h3 className="text-base font-bold text-[#223A5F] mb-1">Pacote Célio</h3>
      <p className="text-sm text-gray-600 leading-snug">Viage agora com sua família para conhecer o estado de São Paulo e conheça Sorocaba e fique hospedado na casa do Célio.</p>
    </div>
  </div>
);

export default PackageDetails;
