export default function RatingsList({ ratings }) {
  if (!ratings || ratings.length === 0) return null;
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Avaliações do pacote</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ratings.map((review, i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold">{review.userName || 'Usuário'}</p>
              <span className="text-blue-600 text-sm">{'★'.repeat(review.rating)}</span>
            </div>
            <p className="text-sm text-gray-600">{review.comment || ''}</p>
          </div>
        ))}
      </div>
    </div>
  );
}