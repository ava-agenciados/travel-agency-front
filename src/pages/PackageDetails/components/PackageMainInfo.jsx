export default function PackageMainInfo({ name, destination, description }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900">{name || 'Pacote de viagem'}</h2>
      <p className="text-sm text-gray-500">{destination || 'Destino desconhecido'}</p>
      <p className="mt-2 text-gray-700">{description || 'Sem descrição.'}</p>
    </div>
  );
}
