import Images from "../../assets/image";
import NavBar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";

const ResearchResults = () => {
  return (
<>
<section className="relative bg-gray-100">
  {/* Imagem de fundo com busca sobreposta */}
  <NavBar />
  <div
    className="h-[320px] w-full bg-cover bg-center flex items-end justify-center pb-6"
    style={{
      backgroundImage:
        `url(${Images.Bg_HeroSection})`,
    }}
  >
    <div className="relative top-[-100px] bg-white shadow-lg p-4 rounded-xl flex gap-4 items-center w-[90%] max-w-5xl">
      <input
        type="text"
        placeholder="Ex: Marco Zero, Recife - PE"
        className="w-full border rounded px-3 py-2 text-sm"
      />
      <input
        type="text"
        placeholder="Ex: Vitória, Espirito Santo - ES"
        className="w-full border rounded px-3 py-2 text-sm"
      />
      <input
        type="date"
        className="border rounded px-3 py-2 text-sm"
        defaultValue="2005-03-01"
      />
      <input
        type="date"
        className="border rounded px-3 py-2 text-sm"
        defaultValue="2005-03-01"
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
        Encontramos <strong>3</strong> resultado(s) para você
      </p>

      {Array(3)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row gap-4"
          >
            <div className="w-full md:w-1/3 h-20 md:h-44 overflow-hidden rounded">
              <img
                src={Images.Bg_HeroSection}
                alt="Destino"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="font-bold text-gray-900 text-lg">
                Lorem ipsum sit amet dolok sit amet dolok
              </h3>
              <p className="text-sm text-yellow-500">★★★★★</p>
              <p className="text-sm text-gray-700">Acomodações inclusas:</p>
              <div className="text-gray-500 text-sm flex gap-1">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i}>H</span>
                  ))}
              </div>
              <div className="flex justify-between items-center pt-2">
                <a
                  href="#"
                  className="text-sm text-blue-700 font-medium hover:underline"
                >
                  Detalhes
                </a>
                <button className="bg-blue-900 text-white px-4 py-2 text-sm rounded hover:bg-blue-800">
                  Reservar
                </button>
              </div>
            </div>
          </div>
        ))}
    </main>
  </div>
</section>
<Footer/>
</>

  );
}

export default ResearchResults;