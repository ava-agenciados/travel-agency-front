export default function AuthorInfo({ author }) {
  return (
    <div className="flex items-center gap-4 border-t pt-6">
      <img
        src="https://viajandobem.com.br/wp-content/uploads/2023/04/rod-long-2P_ifaetDm0-unsplash-scaled.jpg"
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
