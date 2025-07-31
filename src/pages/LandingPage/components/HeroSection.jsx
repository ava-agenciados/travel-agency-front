import { useState, useEffect, useRef } from "react";
import LoadingOverlay from "../../../components/LoadingOverlay";
import api from "../../../services/api";
import CategoryScroll from "../components/CategoryScroll/CategoryScroll";
import Images from "../../../assets/image";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
 const [selectedIdx, setSelectedIdx] = useState(null);
 const [isOverflowing, setIsOverflowing] = useState(false);
 const scrollRef = useRef(null);
 const [startDate, setStartDate] = useState("");
 const [endDate, setEndDate] = useState("");
 const navigate = useNavigate();

 const [origin, setOrigin] = useState("");
 const [destination, setDestination] = useState("");
 const [loading, setLoading] = useState(false);

 function formatDateToInput(date) {
 return date.toISOString().split("T")[0];
 }

 const todayStr = formatDateToInput(new Date());

 const category = [
 "Hospedagens",
 "Passagens",
 "Carros",
 "Pacotes",
 "Atividades",
 "Cruzeiros",
 "Seguros",
 "Ofertas",
 "Destinos",
 "Blog",
 ];

 useEffect(() => {
 const checkOverflow = () => {
 if (scrollRef.current) {
 setIsOverflowing(
 scrollRef.current.scrollWidth > scrollRef.current.clientWidth
 );
 }
 };

 checkOverflow();
 window.addEventListener("resize", checkOverflow);

 return () => {
 window.removeEventListener("resize", checkOverflow);
 };
 }, []);

 const handleSearch = async () => {
    if (!origin || !destination || !startDate || !endDate) {
      alert("Preencha todos os campos.");
      return;
    }
    setLoading(true);
    try {
      const departureFormated = new Date(startDate).toISOString();
      const returnFormated = new Date(endDate).toISOString();

      const response = await api.get("/api/v1/packages/search", {
        params: {
          origin,
          destination,
          departureDate: departureFormated,
          returnDate: returnFormated,
        },
      });
      const packages = Array.isArray(response.data) ? response.data : [];
      const count = packages.length;
      setResultados(packages);
      navigate("/research-results", {
        state: {
          packages,
          count,
          origin,
          destination,
          startDate,
          endDate,
        },
      });
      console.log("Resultados:", response.data);
    } catch (error) {
      console.error("Erro ao buscar:", error);
      navigate("/research-results", {
        state: {
          packages: [],
          count: 0,
          origin,
          destination,
          startDate,
          endDate,
        },
      });
    } finally {
      // Simula atraso de 2 segundos antes de esconder o loading
      await new Promise(resolve => setTimeout(resolve, 4000));
      setLoading(false);
    }
  };


return (
  <>
    {loading && <LoadingOverlay />}
    <section className="relative bg-gray-100 pt-[320px] pb-10">
 <div
 className="absolute top-0 left-0 w-full h-[300px] bg-cover bg-center z-0"
 style={{ backgroundImage: `url(${Images.Bg_HeroSection})` }}
 >
 <div className="bg-black/40 w-full h-full" />
 </div>

 <div className="relative z-10 w-[90%] max-w-9xl mx-auto grid -mt-[230px]">
 <div className="w-full max-w-9xl mx-auto flex justify-start font-medium overflow-x-auto">
 <div className="relative w-full max-w-9xl mx-auto">
 {/* Lista de categorias */}
 <div
 ref={scrollRef}
 className="w-full overflow-x-auto scrollbar-hiden scroll-smooth"
 >
 <CategoryScroll
 category={category}
 selectedIdx={selectedIdx}
 setSelectedIdx={setSelectedIdx}
 />
 </div>
 </div>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_240px] gap-6 items-start w-full max-w-9xl mx-auto">
 <div className="bg-white shadow-xl p-4 sm:p-6 flex flex-col gap-4">
 <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
 <div className="text-xl sm:text-2xl font-bold tracking-widest">
 --------- ------- --------
 </div>
 <button className="text-xs font-semibold bg-[#E9EAFD] text-[#1877F2] border-2 border-[#1877F2] px-4 py-1 rounded-full whitespace-nowrap">
 PROMOÇÕES TODOS OS DIAS
 </button>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
 <div className="flex flex-col">
 <label className="text-sm text-gray-600 mb-1">
 Onde você está?
 </label>
 <input
 type="text"
 name="origin"
 placeholder="Ex: Recife"
 className="px-4 py-2 border rounded-md w-full text-sm"
 value={origin}
 onChange={(e) => setOrigin(e.target.value)}
 />

 <div className="mt-2 flex items-center text-xs text-gray-500">
 <input id="workTrip" type="checkbox" className="mr-2" />
 <label htmlFor="workTrip">Estou viajando a trabalho</label>
 </div>
 </div>
 <div className="flex flex-col">
 <label className="text-sm text-gray-600 mb-1">
 Para onde você vai?
 </label>
 <input
 type="text"
 name="destination"
 placeholder="Ex: Rio de Janeiro"
 className="px-4 py-2 border rounded-md w-full text-sm"
 value={destination}
 onChange={(e) => setDestination(e.target.value)}
 />
 </div>

 <div className="flex flex-col">
 <label className="text-sm text-gray-600 mb-1">
 Escolha as datas
 </label>
 <div className="grid grid-cols-2 gap-2">
 <input
 type="date"
 name="departureDate"
 className="px-3 py-2 border rounded-md text-sm w-full"
 min={todayStr}
 aria-label="Data de ida"
 onChange={(e) => {
 setStartDate(e.target.value);

 if (endDate && e.target.value > endDate) {
 setEndDate("");
 }
 }}
 placeholder="Check-in"
 />

 <input
 type="date"
 name="returnDate"
 className="px-3 py-2 border rounded-md text-sm w-full"
 aria-label="Data de volta"
 value={endDate}
 min={startDate || todayStr}
 onChange={(e) => setEndDate(e.target.value)}
 placeholder="Check-out"
 disabled={!startDate}
 />
 </div>
 </div>
 <div className="flex flex-col items-center justify-center">

 <button onClick={handleSearch} className="bg-[#1877F2] text-white p-2 rounded-md shadow-md hover:bg-[#165ecb] transition">
 <svg
 xmlns="http://www.w3.org/2000/svg"
 className="h-5 w-5"
 fill="none"
 viewBox="0 0 24 24"
 stroke="currentColor"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
 />
 </svg>
 </button>
 </div>

 </div>
 </div>

 <div className="w-full xl:w-[240px] bg-white shadow-md p-4 flex flex-col justify-between">
 <div>
 <p className="text-sm font-semibold">Ad</p>
 <p className="text-xs text-gray-400">https://www.google.com.br</p>
 </div>
 <div className="mt-6 text-blue-600 text-xl">⭐⭐⭐⭐⭐</div>
 </div>
 </div>
 </div>
</section>



</>
);
};

export default HeroSection;

