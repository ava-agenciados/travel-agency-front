import NavBar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";
import Images from "../../assets/image";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from '../../services/api';
import ImageWithSkeleton from "../../components/ImageWithSkeleton";
import Accommodations from "../PackageDetails/components/Accommodations";

const ResearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let packages = location.state?.packages || [];
  const countOriginal = location.state?.count ?? 0;
  const stateFilter = location.state?.stateFilter;
  // Recomendaçoes, caso nao haja resultados
  const [recommendations, setRecommendations] = useState([]);
  // Filtro de estrelas
  const [starFilter, setStarFilter] = useState(null);
  // Recupera os dados da pesquisa anterior
  const prevOrigin = location.state?.origin || "";
  const prevDestination = location.state?.destination || "";
  const prevStartDate = location.state?.startDate || "";
  const prevEndDate = location.state?.endDate || "";
  const prevCheckedDateFlex = location.state?.checkedDateFlex || false;

  // Estados controlados para os inputs
  const [origin, setOrigin] = useState(prevOrigin);
  const [destination, setDestination] = useState(prevDestination);
  const [startDate, setStartDate] = useState(prevStartDate);
  const [endDate, setEndDate] = useState(prevEndDate);
  const [checkedDateFlex, setCheckedDateFlex] = useState(prevCheckedDateFlex);

  function formatDateToAPI(dateStr) {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  }
  const departureFormated = formatDateToAPI(startDate);
  const returnFormated = formatDateToAPI(endDate);
  // Filtro por estado, se vier do banner regional
  if (stateFilter && packages.length > 0) {
    packages = packages.filter(pkg => {
      const pkgState = pkg.lodgingInfo?.location?.state || 'Outro';
      return pkgState === stateFilter;
    });
  } else if (!checkedDateFlex && packages.length > 0) {
    packages = packages.filter(pkg => {
      const pkgDeparture = pkg.departureDate || pkg.departure_date;
      const pkgReturn = pkg.returnDate || pkg.return_date;
      return (
        pkgDeparture === departureFormated &&
        pkgReturn === returnFormated
      );
    });
  }

  // Função para reservar um pacote específico
  const handleReserve = (pkg) => {
    // Pegue as datas do pacote (ajuste os campos conforme o seu backend)
    const startTravel = pkg.departureDate || pkg.departure_date;
    const endTravel = pkg.returnDate || pkg.return_date;
    console.log("Dados do pacote para reserva:")
    if (!startTravel || !endTravel) {
      alert('Não há datas de viagem disponíveis para este pacote.');
      return;
    }
    const payload = {
      packageID: pkg.id,
      startTravel,
      endTravel,
      // Adicione outros campos necessários aqui
    };
    navigate('/package-review', { state: payload });
  };
  const count = packages.length;

  useEffect(() => {
    if (count === 0) {
      api.get('/api/v1/packages')
        .then(res => {
          if (Array.isArray(res.data)) {
            setRecommendations(res.data.slice(0, 4));
          }
        })
        .catch(() => setRecommendations([]));
    }
  }, [count]);

  return (
    <>
      <section className="relative bg-gray-100">
        {/* Imagem de fundo com busca sobreposta */}
        <NavBar />
        <div
          className="h-[320px] w-full bg-cover bg-center flex items-end justify-center pb-6"
          style={{ backgroundImage: `url(${Images.Bg_HeroSection})` }}
        >
          <form
            className="relative top-[-100px] bg-white shadow-lg py-4 px-4 rounded-xl flex flex-col gap-2 items-center w-[90%] max-w-5xl"
            onSubmit={async e => {
              e.preventDefault();
              const formatDateToAPI = (dateStr) => {
                if (!dateStr) return "";
                const [year, month, day] = dateStr.split("-");
                return `${day}/${month}/${year}`;
              };
              const departureFormated = formatDateToAPI(startDate);
              const returnFormated = formatDateToAPI(endDate);
              let searchParams;
              if (checkedDateFlex) {
                searchParams = {
                  origin,
                  destination,
                  departureDateStart: departureFormated,
                  returnDateEnd: returnFormated,
                };
              } else {
                searchParams = {
                  origin,
                  destination,
                  departureDate: departureFormated,
                  returnDate: returnFormated,
                };
              }
              try {
                const response = await api.get("/api/v1/packages/search", {
                  params: searchParams,
                });
                const packages = Array.isArray(response.data) ? response.data : [];
                const count = packages.length;
                navigate('/research-results', {
                  state: {
                    packages,
                    count,
                    origin,
                    destination,
                    startDate,
                    endDate,
                    checkedDateFlex,
                  },
                });
              } catch (error) {
                navigate('/research-results', {
                  state: {
                    packages: [],
                    count: 0,
                    origin,
                    destination,
                    startDate,
                    endDate,
                    checkedDateFlex,
                  },
                });
              }
            }}
          ><div className="relative flex gap-4 items-center w-[90%] max-w-5xl">
            <input
              type="text"
              placeholder="Ex: Recife"
              className="w-full border rounded px-3 py-2 text-sm"
              value={origin}
              onChange={e => setOrigin(e.target.value)}
            />
            <input
              type="text"
              placeholder="Ex: Vitória"
              className="w-full border rounded px-3 py-2 text-sm"
              value={destination}
              onChange={e => setDestination(e.target.value)}
            />
            <input
              type="date"
              className="border rounded px-3 py-2 text-sm"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
            <input
              type="date"
              className="border rounded px-3 py-2 text-sm"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
            />
            <button type="submit" className="bg-blue-900 text-white font-semibold px-4 py-2 rounded hover:bg-blue-800">
              Buscar
            </button>
                   </div>
          <div className="col-span-full flex items-center">
     <input
       type="checkbox"
       id="dateFlex"
       checked={checkedDateFlex}
       onChange={e => setCheckedDateFlex(e.target.checked)}
       className="mr-2 accent-blue-600"
     />
     <label htmlFor="dateFlex" className="text-sm text-gray-700 select-none cursor-pointer">
       Buscar com datas flexíveis (encontrar pacotes entre as datas escolhidas)
     </label>

       </div>
          </form>
        </div>

        {/* Resultados + filtros */}
        <div className="relative top-[-100px] max-w-9xl mx-auto mt-10 px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filtros */}
          <aside className="bg-white p-6 rounded-lg shadow-md space-y-6">
            {/* <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Lugar</p>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Filtrar por"
              />
            </div> */}
            {/* <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Lugar</p>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Filtrar por"
              />
            </div> */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Estrelas</p>
              <div className="space-y-2 text-sm text-gray-700">
                {[1, 2, 3, 4, 5].map((star) => (
                  <label key={star} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      className="accent-yellow-500"
                      name="stars"
                      value={star}
                      checked={starFilter === star}
                      onChange={() => setStarFilter(star)}
                    />
                    <span className="text-yellow-500">
                      {'★'.repeat(star)}
                    </span>
                  </label>
                ))}
                {starFilter && (
                  <button
                    className="text-xs text-blue-600 underline mt-2"
                    onClick={() => setStarFilter(null)}
                    type="button"
                  >
                    Limpar filtro
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* Resultados */}
          <main className="bg-white p-6 md:col-span-3 space-y-6">
            <div className="flex gap-3">
              <Link to="/">
              <span>
              <p className="hover:underline flex text-gray-600 text-sm gap-2">- Voltar</p></span>
              </Link>
            <p className="text-gray-600 text-sm">
              Encontramos <strong>{count}</strong> resultado(s) para você
            </p></div>

            {count === 0 ? (
              <>
                <div className="text-center text-gray-500 py-10">Nenhum pacote encontrado.</div>
                {/* Recomendações reais */}
                {recommendations.length > 0 && (
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-4 text-gray-800">Recomendações para você</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {recommendations.map((pkg, i) => (
                        <div
                          key={pkg.id || i}
                          className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row gap-4"
                        >
                          <div className="w-full md:w-1/3 h-20 md:h-44 overflow-hidden rounded relative">
                            <ImageWithSkeleton
                              src={pkg.packageMedia && pkg.packageMedia.length > 0
                                ? (pkg.packageMedia[0].mediaUrl.startsWith('http')
                                    ? pkg.packageMedia[0].mediaUrl
                                    : `https://localhost:8080/${pkg.packageMedia[0].mediaUrl}`)
                                : Images.Bg_HeroSection}
                              alt={pkg.title || pkg.destination || 'Destino'}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 space-y-2">
                            <h3 className="font-bold text-gray-900 text-lg">{pkg.title || pkg.destination || 'Pacote de viagem'}</h3>
                            <p className="text-sm text-yellow-500">{pkg.stars ? '★'.repeat(pkg.stars) : '★★★★★'}</p>
                            {/* Preço do pacote */}
                            <p className="text-base font-bold text-green-700">
                              {pkg.price ?
                                (pkg.discountPercent && pkg.discountPercent > 0
                                  ? <><span className="line-through text-gray-400 mr-2">R$ {Number(pkg.price).toLocaleString('pt-BR')}</span> R$ {Number(pkg.price * (1 - pkg.discountPercent / 100)).toLocaleString('pt-BR')}</>
                                  : <>R$ {Number(pkg.price).toLocaleString('pt-BR')}</>
                                )
                                : <span className="text-gray-400 font-normal">Preço indisponível</span>
                              }
                            </p>
                            <p className="text-sm text-gray-700">Acomodações inclusas:</p>
                            <div className="flex gap-2 items-center">
                              {(() => {
                                const accs = pkg.lodgingInfo?.accommodations || pkg.accommodations || [];
                                if (Array.isArray(accs) && accs.length > 0) {
                                  return accs.map((acc, idx) => (
                                    acc.iconUrl ? (
                                      <ImageWithSkeleton
                                        key={idx}
                                        src={acc.iconUrl.startsWith('http') ? acc.iconUrl : `https://localhost:8080/${acc.iconUrl}`}
                                        alt="Acomodação"
                                        className="w-6 h-6 object-contain"
                                      />
                                    ) : null
                                  ));
                                }
                                return <span className="text-xs text-gray-400">Nenhuma acomodação informada</span>;
                              })()}
                            </div>
                            <div className="flex justify-between items-center pt-2">
                              <button
                                className="text-sm text-blue-700 font-medium hover:underline"
                                onClick={() => navigate(`/package-details/${pkg.id}`)}
                              >
                                Detalhes
                              </button>
                              <button onClick={() => handleReserve(pkg)} className="bg-blue-900 text-white px-4 py-2 text-sm rounded hover:bg-blue-800">
                                Reservar
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              (starFilter
                ? packages.filter(pkg => (pkg.stars || 5) === starFilter)
                : packages
              ).map((pkg, i) => (
                <div
                  key={pkg.id || i}
                  className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row gap-4"
                >
                  <div className="w-full md:w-1/3 h-20 md:h-44 overflow-hidden rounded relative">
                    {/* Imagem principal do pacote */}
                    <ImageWithSkeleton
                      src={
                        pkg.packageMedia && pkg.packageMedia.length > 0
                          ? (pkg.packageMedia[0].mediaUrl.startsWith('http')
                              ? pkg.packageMedia[0].mediaUrl
                              : `https://localhost:8080/${pkg.packageMedia[0].mediaUrl}`)
                          : Images.Bg_HeroSection
                      }
                      alt={pkg.destination || pkg.title || "Destino"}
                      className="w-full h-full object-cover"
                    />
                    {/* Miniaturas das imagens do pacote */}
                    {pkg.packageMedia && pkg.packageMedia.length > 1 && (
                      <div className="absolute bottom-1 left-1 flex gap-1 bg-black/30 p-1 rounded">
                        {pkg.packageMedia.slice(1, 4).map((img, idx) => (
                          <ImageWithSkeleton
                            key={idx}
                            src={img.mediaUrl.startsWith('http') ? img.mediaUrl : `https://localhost:8080/${img.mediaUrl}`}
                            alt="Miniatura"
                            className="w-8 h-8 object-cover rounded border border-white"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-bold text-gray-900 text-lg">
                      {pkg.origin && pkg.destination
                        ? `${pkg.origin} → ${pkg.destination}`
                        : (pkg.destination || pkg.title || "Pacote de viagem")}
                    </h3>
                    <p className="text-sm text-yellow-500">{pkg.stars ? "★".repeat(pkg.stars) : "★★★★★"}</p>
                    {/* Preço do pacote */}
                    <p className="text-base font-bold text-green-700">
                      {pkg.price ?
                        (pkg.discountPercent && pkg.discountPercent > 0
                          ? <><span className="line-through text-gray-400 mr-2">R$ {Number(pkg.price).toLocaleString('pt-BR')}</span> R$ {Number(pkg.price * (1 - pkg.discountPercent / 100)).toLocaleString('pt-BR')}</>
                          : <>R$ {Number(pkg.price).toLocaleString('pt-BR')}</>
                        )
                        : <span className="text-gray-400 font-normal">Preço indisponível</span>
                      }
                    </p>
                    <p className="text-sm font-semibold mb-4">Acomodações inclusas:</p>
                    <Accommodations lodgingInfo={pkg.lodgingInfo} showLabels={false} />
                    <div className="flex justify-between items-center pt-2">
                      <button
                        className="text-sm text-blue-700 font-medium hover:underline"
                        onClick={() => navigate(`/package-details/${pkg.id}`)}
                      >
                        Detalhes
                      </button>
                      <button
                        className="bg-blue-900 text-white px-4 py-2 text-sm rounded hover:bg-blue-800"
                        onClick={() => handleReserve(pkg)}
                      >
                        Reservar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </main>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ResearchResults;