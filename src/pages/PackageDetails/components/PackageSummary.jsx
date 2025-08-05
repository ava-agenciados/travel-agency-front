export default function PackageSummary({ price }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6 h-fit">
      <h4 className="text-sm font-semibold text-gray-700">Resumo</h4>
      <div className="flex flex-col gap-2">
        <input type="date" className="border rounded px-3 py-2 text-sm" defaultValue="2005-03-01" />
        <input type="date" className="border rounded px-3 py-2 text-sm" defaultValue="2005-03-01" />
      </div>
      <div>
        <p className="text-lg font-bold text-green-500">{price ? `R$ ${price}` : 'Preço não informado'}</p>
      </div>
      <button className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2 rounded">
        Reservar
      </button>
      <p className="text-xs text-gray-500 text-center">Ainda não haverá cobranças</p>
    </div>
  );
}
