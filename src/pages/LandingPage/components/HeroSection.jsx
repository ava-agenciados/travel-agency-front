import { useState, useEffect, useRef } from "react";
import LoadingOverlay from "../../../components/LoadingOverlay";
import Skeleton from "../../../components/Skeleton";
import api from "../../../services/api";
import Images from "../../../assets/image";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  // Cookie policy popup
  const [showCookie, setShowCookie] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem('cookieAccepted')) {
      setShowCookie(true);
    }
  }, []);
  function handleAcceptCookie() {
    localStorage.setItem('cookieAccepted', 'true');
    setShowCookie(false);
  }
 const [isOverflowing, setIsOverflowing] = useState(false);
 const scrollRef = useRef(null);
 const [checkedDateFlex, setCheckedDateFlex] = useState(false);
 const [startDate, setStartDate] = useState("");
 const [endDate, setEndDate] = useState("");
 const navigate = useNavigate();

 const [origin, setOrigin] = useState("");
 const [destination, setDestination] = useState("");
 const [loading, setLoading] = useState(false);


// Função para formatar data yyyy-mm-dd (para input)
function formatDateToInput(date) {
  if (!date) return "";
  if (typeof date === "string" && date.match(/^\d{4}-\d{2}-\d{2}$/)) return date;
  const d = new Date(date);
  return d.toISOString().split("T")[0];
}

// Função para formatar data dd/mm/yyyy (para API)
function formatDateToAPI(dateStr) {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

const todayStr = formatDateToInput(new Date());

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
//  Funçao pra mudar o params do envio da requisição
 const handleSearch = async () => {
    if (!origin || !destination || !startDate || !endDate) {
      alert("Preencha todos os campos.");
      return;
    }
    setLoading(true);
    try {
      // Converte para formato dd/mm/yyyy apenas para a API
      const departureFormated = formatDateToAPI(startDate);
      const returnFormated = formatDateToAPI(endDate);

      let searchParams;
      if (checkedDateFlex) {
        searchParams = {
          origin,
          destination,
          departureDate: departureFormated,
          returnDate: returnFormated,
        };
        console.log("teste envio flexivel", searchParams);
      } else {
        searchParams = {
          origin,
          destination,
          departureDate: departureFormated,
          returnDate: returnFormated,
        };
        console.log("teste envio normal", searchParams);
      }

      const response = await api.get("/api/v1/packages/search", {
        params: searchParams,
      });
      let packages = Array.isArray(response.data) ? response.data : [];
      // Filtro pra checar se a data flexivel
      if (!checkedDateFlex) {
        packages = packages.filter(pkg => {
          const pkgDeparture = pkg.departureDate || pkg.departure_date;
          const pkgReturn = pkg.returnDate || pkg.return_date;
          return (
            pkgDeparture === departureFormated &&
            pkgReturn === returnFormated
          );
        });
      }
      const count = packages.length;
      navigate("/research-results", {
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
      // console.log("Resultados:", response.data);
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
          checkedDateFlex,
        },
      });
    } finally {
      // Simula atraso de 4 segundos antes de esconder o loading
      await new Promise(resolve => setTimeout(resolve, 4000));
      setLoading(false);
    }
  };


  return (
    <>
      {loading && <LoadingOverlay />}
      <section className="relative bg-gray-100 pt-[400px] pb-10">
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

 </div>
 </div>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_240px] gap-6 items-start w-full max-w-9xl mx-auto">
 <div className="bg-white shadow-xl p-4 sm:p-6 flex flex-col gap-4">
 <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
 <div className="oswald-uniquifier text-xl sm:text-2xl tracking-widest">
 Encontre seu destino ideal
 </div>
 <button className="text-xs font-semibold bg-[#E9EAFD] text-[#1877F2] border-2 border-[#1877F2] px-4 py-1 rounded-full whitespace-nowrap">
 PROMOÇÕES TODOS OS DIAS
 </button>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">

   {loading ? (
     <>
       <div className="flex flex-col">
         <Skeleton width="80%" height="16px" className="mb-2" />
         <Skeleton width="100%" height="40px" />
       </div>
       <div className="flex flex-col">
         <Skeleton width="80%" height="16px" className="mb-2" />
         <Skeleton width="100%" height="40px" />
       </div>
       <div className="flex flex-col">
         <Skeleton width="80%" height="16px" className="mb-2" />
         <div className="grid grid-cols-2 gap-2">
           <Skeleton width="100%" height="40px" />
           <Skeleton width="100%" height="40px" />
         </div>
       </div>
       <div className="flex flex-col items-center justify-center">
         <Skeleton width="48px" height="48px" circle />
       </div>
     </>
   ) : (
     <>
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
             value={startDate}
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
       <div className="col-span-full flex items-center mb-2">
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
     </>
   )}
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

      {/* Cookie Policy Popup */}
      {showCookie && (
        <div className="fixed bottom-0 left-0 w-full z-50 flex justify-center items-end">
          <div className="bg-gray-900 text-white rounded-t-lg shadow-lg p-4 mb-2 flex flex-col sm:flex-row items-center gap-4 max-w-xl w-full mx-2">
            <span className="text-sm flex-1">Este site utiliza cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa <span className="underline">política de cookies</span>.</span>
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-full transition"
              onClick={handleAcceptCookie}
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;