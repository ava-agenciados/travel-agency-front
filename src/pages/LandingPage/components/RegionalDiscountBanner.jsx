import React from 'react'

const RegionalDiscountBanner = () => {
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
                {[...Array(12)].map((_, idx) => {
                    const destinos = [
                    { nome: "Recife", precoOriginal: "6.439", precoAtual: "5.079", desconto: "-21%", img: "https://rodoviariaonline.com.br/wp-content/uploads/2019/04/original-0a2e45ef3ada481fc00e1f88d09b5e00.jpg" },
                    { nome: "Maceió", precoOriginal: "1.868", precoAtual: "1.786", desconto: "-4%", img: "https://rodoviariaonline.com.br/wp-content/uploads/2019/04/original-0a2e45ef3ada481fc00e1f88d09b5e00.jpg" },
                    { nome: "Aracaju", precoOriginal: "5.020", precoAtual: "4.820", desconto: "-4%", img: "https://rodoviariaonline.com.br/wp-content/uploads/2019/04/original-0a2e45ef3ada481fc00e1f88d09b5e00.jpg" },
                    { nome: "Natal", precoOriginal: "3.100", precoAtual: "2.558", desconto: "-12%", img: "https://rodoviariaonline.com.br/wp-content/uploads/2019/04/original-0a2e45ef3ada481fc00e1f88d09b5e00.jpg" }
                    ];
                    const destino = destinos[idx % destinos.length];

                    return (
                    <div key={idx} className="relative rounded-xl overflow-hidden shadow-md group">
                        <img
                        src={destino.img}
                        alt={destino.nome}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        {destino.desconto && (
                        <span className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded">
                            {destino.desconto}
                        </span>
                        )}

                        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4 text-white">
                        <h3 className="text-sm font-semibold">{destino.nome}</h3>
                        {destino.precoOriginal ? (
                            <>
                            <p className="text-[0.7rem] line-through opacity-80">DE R$ {destino.precoOriginal} POR</p>
                            <p className="text-lg font-bold">R$ {destino.precoAtual}</p>
                            </>
                        ) : (
                            <p className="text-sm font-bold">A PARTIR DE R$ {destino.precoAtual}</p>
                        )}

                        <button className="mt-2 border border-white rounded-full py-1 text-xs hover:bg-white hover:text-black transition">
                            VER MAIS
                        </button>
                        </div>
                    </div>
                    );
                })}
                </div>
            </div>
        </section>
    )
}

export default RegionalDiscountBanner