import Images from "../../../assets/image"

const DiscountBanner = () => {
    return (
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
                <button className="bg-blue-600 text-white text-sm px-5 py-2 rounded-full hover:bg-blue-700 transition">
                    Quero comprar
                </button>
                <span className="text-[10px] text-gray-500 mt-1">*Consulte condições</span>
                </div>

            </div>
        </section>
    )
}

export default DiscountBanner
