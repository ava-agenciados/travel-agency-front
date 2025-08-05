import { useEffect, useState } from 'react'
import ImageWithSkeleton from '../../../components/ImageWithSkeleton';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';

const RegionalDiscountBanner = () => {
    const [regionOffers, setRegionOffers] = useState([]);
    const navigate = useNavigate();
    const BASE_URL = "https://localhost:8080/";

    useEffect(() => {
        async function fetchPackages() {
            try {
                const res = await api.get("/api/v1/packages");
                const data = Array.isArray(res.data) ? res.data : [];
                // Agrupa por estado (state)
                const byState = {};
                data.forEach(pkg => {
                    const state = pkg.lodgingInfo?.location?.state || 'Outro';
                    if (!byState[state]) byState[state] = [];
                    byState[state].push(pkg);
                });
                // Para cada estado, monta card com faixa de preço (menor - maior), ignorando pacotes sem preço
                const cards = Object.entries(byState).map(([state, pkgs]) => {
                    // Só pacotes com preço válido
                    const pkgsWithPrice = pkgs.filter(p => typeof p.price === 'number' && !isNaN(p.price));
                    let min = null, max = null;
                    if (pkgsWithPrice.length > 0) {
                        // Calcula preço com desconto se houver, senão usa price
                        const prices = pkgsWithPrice.map(p => {
                            const discount = typeof p.discountPercent === 'number' && !isNaN(p.discountPercent) ? p.discountPercent : 0;
                            return Math.round(p.price * (1 - discount / 100));
                        });
                        min = Math.min(...prices);
                        max = Math.max(...prices);
                    }
                    // Pega o pacote com maior desconto para exibir imagem e destaque
                    const best = pkgs.reduce((a, b) => (a.discountPercent || 0) > (b.discountPercent || 0) ? a : b);
                    return {
                        state,
                        name: best.lodgingInfo?.location?.state || state,
                        img: best.packageMedia && best.packageMedia.length > 0
                            ? (best.packageMedia[0].mediaUrl.startsWith('http') ? best.packageMedia[0].mediaUrl : BASE_URL + best.packageMedia[0].mediaUrl)
                            : 'https://rodoviariaonline.com.br/wp-content/uploads/2019/04/original-0a2e45ef3ada481fc00e1f88d09b5e00.jpg',
                        faixaPreco: min !== null && max !== null && pkgsWithPrice.length > 0
                            ? (min === max
                                ? `R$ ${min.toLocaleString('pt-BR')}`
                                : `R$ ${min.toLocaleString('pt-BR')} - R$ ${max.toLocaleString('pt-BR')}`)
                            : 'Preço indisponível',
                        desconto: best.discountPercent ? `-${best.discountPercent}%` : '',
                        pkgs: pkgs,
                    };
                });
                setRegionOffers(cards);
            } catch (e) {
                setRegionOffers([]);
            }
        }
        fetchPackages();
    }, []);

    function handleSeeMore(state, pkgs) {
        // Filtra só os pacotes daquele estado
        navigate('/research-results', {
            state: {
                packages: pkgs,
                count: pkgs.length,
                stateFilter: state,
            },
        });
    }

    return (
        <section className="bg-gray-50 py-10 px-6">
            <div className="max-w-9xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div>
                        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">PACOTES COM ATÉ 20% DE DESCONTO</h2>
                        <p className="text-gray-600 text-sm mt-1">Saída:</p>
                    </div>
                    <button className="text-xs text-blue-600 border border-blue-500 px-4 py-2 rounded-full hover:bg-blue-50 transition">
                        PROMOÇÕES TODOS OS DIAS
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {regionOffers.length === 0 ? (
                        <span className="col-span-full text-gray-400 text-center py-8">Nenhuma oferta regional disponível.</span>
                    ) : (
                        regionOffers.map((destino, idx) => (
                            <div key={idx} className="relative rounded-xl overflow-hidden shadow-md group">
                                <ImageWithSkeleton
                                    src={destino.img}
                                    alt={destino.name}
                                    className="w-full h-40"
                                    imgStyle={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '0.75rem' }}
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4 text-white">
                                    <h3 className="text-sm font-semibold">{destino.state}</h3>
                                    <p className="text-sm font-bold">{destino.faixaPreco}</p>
                                    <button
                                        className="mt-2 border border-white rounded-full py-1 text-xs hover:bg-white hover:text-black transition"
                                        onClick={() => handleSeeMore(destino.state, destino.pkgs)}
                                    >
                                        VER MAIS
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    )
}

export default RegionalDiscountBanner