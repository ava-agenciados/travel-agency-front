import React from 'react';


const PackageDetails = ({ packageData, startTravel, endTravel }) => {
  if (!packageData) {
    return (
      <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center border border-gray-200">
        <span className="text-gray-500">Carregando detalhes do pacote...</span>
      </div>
    );
  }
  const BASE_URL = "https://localhost:8080/";
  const image = (packageData.packageMedia && packageData.packageMedia.length > 0)
    ? (packageData.packageMedia[0].mediaUrl.startsWith('http')
        ? packageData.packageMedia[0].mediaUrl
        : BASE_URL + packageData.packageMedia[0].mediaUrl)
    : '/src/assets/images/Sorocaba.jpg';
  return (
    <div className="bg-white rounded-xl shadow p-0 flex flex-col overflow-hidden border border-gray-200 relative">
      <div className="bg-[#FFB800] px-3 py-1 w-fit rounded-br-lg rounded-tl-lg text-xs font-bold absolute mt-2 ml-2 z-10">Detalhes do pacote</div>
      <div className="relative">
        <img src={image} alt="Pacote" className="w-full h-28 object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-base font-bold text-[#223A5F] mb-1">{packageData.name || packageData.title}</h3>
        <p className="text-sm text-gray-600 leading-snug">{packageData.description}</p>
      </div>
    </div>
  );
};

export default PackageDetails;
