const BannerPackage = () => {
    return (
        <section className='pt-10'>
            <div className="relative max-w-9xl rounded-sm mx-auto h-[500px] overflow-hidden">
                <img
                    src="https://wallpapers.com/images/featured/paisagem-ultra-hd-de-4k-ww6dqnuz07kgocjw.jpg"
                    alt="Banner"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 flex items-center justify-between px-8 md:px-16 bg-black bg-opacity-40">
                    <div className="text-white max-w-lg space-y-4">
                        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                            Escolha o pacote <br />ideal para o seu bolso
                        </h1>
                        <p className="text-sm md:text-base leading-relaxed">
                    Escolha o melhor plano que se encaixa em suas preferências Escolha o melhor plano que se encaixa em suas preferências
                </p>
                <button className="bg-white text-black font-semibold rounded-full px-6 py-2 shadow hover:bg-gray-100 transition">
                    Saiba mais +
                </button>
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