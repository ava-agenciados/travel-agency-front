import Images from "../../../assets/image"

import { useState, useEffect } from "react";

const DiscountBanner = () => {
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("discountTicket") === "DECOLEI25") {
            setActive(true);
        }
    }, []);

    const handleSaveTicket = () => {
        setLoading(true);
        setTimeout(() => {
            localStorage.setItem("discountTicket", "DECOLEI25");
            setActive(true);
            setLoading(false);
        }, 1000);
    };

    return (
        <>
        <section className="bg-gradient-to-r from-[#EEF4F6] to-white py-4 px-6 my-20">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                    <p className="text-xl font-medium text-gray-700">
                        <strong>Garanta</strong> sua próxima viagem <br />
                        usando o cupom <strong className='font-black text-2xl'>DECOLEI25</strong>
                    </p>
                </div>
                <div className="text-gray-500">
                    <img src={Images.PalmTree} alt="Palmeira" className="w-[80px] hidden sm:block" />
                </div>
                <div className="text-center md:text-left">
                    <p className="text-6xl font-bold text-gray-600 flex items-end gap-1">
                        25
                        <span className="inline-flex flex-col items-center leading-none">
                            <span className="text-3xl font-normal">%</span>
                            <span className="text-sm font-extrabold text-gray-600 -mt-1">OFF</span>
                        </span>
                        <span className="inline-flex flex-col items-start leading-none">
                            <span className="text-sm font-medium hidden sm:block">na</span>
                            <span className="text-sm font-medium -mt-1 hidden sm:block">compra</span>
                        </span>
                        <span className="text-[0.5rem]"></span>
                    </p>
                </div>
                <div className="flex flex-col items-center md:items-end">
                    {active ? (
                        <button className="bg-orange-500 text-white text-sm px-5 py-2 rounded-full cursor-default">
                            Cupom ativo
                        </button>
                    ) : (
                        <button
                            onClick={handleSaveTicket}
                            className="bg-blue-600 text-white text-sm px-5 py-2 rounded-full hover:bg-blue-700 transition flex items-center justify-center min-w-[120px]"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4 mr-1 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                                </span>
                            ) : (
                                "Ativar Cupom"
                            )}
                        </button>
                    )}
                    <button
                        className="text-[10px] text-gray-500 mt-1 underline hover:text-blue-600"
                        onClick={() => setShowModal(true)}
                        type="button"
                    >
                        *Consulte condições
                    </button>
                </div>
            </div>
        </section>
        {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
                    <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                        onClick={() => setShowModal(false)}
                        aria-label="Fechar"
                    >
                        ×
                    </button>
                    <h2 className="text-lg font-bold mb-2">Condições do Cupom</h2>
                    <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                        <li>Válido para compras realizadas até 31/12/2025.</li>
                        <li>Desconto de 25% aplicado apenas no valor do pacote, não inclui taxas ou serviços adicionais.</li>
                        <li>Não cumulativo com outras promoções.</li>
                        <li>1 uso por CPF.</li>
                        <li>Sujeito à disponibilidade de vagas.</li>
                        <li>O cupom deve ser ativado antes de finalizar a compra.</li>
                    </ul>
                </div>
            </div>
        )}
        </>
    );
};

export default DiscountBanner;