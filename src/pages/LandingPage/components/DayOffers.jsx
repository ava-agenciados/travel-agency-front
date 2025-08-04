import DayOfferCard from "./DayOfferCard";
import { useEffect, useState } from "react";
import api from "../../../services/api";

const DayOffers = () => {

    const [offers, setOffers] = useState([]);
    const BASE_URL = "https://localhost:8080/";

    useEffect(() => {
      async function fetchOffers() {
        try {
          const res = await api.get("/api/v1/packages");
          const filtered = (Array.isArray(res.data) ? res.data : []).filter(pkg => pkg.discountPercent && pkg.discountPercent > 0);
          const mapped = filtered.map(pkg => ({
            id: pkg.id,
            name: pkg.name,
            destination: pkg.destination,
            departureDate: pkg.departureDate || pkg.startDate || pkg.start_date,
            returnDate: pkg.returnDate || pkg.endDate || pkg.end_date,
            discountPercent: pkg.discountPercent,
            price: pkg.price,
            imageUrl: pkg.packageMedia && pkg.packageMedia.length > 0
              ? (pkg.packageMedia[0].mediaUrl.startsWith('http') ? pkg.packageMedia[0].mediaUrl : BASE_URL + pkg.packageMedia[0].mediaUrl)
              : 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
          }));
          setOffers(mapped);
        } catch (e) {
          setOffers([]);
        }
      }
      fetchOffers();
    }, []);

    return (
        <section className="bg-gray-100 pb-10">
            <div className="bg-white w-full max-w-9xl mx-auto p-6">
                <h2 className="text-xl font-bold mb-1">OFERTAS DO DIA</h2>
                <p className="text-[0.5rem] mb-4">ATÉ O ESTOQUE DAS RESERVAS ACABAREM</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 place-items-center">
                  {offers.length === 0 ? (
                    <span className="col-span-full text-gray-400 text-center py-8">Nenhuma oferta disponível no momento.</span>
                  ) : (
                    offers.map(pkg => (
                      <DayOfferCard key={pkg.id} pkg={pkg} />
                    ))
                  )}
                </div>
            </div>
        </section>
    )
}

export default DayOffers