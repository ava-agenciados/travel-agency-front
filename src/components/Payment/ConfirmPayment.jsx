
const ConfirmPayment = ({ onConfirm, price = 0 }) => {
  // Aqui você pode adicionar lógica de cupons/descontos se necessário
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
      <h4 className="text-sm font-bold mb-2">Resumo</h4>
      <div className="flex flex-col gap-1 text-xs">
        <div className="flex justify-between"><span>Pacote</span><span>{price ? `R$ ${price}` : '-'}</span></div>
      </div>
      <div className="flex justify-between font-bold text-base mt-2">
        <span>Total</span>
        <span>{price ? `R$ ${price}` : '-'}</span>
      </div>
      <button className="mt-4 bg-[#223A5F] text-white font-bold rounded-lg py-2" onClick={onConfirm}>Confirmar pedido</button>
    </div>
  );
};

export default ConfirmPayment;
