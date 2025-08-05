import { useNavigate } from 'react-router-dom';
import ImageWithSkeleton from '../../../components/ImageWithSkeleton';
import { formatPrice } from '../../../utils/formatPrice';

export default function DayOfferCard({ pkg }) {
  const navigate = useNavigate();


  return (
    <div
      className="relative group bg-gradient-to-br from-gray-100 to-gray-100 rounded-2xl shadow-xl p-4 cursor-pointer overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 w-72 min-h-[340px] flex flex-col justify-between"
      style={{ maxWidth: '18rem' }}
      onClick={() => navigate(`/package-details/${pkg.id}`)}
    >
      <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce z-30">
        {pkg.discountPercent ? `${pkg.discountPercent}% OFF` : 'Oferta do Dia'}
      </div>
      <ImageWithSkeleton
        src={pkg.imageUrl}
        alt={pkg.name}
        className="w-full h-32 mb-3"
        imgStyle={{ minHeight: '8rem', minWidth: '100%', borderRadius: '0.75rem', border: '2px solid #bfdbfe' }}
      />
      <h3 className="text-lg font-extrabold text-gray-800 mb-1 truncate">{pkg.name}</h3>
      <p className="text-sm text-gray-600 mb-1">{pkg.destination}</p>
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
        <span className="inline-flex items-center gap-1">
          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          {pkg.departureDate} - {pkg.returnDate}
        </span>
      </div>
      <div className="flex items-center justify-between mt-2 z-10 relative">
        <div className="flex flex-col">
          {/* Preço riscado (fake) */}
          <span className="text-xs text-gray-400 line-through">
            {formatPrice(pkg.price * 1.25)}
          </span>
          {/* Preço real */}
          <span className="text-lg font-bold text-blue-600">
            {formatPrice(pkg.price)}
          </span>
        </div>
        <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow hover:bg-blue-600 transition">Ver detalhes</button>
      </div>
    </div>
  );
}
