import Images from "../../../assets/image"

const DayOffers = () => {
    return (
        <section className="bg-gray-100 pb-10">
            <div className="bg-white w-full max-w-9xl mx-auto p-6">
                <h2 className="text-xl font-bold mb-1">OFERTAS DO DIA</h2>
                <p className="text-[0.5rem] mb-4">ATÉ O ESTOQUE DAS RESERVAS ACABAREM</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 place-items-center">
                    <img src={Images.Plan} alt="Plano" />
                    <img src={Images.Plan} alt="Plano" />
                    <img src={Images.Plan} alt="Plano" />
                    <img src={Images.Plan} alt="Plano" />
                </div>
            </div>
        </section>
    )
}

export default DayOffers
