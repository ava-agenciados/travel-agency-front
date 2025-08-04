// components/ImageGallery.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import NavBar from '../../components/Navbar/NavBar';
import Footer from '../../components/Footer/Footer';
import MapsDetails from './components/MapsDetails';
import ImageGallery from './components/ImageGallery';
// import PackageSummary from './components/PackageSummary';
import PackageMainInfo from './components/PackageMainInfo';
import Accommodations from './components/Accommodations';
import AuthorInfo from './components/AuthorInfo';
import RatingsList from './components/RatingsList';
import LoadingOverlay from '../../components/LoadingOverlay';
import { formatPrice } from '../../utils/formatPrice';
import { useNavigate } from 'react-router-dom';

export default function PackageDetails() {
  const { id } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lodgingInfo, setLodgingInfo] = useState(null);
  const [zipCode, setZipCode] = useState('');

  function formatDate(dateStr) {
    if (!dateStr) return '';
    // Se vier no formato dd/MM/yyyy, converte para yyyy-MM-dd
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
      const [day, month, year] = dateStr.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    // Tenta converter normalmente
    const d = new Date(dateStr);
    if (isNaN(d)) return '';
    return d.toISOString().slice(0, 10);
  }
  function getDateField(obj, keys) {
    for (const k of keys) {
      if (obj && obj[k]) return obj[k];
    }
    return '';
  }
  const startTravel = formatDate(getDateField(packageData, ['departureDate', 'startDate', 'start_date', 'start_travel']));
  const endTravel = formatDate(getDateField(packageData, ['returnDate', 'endDate', 'end_date', 'end_travel']));

  const [isSubmitting, setIsSubmitting] = useState(false);
  // Função para reservar
  const navigate = useNavigate();
  const handleReserve = async () => {
    if (!startTravel || !endTravel || null) {
      alert('Não há datas de viagem disponíveis para este pacote.');
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        packageID: id,
        startTravel,
        endTravel,
      };
      navigate('/package-review', { state: payload });

    } catch (error) {
      alert('Erro ao realizar reserva.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const BASE_URL = "https://localhost:8080/";

  useEffect(() => {
    async function fetchPackage() {
      setLoading(true);
      try {
        const response = await api.get(`/api/v1/packages/${id}`);
        setPackageData(response.data);
      } catch (e) {
        setPackageData(null);
      } finally {
        setLoading(false);
      }
    }
    fetchPackage();
  }, [id]);

  useEffect(() => {
    async function fetchLodgingInfo() {
      try {
        const response = await api.get(`/api/v1/packages`);
        const found = Array.isArray(response.data)
          ? response.data.find(pkg => String(pkg.id) === String(id))
          : null;
        if (found && found.lodgingInfo) {
          setLodgingInfo(found.lodgingInfo);
          const rawZip = found.lodgingInfo.location?.zipCode || '';
          setZipCode(rawZip.replace(/\D/g, ''));
        } else {
          setLodgingInfo(null);
          setZipCode('');
        }
      } catch (e) {
        setLodgingInfo(null);
        setZipCode('');
      }
    }
    
    if (!packageData?.lodgingInfo) {
      fetchLodgingInfo();
    } else {
      setLodgingInfo(packageData.lodgingInfo);
      const rawZip = packageData.lodgingInfo.location?.zipCode || '';
      setZipCode(rawZip.replace(/\D/g, ''));
    }
  }, [id, packageData]);

  // fallback para imagens usando packageMedia
  const images = (packageData?.packageMedia && packageData.packageMedia.length > 0)
    ? packageData.packageMedia.map(m => m.mediaUrl.startsWith('http') ? m.mediaUrl : BASE_URL + m.mediaUrl)
    : [
      'https://tse1.mm.bing.net/th/id/OIP.ONZXZ91RS56i6S74kz-hVgHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      'https://tse1.mm.bing.net/th/id/OIP.p63JvdF67KP1uFNx-BzcHQHaEp?r=0&w=1600&h=1005&rs=1&pid=ImgDetMain&o=7&rm=3',
      'https://tse1.mm.bing.net/th/id/OIP.ONZXZ91RS56i6S74kz-hVgHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      'https://tse1.mm.bing.net/th/id/OIP.ONZXZ91RS56i6S74kz-hVgHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    ];


  if (loading) {
    return (
      <LoadingOverlay/>
    );
  }

  if (!packageData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-lg font-semibold text-red-600">Pacote não encontrado.</span>
      </div>
    );
  }

  return (
    <>
      <NavBar />

      <ImageGallery images={images} />
      <section className="bg-gray-100 py-10 px-4">
        <div className="max-w-9xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <PackageMainInfo
              name={packageData.name || packageData.title}
              destination={packageData.destination}
              description={packageData.description}
            />
            <Accommodations lodgingInfo={lodgingInfo} />
            <AuthorInfo author={packageData.author} />
            <RatingsList ratings={packageData.ratings} />
          </div>
          {/* Resumo do pacote com datas e botão de reserva */}
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6 h-fit">
            <h4 className="text-sm font-semibold text-gray-700">Resumo</h4>
            <div className="flex flex-col gap-2">
              <h2>Data de Início da viagem</h2>
              <input
                type="date"
                className="border rounded px-3 py-2 text-sm bg-gray-100"
                value={startTravel}
                readOnly
                disabled
                placeholder="Início da viagem"
              />
              <h2>Data de Fim da viagem</h2>
              <input
                type="date"
                className="border rounded px-3 py-2 text-sm bg-gray-100"
                value={endTravel}
                readOnly
                disabled
                placeholder="Fim da viagem"
              />
            </div>
            <div>
              {/* Preço do pacote: valor original cortado e valor promocional */}
              {packageData.price ? (
                <p className="text-lg font-bold text-gray-800">
                  {packageData.discountPercent && packageData.discountPercent > 0 ? (
                    <>
                      <span className="line-through text-gray-400 mr-2">R$ {(Number(packageData.price) * 1.2).toLocaleString('pt-BR')}</span>
                      R$ {(Number(packageData.price) * (1 - packageData.discountPercent / 100)).toLocaleString('pt-BR')}
                    </>
                  ) : (
                    <>
                      <span className="line-through text-gray-400 mr-2">R$ {(Number(packageData.price) * 1.2).toLocaleString('pt-BR')}</span>
                      R$ {Number(packageData.price).toLocaleString('pt-BR')}
                    </>
                  )}
                </p>
              ) : (
                <p className="text-lg font-bold text-gray-800">Preço não informado</p>
              )}
            </div>
            <button
              className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2 rounded disabled:opacity-60"
              onClick={handleReserve}
              disabled={isSubmitting || !startTravel || !endTravel}
            >
              {isSubmitting ? 'Reservando...' : 'Reservar'}
            </button>
            <p className="text-xs text-gray-500 text-center">Ainda não haverá cobranças</p>
          </div>
        </div>
      </section>
      <MapsDetails zipcode={zipCode} />
      <Footer />
    </>
  );

}