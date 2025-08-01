export default function AuthorInfo({ author }) {
  return (
    <div className="flex items-center gap-4 border-t pt-6">
      <img
        src="https://randomuser.me/api/portraits/men/32.jpg"
        alt="Autor"
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <p className="text-sm text-gray-500">Publicado por</p>
        <p className="font-semibold">{author || 'Operadora de viagem'}</p>
      </div>
    </div>
  );
}
