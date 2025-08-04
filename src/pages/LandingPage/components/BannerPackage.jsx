import { useState } from 'react';

const BannerPackage = () => {
    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(true);
    }

    return (
        <section className='pt-10'>
            <div className="relative max-w-9xl rounded-sm mx-auto h-[500px] overflow-hidden">
                <img
                    src="https://wallpapers.com/images/featured/paisagem-ultra-hd-de-4k-ww6dqnuz07kgocjw.jpg"
                    alt="Banner"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 flex items-center justify-between px-8 md:px-16 bg-black bg-opacity-60">
                    <div className="text-white max-w-lg space-y-4">
                        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                            Escolha o pacote <br />ideal para o seu bolso
                        </h1>
                        <p className="text-sm md:text-xl font-bold leading-relaxed">
                    Aqui oferecemos pacotes de viagens incríveis para você aproveitar ao máximo suas férias.
                </p>
                 <p className="text-sm md:text-xl font-bold leading-relaxed">
                    Com descontos especiais, você pode viajar mais e gastar menos.
                </p>
                <button onClick={openModal} className="bg-white text-black font-semibold rounded-full px-6 py-2 shadow hover:bg-gray-100 transition">
                    Saiba mais +
                </button>
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                            <button onClick={() => setShowModal(false)} className="text-gray-900 px-4 py-2 font-bold  rounded hover:bg-gray-100">
                                X
                            </button>
                            <h2 className="text-xl text-gray-600 font-bold mb-4">Pacotes Disponíveis</h2>
                            <p className='text-gray-600'>Confira nossos pacotes de viagem incríveis!</p>
                        </div>
                    </div>
                )}

                </div>
                <div className='w-[150px]'>
                <img className='animate-float invert hidden sm:block' src="https://cdn-icons-png.flaticon.com/512/879/879757.png" alt="Icone de desconto" />

                </div>
            </div>

            </div>
        </section>
    )
}

export default BannerPackage
