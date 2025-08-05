
const ConfirmPayment = ({ onConfirm, price = 0, companionsCount = 0, discount = 0 }) => {
  // Garante que o valor seja sempre string formatada corretamente
  const formattedPrice = Number(price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
      <h4 className="text-sm font-bold mb-2">Resumo</h4>
      <div className="flex flex-col gap-1 text-xs">
        <div className="flex justify-between">
          <span>Pacote</span>
          <span>{formattedPrice}</span>
        </div>
        <div className="flex justify-between">
          <span>Acompanhantes</span>
          <span>{companionsCount}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-700">
            <span>Desconto PIX</span>
            <span>-{discount}%</span>
          </div>
        )}
      </div>
      <div className="flex justify-between font-bold text-base mt-2">
        <span>Total</span>
        <span>{formattedPrice}</span>
      </div>
      <button className="mt-4 bg-[#223A5F] text-white font-bold rounded-lg py-2" onClick={onConfirm}>Confirmar pedido</button>
    </div>
  );
};

export default ConfirmPayment;
