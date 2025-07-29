

import { useEffect, useState } from "react";

const RatingsContent = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pkgPage, setPkgPage] = useState(1);
  const COMMENTS_PER_PAGE = 7;
  const PACKAGES_PER_PAGE = 7;

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/v1/dashboard/packages/all");
        if (!res.ok) throw new Error("Erro ao buscar pacotes");
        const data = await res.json();
        setPackages(data);
      } catch (err) {
        setError(err.message || "Erro ao buscar pacotes");
      }
      setLoading(false);
    };
    fetchPackages();
  }, []);

  // Calcula média das avaliações
  const getAverage = (ratings) => {
    if (!ratings || ratings.length === 0) return '-';
    const sum = ratings.reduce((acc, r) => acc + (Number(r.rating) || 0), 0);
    return (sum / ratings.length).toFixed(1);
  };

  const handleView = (pkg) => {
    setSelectedPackage(pkg);
    setShowModal(true);
    setCurrentPage(1);
  };

  const handleDelete = async (ratingId, pkgId) => {
    if (!window.confirm("Tem certeza que deseja excluir esta avaliação?")) return;
    setDeletingId(ratingId);
    try {
      const res = await fetch(`/api/v1/dashboard/packages/ratings/${ratingId}`, { method: 'DELETE' });
      if (res.ok) {
        // Atualiza a lista de pacotes e avaliações após exclusão
        const updatedRes = await fetch("/api/v1/dashboard/packages/all");
        if (updatedRes.ok) {
          const data = await updatedRes.json();
          setPackages(data);
        }
      } else {
        alert("Erro ao excluir avaliação.");
      }
    } catch {
      alert("Erro ao excluir avaliação.");
    }
    setDeletingId(null);
  };

  return (
    <div className="w-full max-w-7xl flex-1 mx-auto rounded-lg bg-white p-2 md:p-10 flex flex-col justify-start shadow-xl mt-4 md:mt-16 overflow-auto" style={{ minHeight: '400px', maxHeight: 'calc(100vh - 6rem)' }}>
      <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 mt-4 md:mt-6 text-center">Avaliações</h2>
      {loading ? (
        <p>Carregando avaliações...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : packages.length === 0 ? (
        <p className="text-gray-500">Nenhum pacote encontrado.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Pacote</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Origem</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Destino</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Comentários</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Média</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {packages
                .slice((pkgPage - 1) * PACKAGES_PER_PAGE, pkgPage * PACKAGES_PER_PAGE)
                .map((pkg, idx) => (
                  <tr key={pkg.id || pkg.packageId || idx} className="hover:bg-blue-50">
                    <td className="px-4 py-2 whitespace-nowrap font-bold">{pkg.nome || pkg.name || 'Sem nome'}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{pkg.origin}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{pkg.destination}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{pkg.ratings ? pkg.ratings.length : 0}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{getAverage(pkg.ratings)}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <button onClick={() => handleView(pkg)} className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 text-sm flex items-center gap-2" title="Visualizar comentários">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        Visualizar
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {/* Paginação de pacotes */}
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              onClick={() => setPkgPage((p) => Math.max(1, p - 1))}
              disabled={pkgPage === 1}
            >
              Anterior
            </button>
            <span className="mx-2 text-sm">Página {pkgPage} de {Math.ceil(packages.length / PACKAGES_PER_PAGE)}</span>
            <button
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              onClick={() => setPkgPage((p) => Math.min(Math.ceil(packages.length / PACKAGES_PER_PAGE), p + 1))}
              disabled={pkgPage === Math.ceil(packages.length / PACKAGES_PER_PAGE)}
            >
              Próxima
            </button>
          </div>
        </div>
      )}
      {/* Modal de comentários do pacote com paginação */}
      {showModal && selectedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full p-10 relative animate-fadeIn flex flex-col gap-4 max-h-[90vh] overflow-y-auto min-w-[700px]">
            <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold">&times;</button>
            <h3 className="text-2xl font-bold mb-2">{selectedPackage.nome || selectedPackage.name}</h3>
            <div className="mb-2 text-gray-600">{selectedPackage.descricao || selectedPackage.description}</div>
            {selectedPackage.ratings && selectedPackage.ratings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Usuário</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Comentário</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Nota</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {selectedPackage.ratings
                      .slice((currentPage - 1) * COMMENTS_PER_PAGE, currentPage * COMMENTS_PER_PAGE)
                      .map((rating, rIdx) => (
                        <tr key={rating.id || rIdx} className="hover:bg-blue-50">
                          <td className="px-4 py-2 whitespace-nowrap">{rating.user?.name || rating.userName || rating.user?.email || rating.userEmail || '-'}</td>
                          <td className="px-4 py-2 whitespace-nowrap max-w-xs truncate">{rating.comment}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-yellow-500 font-bold">{rating.rating}★</td>
                          <td className="px-4 py-2 whitespace-nowrap flex gap-2">
                            <button onClick={() => handleDelete(rating.id, selectedPackage.id || selectedPackage.packageId)} className="p-2 rounded hover:bg-red-100 text-red-600" title="Excluir" disabled={deletingId === rating.id}>
                              {deletingId === rating.id ? (
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {/* Paginação */}
                <div className="flex justify-center items-center gap-2 mt-4">
                  <button
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </button>
                  <span className="mx-2 text-sm">Página {currentPage} de {Math.ceil(selectedPackage.ratings.length / COMMENTS_PER_PAGE)}</span>
                  <button
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                    onClick={() => setCurrentPage((p) => Math.min(Math.ceil(selectedPackage.ratings.length / COMMENTS_PER_PAGE), p + 1))}
                    disabled={currentPage === Math.ceil(selectedPackage.ratings.length / COMMENTS_PER_PAGE)}
                  >
                    Próxima
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-gray-400 italic">Nenhuma avaliação para este pacote.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RatingsContent;
