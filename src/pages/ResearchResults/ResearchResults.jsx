import NavBar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";
import Images from "../../assets/image";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const ResearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const packages = location.state?.packages || [];
  const count = location.state?.count ?? 0;
  // Recupera os dados da pesquisa anterior
  const prevOrigin = location.state?.origin || "";
  const prevDestination = location.state?.destination || "";
  const prevStartDate = location.state?.startDate || "";
  const prevEndDate = location.state?.endDate || "";

  // Estados controlados para os inputs
  const [origin, setOrigin] = useState(prevOrigin);
  const [destination, setDestination] = useState(prevDestination);
  const [startDate, setStartDate] = useState(prevStartDate);
  const [endDate, setEndDate] = useState(prevEndDate);

  return (
    <>
      <section className="relative bg-gray-100">
        {/* Imagem de fundo com busca sobreposta */}
        <NavBar />
        <div
          className="h-[320px] w-full bg-cover bg-center flex items-end justify-center pb-6"
          style={{ backgroundImage: `url(${Images.Bg_HeroSection})` }}
        >
          <div className="relative top-[-100px] bg-white shadow-lg py-2 px-4 rounded-xl flex gap-4 items-center w-[90%] max-w-5xl">
            <input
              type="text"
              placeholder="Ex: Marco Zero, Recife - PE"
              className="w-full border rounded px-3 py-2 text-sm"
              value={origin}
              onChange={e => setOrigin(e.target.value)}
            />
            <input
              type="text"
              placeholder="Ex: Vitória, Espirito Santo - ES"
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
            <button className="bg-blue-900 text-white font-semibold px-4 py-2 rounded hover:bg-blue-800">
              Buscar
            </button>
          </div>
        </div>

        {/* Resultados + filtros */}
        <div className="relative top-[-100px] max-w-9xl mx-auto mt-10 px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filtros */}
          <aside className="bg-white p-6 rounded-lg shadow-md space-y-6">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Lugar</p>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Filtrar por"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Lugar</p>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Filtrar por"
              />
            </div>
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
                    />
                    <span className="text-yellow-500">
                      {'★'.repeat(star)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Resultados */}
          <main className="bg-white p-6 md:col-span-3 space-y-6">
            <p className="text-gray-600 text-sm">
              Encontramos <strong>{count}</strong> resultado(s) para você
            </p>

            {count === 0 ? (
              <div className="text-center text-gray-500 py-10">Nenhum pacote encontrado.</div>
            ) : (
              packages.map((pkg, i) => (
                <div
                  key={pkg.id || i}
                  className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row gap-4"
                >
                  <div className="w-full md:w-1/3 h-20 md:h-44 overflow-hidden rounded">
                    <img
                      src={pkg.image || Images.Bg_HeroSection}
                      alt={pkg.destination || "Destino"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-bold text-gray-900 text-lg">
                      {pkg.title || pkg.destination || "Pacote de viagem"}
                    </h3>
                    <p className="text-sm text-yellow-500">{pkg.stars ? "★".repeat(pkg.stars) : "★★★★★"}</p>
                    <p className="text-sm text-gray-700">Acomodações inclusas:</p>
                    <div className="text-gray-500 text-sm flex gap-1">
                      {/* Exemplo: pkg.accommodations?.map((a, idx) => <span key={idx}>{a}</span>) */}
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <button
                        className="text-sm text-blue-700 font-medium hover:underline"
                        onClick={() => navigate(`/package-details/${pkg.id}`)}
                      >
                        Detalhes
                      </button>
                      <button className="bg-blue-900 text-white px-4 py-2 text-sm rounded hover:bg-blue-800">
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