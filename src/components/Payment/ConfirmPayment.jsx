const ConfirmPayment = () => {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
      <h4 className="text-sm font-bold mb-2">Resumo</h4>
      <div className="flex flex-col gap-1 text-xs">
        <div className="flex justify-between"><span>Pacote</span><span>1.200</span></div>
        <div className="flex justify-between"><span>Impostos</span><span>34,65</span></div>
        <div className="flex justify-between"><span className="text-blue-600 cursor-pointer hover:underline">Cupons</span><span className="text-blue-600">DECOLA6</span></div>
        <div className="flex justify-between"><span className="text-blue-600 cursor-pointer hover:underline">Desconto no pix</span><span className="text-blue-600">-48,66</span></div>
        <div className="flex justify-between"><span className="text-blue-600">-300,00</span></div>
      </div>
      <div className="flex justify-between font-bold text-base mt-2">
        <span>Total</span>
        <span>868,34</span>
      </div>
      <button className="mt-4 bg-[#223A5F] text-white font-bold rounded-lg py-2">Confirmar pedido</button>
    </div>
  );
};

export default ConfirmPayment;
