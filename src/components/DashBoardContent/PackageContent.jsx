
import { useState } from "react";
import BookingsContent from "./BookingsContent";
import RatingsContent from "./RatingsContent";

const API_BASE_URL = "https://localhost:8080"; // endereço real do backend para imagens e API

const DashBoardContent = ({ title, packages = [], onPackageUpdate }) => {

  // Estado para upload de mídia durante criação de pacote
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaError, setMediaError] = useState("");



  // Removido modal de upload separado

  const [showModal, setShowModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  // Estado para edição de pacote
  // Estado para visualização de mídias
  const [viewMediaLoading, setViewMediaLoading] = useState(false);
  const [viewMedia, setViewMedia] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState(null); // será preenchido ao abrir modal
  const [editMedia, setEditMedia] = useState([]); // mídias atuais do pacote
  const [editMediaFiles, setEditMediaFiles] = useState([]); // novas mídias para upload
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // Abrir modal de visualizar/editar
  const handleView = async (pkg) => {
    setSelectedPackage(pkg);
    setShowModal(true);
    setViewMediaLoading(true);
    setViewMedia([]);
    try {
      const res = await fetch(`/api/v1/dashboard/packages/${pkg.id}/media`);
      if (res.ok) {
        const media = await res.json();
        setViewMedia(Array.isArray(media) ? media : []);
      } else {
        setViewMedia([]);
      }
    } catch {
      setViewMedia([]);
    }
    setViewMediaLoading(false);
  };
  // Carregar mídias do pacote ao abrir modal de edição
  const handleOpenEdit = async (pkg) => {
    setEditForm(pkg);
    setShowEditModal(true);
    setEditLoading(true);
    setEditError("");
    setEditMedia([]);
    try {
      const res = await fetch(`/api/v1/dashboard/packages/${pkg.id}/media`);
      if (res.ok) {
        const media = await res.json();
        setEditMedia(Array.isArray(media) ? media : []);
      } else {
        setEditError('Erro ao carregar mídias do pacote.');
      }
    } catch (err) {
      setEditError('Erro ao carregar mídias do pacote.');
    }
    setEditLoading(false);
  };
  // Fechar modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedPackage(null);
  };
  // Estado do modal de criação
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: '',
    description: '',
    origin: '',
    destination: '',
    price: 0,
    activeFrom: '',
    activeUntil: '',
    beginDate: '',
    endDate: '',
    quantity: 0,
    isAvailable: true,
    imageUrl: '',
    packageMedia: [],
    ratings: [],
    discountPercent: 0,
    lodgingInfo: {
      baths: 0,
      beds: 0,
      wifiIncluded: false,
      parkingSpot: false,
      swimmingPool: false,
      fitnessCenter: false,
      restaurantOnSite: false,
      petAllowed: false,
      airConditioned: false,
      breakfast: false,
      location: {
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
        complement: ''
      }
    }
  });
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState('');

  // Funções auxiliares para o modal de criação
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    setCreateError("");
    setMediaError("");
    // Monta o payload conforme esperado pela API
    const payload = {
      name: createForm.name,
      description: createForm.description,
      origin: createForm.origin,
      destination: createForm.destination,
      price: Number(createForm.price),
      activeFrom: createForm.activeFrom || null,
      activeUntil: createForm.activeUntil || null,
      beginDate: createForm.beginDate || null,
      endDate: createForm.endDate || null,
      quantity: Number(createForm.quantity),
      isAvailable: !!createForm.isAvailable,
      imageUrl: createForm.imageUrl,
      ratings: createForm.ratings.map(r => ({
        rating: Number(r.rating),
        comment: r.comment
      })),
      discountPercent: Number(createForm.discountPercent) || 0,
      lodgingInfo: {
        ...createForm.lodgingInfo,
        baths: Number(createForm.lodgingInfo.baths),
        beds: Number(createForm.lodgingInfo.beds),
        wifiIncluded: !!createForm.lodgingInfo.wifiIncluded,
        parkingSpot: !!createForm.lodgingInfo.parkingSpot,
        swimmingPool: !!createForm.lodgingInfo.swimmingPool,
        fitnessCenter: !!createForm.lodgingInfo.fitnessCenter,
        restaurantOnSite: !!createForm.lodgingInfo.restaurantOnSite,
        petAllowed: !!createForm.lodgingInfo.petAllowed,
        airConditioned: !!createForm.lodgingInfo.airConditioned,
        breakfast: !!createForm.lodgingInfo.breakfast,
        location: {
          ...createForm.lodgingInfo.location
        }
      }
    };
    try {
      // Primeiro cria o pacote
      const res = await fetch('/api/v1/dashboard/packages/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        let created = null;
        try {
          created = await res.json();
        } catch (err) {
          console.error('Erro ao fazer parse do JSON de criação do pacote:', err);
        }
        console.log('Pacote criado:', created);
        // Tentar extrair o id do pacote de diferentes formas
        let packageId = undefined;
        if (created) {
          if (created.id) packageId = created.id;
          else if (created.packageId) packageId = created.packageId;
          else if (created.package && created.package.id) packageId = created.package.id;
          else if (created.data && created.data.id) packageId = created.data.id;
        }
        // Se não encontrou o id, buscar todos os pacotes e pegar o maior id
        async function getLastPackageId() {
          try {
            const allRes = await fetch('/api/v1/dashboard/packages/all');
            if (allRes.ok) {
              const allPackages = await allRes.json();
              if (Array.isArray(allPackages) && allPackages.length > 0) {
                // Considera o maior id como o último criado
                const last = allPackages.reduce((max, p) => (p.id > max ? p.id : max), allPackages[0].id);
                return last;
              }
            }
          } catch (err) {
            console.error('Erro ao buscar todos os pacotes para obter o último id:', err);
          }
          return undefined;
        }
        (async () => {
          if (!packageId) {
            console.warn('packageId não encontrado após criação do pacote. Buscando todos os pacotes...');
            packageId = await getLastPackageId();
            console.log('packageId obtido via busca:', packageId);
          }
          console.log('mediaFiles:', mediaFiles);
          // Se houver arquivos de mídia, faz upload
          if (packageId && mediaFiles.length > 0) {
            setMediaLoading(true);
            const formData = new FormData();
            mediaFiles.forEach(file => formData.append('media', file));
            try {
              console.log('Enviando mídia para o pacote:', packageId, formData);
              const uploadRes = await fetch(`/api/v1/dashboard/packages/${packageId}/add-midia`, {
                method: 'POST',
                body: formData
              });
              if (!uploadRes.ok) {
                setMediaError('Erro ao enviar mídia.');
              }
            } catch (err) {
              setMediaError('Erro ao enviar mídia.');
              console.error('Erro no upload de mídia:', err);
            }
            setMediaLoading(false);
          } else {
            if (!packageId) console.warn('packageId não encontrado após criação e busca.');
            if (!mediaFiles.length) console.warn('Nenhum arquivo de mídia selecionado.');
          }
        })();
        setShowCreateModal(false);
        setCreateForm({
          name: '', description: '', origin: '', destination: '', price: 0, activeFrom: '', activeUntil: '', beginDate: '', endDate: '', quantity: 0, isAvailable: true, imageUrl: '', packageMedia: [], ratings: [], discountPercent: 0,
          lodgingInfo: {
            baths: 0,
            beds: 0,
            wifiIncluded: false,
            swimmingPool: false,
            fitnessCenter: false,
            restaurantOnSite: false,
            petAllowed: false,
            airConditioned: false,
            breakfast: false,
            location: {
              street: '',
              number: '',
              neighborhood: '',
              city: '',
              state: '',
              country: '',
              zipCode: '',
              complement: ''
            }
          }
        });
        setMediaFiles([]);
        setCreateError("");
        setCreateLoading(false);
        return;
      } else {
        const err = await res.text();
        setCreateError('Erro ao criar pacote: ' + err);
      }
    } catch (err) {
      console.error('Erro ao criar pacote:', err);
      setCreateError('Erro ao criar pacote.');
    }
    setCreateLoading(false);
  };

  // Upload de mídia (agora dentro do modal de criação)
  const handleMediaChange = (e) => {
    setMediaFiles(Array.from(e.target.files));
  };
        {/* Upload de mídia agora dentro do modal de criação */}
  const handleAddRatingField = () => {
    setCreateForm((prev) => ({
      ...prev,
      ratings: [...prev.ratings, { rating: 0, comment: '' }]
    }));
  };
  const handleRemoveRatingField = (idx) => {
    setCreateForm((prev) => ({
      ...prev,
      ratings: prev.ratings.filter((_, i) => i !== idx)
    }));
  };
  const handleRatingChange = (idx, field, value) => {
    setCreateForm((prev) => {
      const updated = [...prev.ratings];
      updated[idx][field] = value;
      return { ...prev, ratings: updated };
    });
  };

  // Excluir pacote
  const handleDelete = async (pkg) => {
    if (!window.confirm(`Tem certeza que deseja excluir o pacote "${pkg.nome || pkg.name}"?`)) return;
    const packageId = pkg.id || pkg.packageId;
    try {
      const res = await fetch(`/api/v1/dashboard/packages/delete/${packageId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        alert('Pacote excluído com sucesso!');
        window.location.reload();
      } else {
        alert('Erro ao excluir pacote.');
      }
    } catch {
      alert('Erro ao excluir pacote.');
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Paginação dos pacotes
  let paginatedPackages = [];
  let totalPages = 1;
  const itemsPerPage = 7;
  if (title === 'Pacotes') {
        // ...modal de exemplo removido para evitar conflito com o modal real de upload de mídia...
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    paginatedPackages = packages.slice(startIdx, endIdx);
    totalPages = Math.ceil(packages.length / itemsPerPage) || 1;
  }

  if (title === 'Pacotes') {
    return (
      <>
        <div className="w-full max-w-7xl flex-1 mx-auto rounded-lg bg-white p-10 flex flex-col justify-start shadow-xl mt-16 overflow-auto" style={{ minHeight: '400px', maxHeight: 'calc(100vh - 6rem)' }}>
          <h2 className="text-3xl font-bold mb-6 mt-6 text-center">Pacotes</h2>
          <div className="flex justify-end mb-4 gap-2">
            <button onClick={() => setShowCreateModal(true)} className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 text-base font-semibold shadow">Novo Pacote</button>
          </div>
          {packages.length === 0 ? (
            <p className="text-gray-500 text-center">Nenhum pacote encontrado.</p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">ID</th>
                      <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">Nome</th>
                      <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">Descrição</th>
                      <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">Preço</th>
                      <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {paginatedPackages.map((pkg, idx) => (
                      <tr key={pkg.id || idx} className="hover:bg-blue-50">
                        <td className="px-4 py-2 whitespace-nowrap text-center font-medium">{pkg.id}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-center">{pkg.name || 'Sem nome'}</td>
                        <td className="px-4 py-2 max-w-xs truncate text-center" title={pkg.description || '-'}>
                          {pkg.description && pkg.description.length > 60 ? pkg.description.slice(0, 60) + '...' : (pkg.description || '-')}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-center">R$ {pkg.price != null ? pkg.price : '-'}</td>
                        <td className="px-4 py-2 whitespace-nowrap flex gap-2 justify-center">
                          {/* Botão de visualizar */}
                          <button onClick={() => handleView(pkg)} className="p-2 rounded hover:bg-blue-100 text-blue-600" title="Visualizar">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                          </button>
                          {/* Botão de editar */}
                          <button onClick={() => {
                            handleOpenEdit(pkg);
                          }} className="p-2 rounded hover:bg-yellow-100 text-yellow-600" title="Editar">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.1 2.1 0 0 1 2.97 2.97L8.978 18.312a4.2 4.2 0 0 1-1.768 1.05l-3.15.9a.6.6 0 0 1-.74-.74l.9-3.15a4.2 4.2 0 0 1 1.05-1.768L16.862 4.487Z" />
                            </svg>
                          </button>
                          {/* Botão de excluir */}
                          <button onClick={() => handleDelete(pkg)} className="p-2 rounded hover:bg-red-100 text-red-600" title="Excluir">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Paginação */}
              <div className="flex justify-center items-center gap-2 mt-4">
                <button
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Anterior
                </button>
                <span className="mx-2 text-sm">Página {currentPage} de {totalPages}</span>
                <button
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Próxima
                </button>
              </div>
            </>
          )}
        </div>
        {/* Modal de edição de pacote (estrutura base, implementação dos campos e mídias virá em seguida) */}
        {showEditModal && editForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full p-8 relative animate-fadeIn flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
              <button onClick={() => setShowEditModal(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold">&times;</button>
              <h3 className="text-2xl font-semibold mb-4">Editar Pacote</h3>
              {/* Fotos do pacote no topo */}
              {editMedia.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center mb-2">
                  {editMedia.filter(m => m.name && m.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)).map((media, idx) => (
                    <img key={idx} src={`${API_BASE_URL}/uploads/${editForm.id}/${media.name}`} alt={media.name} className="w-32 h-20 object-cover rounded shadow" />
                  ))}
                </div>
              )}
              {editLoading ? (
                <div className="text-blue-500">Carregando mídias...</div>
              ) : (
                <form
                  className="flex flex-col gap-3"
                  onSubmit={async e => {
                    e.preventDefault();
                    setEditLoading(true);
                    setEditError("");
                    // Monta o payload PATCH
                    const patchPayload = {
                      name: editForm.name,
                      description: editForm.description,
                      price: Number(editForm.price),
                      origin: editForm.origin,
                      destination: editForm.destination,
                      activeFrom: editForm.activeFrom || null,
                      activeUntil: editForm.activeUntil || null,
                      beginDate: editForm.beginDate || null,
                      endDate: editForm.endDate || null,
                      quantity: Number(editForm.quantity),
                      isAvailable: !!editForm.isAvailable,
                      imageUrl: editForm.imageUrl,
                      lodgingInfo: editForm.lodgingInfo || {},
                    };
                    try {
                      // Atualiza dados do pacote
                      const res = await fetch(`/api/v1/dashboard/packages/update/${editForm.id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(patchPayload)
                      });
                      if (!res.ok) {
                        setEditError('Erro ao atualizar pacote.');
                        setEditLoading(false);
                        return;
                      }
                      // Upload de novas mídias
                      if (editMediaFiles.length > 0) {
                        const formData = new FormData();
                        editMediaFiles.forEach(file => formData.append('media', file));
                        const uploadRes = await fetch(`/api/v1/dashboard/packages/${editForm.id}/add-midia`, {
                          method: 'POST',
                          body: formData
                        });
                        if (!uploadRes.ok) {
                          setEditError('Erro ao enviar nova mídia.');
                          setEditLoading(false);
                          return;
                        }
                      }
                      // Buscar lista atualizada de pacotes após edição
                      try {
                        const allRes = await fetch('/api/v1/dashboard/packages/all');
                        if (allRes.ok) {
                          const allPackages = await allRes.json();
                          if (typeof onPackageUpdate === 'function') {
                            onPackageUpdate(null, allPackages); // novo contrato: (updatedPackage, allPackages)
                          }
                        }
                      } catch (err) {
                        // Se falhar, não impede o fechamento do modal
                        console.error('Erro ao buscar pacotes atualizados:', err);
                      }
                      setShowEditModal(false);
                      setEditForm(null);
                      setEditMedia([]);
                      setEditMediaFiles([]);
                      setEditError("");
                      setEditLoading(false);
                    } catch (err) {
                      setEditError('Erro ao atualizar pacote.');
                      setEditLoading(false);
                    }
                  }}
                >
                  <label className="flex flex-col gap-1">
                    Nome
                    <input type="text" className="border rounded px-2 py-1" value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} required />
                  </label>
                  <label className="flex flex-col gap-1">
                    Descrição
                    <textarea className="border rounded px-2 py-1 min-h-[60px]" value={editForm.description} onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))} required />
                  </label>
                  <label className="flex flex-col gap-1">
                    Origem
                    <input type="text" className="border rounded px-2 py-1" value={editForm.origin} onChange={e => setEditForm(f => ({ ...f, origin: e.target.value }))} required />
                  </label>
                  <label className="flex flex-col gap-1">
                    Destino
                    <input type="text" className="border rounded px-2 py-1" value={editForm.destination} onChange={e => setEditForm(f => ({ ...f, destination: e.target.value }))} required />
                  </label>
                  <label className="flex flex-col gap-1">
                    Preço
                    <input type="number" className="border rounded px-2 py-1" value={editForm.price} onChange={e => setEditForm(f => ({ ...f, price: e.target.value }))} required min="0" />
                  </label>
                  <label className="flex flex-col gap-1">
                    Desconto (%)
                    <input type="number" className="border rounded px-2 py-1" value={editForm.discountPercent || 0} onChange={e => setEditForm(f => ({ ...f, discountPercent: e.target.value }))} min="0" max="100" />
                  </label>
                  <label className="flex flex-col gap-1">
                    Data de início (opcional)
                    <input type="date" className="border rounded px-2 py-1" value={editForm.activeFrom ? editForm.activeFrom.slice(0,10) : ''} onChange={e => setEditForm(f => ({ ...f, activeFrom: e.target.value }))} />
                  </label>
                  <label className="flex flex-col gap-1">
                    Data de término (opcional)
                    <input type="date" className="border rounded px-2 py-1" value={editForm.activeUntil ? editForm.activeUntil.slice(0,10) : ''} onChange={e => setEditForm(f => ({ ...f, activeUntil: e.target.value }))} />
                  </label>
                  <label className="flex flex-col gap-1">
                    Data de saída (opcional)
                    <input type="date" className="border rounded px-2 py-1" value={editForm.beginDate ? editForm.beginDate.slice(0,10) : ''} onChange={e => setEditForm(f => ({ ...f, beginDate: e.target.value }))} />
                  </label>
                  <label className="flex flex-col gap-1">
                    Data de retorno (opcional)
                    <input type="date" className="border rounded px-2 py-1" value={editForm.endDate ? editForm.endDate.slice(0,10) : ''} onChange={e => setEditForm(f => ({ ...f, endDate: e.target.value }))} />
                  </label>
                  <label className="flex flex-col gap-1">
                    Quantidade
                    <input
                      type="number"
                      className="border rounded px-2 py-1"
                      value={typeof editForm.quantity === 'number' ? editForm.quantity : (editForm.quantity ? Number(editForm.quantity) : '')}
                      onChange={e => setEditForm(f => ({ ...f, quantity: e.target.value }))}
                      required
                      min="0"
                    />
                  </label>
                  <label className="flex flex-row gap-2 items-center">
                    <input type="checkbox" checked={!!editForm.isAvailable} onChange={e => setEditForm(f => ({ ...f, isAvailable: e.target.checked }))} /> Disponível
                  </label>
                  <label className="flex flex-col gap-1">
                    URL da Imagem (opcional)
                    <input type="text" className="border rounded px-2 py-1" value={editForm.imageUrl} onChange={e => setEditForm(f => ({ ...f, imageUrl: e.target.value }))} />
                  </label>
                  {/* Hospedagem (opcional) */}
                  <div className="flex flex-col gap-2 mt-2 p-2 border rounded bg-gray-50">
                    <span className="font-semibold">Informações de Hospedagem</span>
                    <div className="grid grid-cols-2 gap-2">
                      <label className="flex flex-col gap-1">
                        Banheiros
                        <input type="number" min="0" className="border rounded px-2 py-1" value={editForm.lodgingInfo?.baths || 0} onChange={e => setEditForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, baths: e.target.value } }))} />
                      </label>
                      <label className="flex flex-col gap-1">
                        Camas
                        <input type="number" min="0" className="border rounded px-2 py-1" value={editForm.lodgingInfo?.beds || 0} onChange={e => setEditForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, beds: e.target.value } }))} />
                      </label>
                      <label className="flex flex-row gap-2 items-center">
                        <input type="checkbox" checked={!!editForm.lodgingInfo?.wifiIncluded} onChange={e => setEditForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, wifiIncluded: e.target.checked } }))} /> Wi-Fi
                      </label>
                      <label className="flex flex-row gap-2 items-center">
                        <input type="checkbox" checked={!!editForm.lodgingInfo?.parkingSpot} onChange={e => setEditForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, parkingSpot: e.target.checked } }))} /> Estacionamento
                      </label>
                      <label className="flex flex-row gap-2 items-center">
                        <input type="checkbox" checked={!!editForm.lodgingInfo?.swimmingPool} onChange={e => setEditForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, swimmingPool: e.target.checked } }))} /> Piscina
                      </label>
                      <label className="flex flex-row gap-2 items-center">
                        <input type="checkbox" checked={!!editForm.lodgingInfo?.fitnessCenter} onChange={e => setEditForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, fitnessCenter: e.target.checked } }))} /> Academia
                      </label>
                      <label className="flex flex-row gap-2 items-center">
                        <input type="checkbox" checked={!!editForm.lodgingInfo?.restaurantOnSite} onChange={e => setEditForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, restaurantOnSite: e.target.checked } }))} /> Restaurante
                      </label>
                      <label className="flex flex-row gap-2 items-center">
                        <input type="checkbox" checked={!!editForm.lodgingInfo?.petAllowed} onChange={e => setEditForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, petAllowed: e.target.checked } }))} /> Pet Friendly
                      </label>
                      <label className="flex flex-row gap-2 items-center">
                        <input type="checkbox" checked={!!editForm.lodgingInfo?.airConditioned} onChange={e => setEditForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, airConditioned: e.target.checked } }))} /> Ar Condicionado
                      </label>
                      <label className="flex flex-row gap-2 items-center">
                        <input type="checkbox" checked={!!editForm.lodgingInfo?.breakfast} onChange={e => setEditForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, breakfast: e.target.checked } }))} /> Café da Manhã
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <label className="flex flex-col gap-1">
                        Rua
                        <input type="text" className="border rounded px-2 py-1" value={editForm.lodgingInfo?.location?.street || ''} onChange={e => setEditForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, location: { ...f.lodgingInfo.location, street: e.target.value } } }))} />
                      </label>
                      <label className="flex flex-col gap-1">
                        Número
                        <input type="text" className="border rounded px-2 py-1" value={editForm.lodgingInfo?.location?.number || ''} onChange={e => setEditForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, location: { ...f.lodgingInfo.location, number: e.target.value } } }))} />
                      </label>
                      <label className="flex flex-col gap-1">
                        Bairro
                        <input type="text" className="border rounded px-2 py-1" value={editForm.lodgingInfo?.location?.neighborhood || ''} onChange={e => setEditForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, location: { ...f.lodgingInfo.location, neighborhood: e.target.value } } }))} />
                      </label>
                      <label className="flex flex-col gap-1">
                        Cidade
                        <input type="text" className="border rounded px-2 py-1" value={editForm.lodgingInfo?.location?.city || ''} onChange={e => setEditForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, location: { ...f.lodgingInfo.location, city: e.target.value } } }))} />
                      </label>
                      <label className="flex flex-col gap-1">
                        Estado
                        <input type="text" className="border rounded px-2 py-1" value={editForm.lodgingInfo?.location?.state || ''} onChange={e => setEditForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, location: { ...f.lodgingInfo.location, state: e.target.value } } }))} />
                      </label>
                      <label className="flex flex-col gap-1">
                        País
                        <input type="text" className="border rounded px-2 py-1" value={editForm.lodgingInfo?.location?.country || ''} onChange={e => setEditForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, location: { ...f.lodgingInfo.location, country: e.target.value } } }))} />
                      </label>
                      <label className="flex flex-col gap-1">
                        CEP
                        <input type="text" className="border rounded px-2 py-1" value={editForm.lodgingInfo?.location?.zipCode || ''} onChange={e => setEditForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, location: { ...f.lodgingInfo.location, zipCode: e.target.value } } }))} />
                      </label>
                      <label className="flex flex-col gap-1">
                        Complemento
                        <input type="text" className="border rounded px-2 py-1" value={editForm.lodgingInfo?.location?.complement || ''} onChange={e => setEditForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, location: { ...f.lodgingInfo.location, complement: e.target.value } } }))} />
                      </label>
                    </div>
                  </div>
                  {/* Mídias atuais */}
                  <div className="flex flex-col gap-2 mt-2 p-2 border rounded bg-gray-50">
                    <span className="font-semibold">Mídias do Pacote</span>
                    {editMedia.length === 0 ? (
                      <span className="text-gray-500">Nenhuma mídia cadastrada.</span>
                    ) : (
                      <>
                        {/* Galeria visual das imagens do pacote */}
                        <div className="flex flex-wrap gap-2 mb-2 justify-center">
                          {editMedia
                            .filter(m => m.name && m.name.match(/\.(jpg|jpeg|png|gif|webp)$/i))
                            .map((media, idx) => (
                              <img
                                key={idx}
                                src={media.url ? media.url : `${API_BASE_URL}/uploads/${editForm.id}/${media.name}`}
                                alt={media.name}
                                className="w-32 h-20 object-cover rounded shadow"
                              />
                            ))}
                        </div>
                        {/* Lista de mídias com botão Excluir */}
                        <ul className="flex flex-wrap gap-2">
                          {editMedia.map((media, idx) => (
                            <li key={idx} className="flex flex-col items-center border rounded p-2 bg-white">
                              {/* Exibe imagem ou nome do arquivo */}
                              {media.url ? (
                                <img src={media.url} alt={media.name} className="w-24 h-16 object-cover rounded mb-1" />
                              ) : (
                                <span className="text-xs">{media.name}</span>
                              )}
                              <button
                                type="button"
                                className="mt-1 px-2 py-1 rounded bg-red-500 text-white text-xs hover:bg-red-600"
                                onClick={async () => {
                                  setEditLoading(true);
                                  setEditError("");
                                  try {
                                    // Recupera o token JWT do localStorage
                                    const token = localStorage.getItem('authToken');
                                    const res = await fetch(`${API_BASE_URL}/api/v1/dashboard/packages/media/${media.id}`, {
                                      method: 'DELETE',
                                      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
                                    });
                                    if (res.ok) {
                                      setEditMedia(m => m.filter((_, i) => i !== idx));
                                    } else {
                                      setEditError('Erro ao excluir mídia.');
                                    }
                                  } catch {
                                    setEditError('Erro ao excluir mídia.');
                                  }
                                  setEditLoading(false);
                                }}
                              >Excluir</button>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                  {/* Upload de novas mídias */}
                  <div className="flex flex-col gap-2 mt-2 p-2 border rounded bg-gray-50">
                    <span className="font-semibold">Adicionar Nova Mídia</span>
                    <input type="file" multiple accept="image/*,video/*" onChange={e => setEditMediaFiles(Array.from(e.target.files))} />
                    {editMediaFiles.length > 0 && (
                      <ul className="text-sm text-gray-700 list-disc ml-5">
                        {editMediaFiles.map((file, idx) => (
                          <li key={idx}>{file.name}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {editError && <div className="text-red-500 text-sm mt-2">{editError}</div>}
                  <button type="submit" className="mt-4 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 font-semibold shadow disabled:opacity-60" disabled={editLoading}>{editLoading ? 'Salvando...' : 'Salvar Alterações'}</button>
                </form>
              )}
            </div>
          </div>
        )}
        {/* Modal de visualização de pacote */}
        {showModal && selectedPackage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full p-8 relative animate-fadeIn flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
              <button onClick={closeModal} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold">&times;</button>
              <h3 className="text-2xl font-semibold mb-4">Detalhes do Pacote</h3>
              {/* Fotos do pacote */}
              {viewMediaLoading ? (
                <div className="text-blue-500">Carregando fotos...</div>
              ) : (selectedPackage && Array.isArray(selectedPackage.packageMedia) && selectedPackage.packageMedia.length > 0) ? (
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {(() => {
                    console.log('selectedPackage.packageMedia:', selectedPackage.packageMedia);
                    return selectedPackage.packageMedia
                      .filter(m => {
                        if (typeof m === 'object' && m.mediaUrl) {
                          return m.mediaUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i);
                        }
                        if (typeof m === 'string') {
                          return m.match(/\.(jpg|jpeg|png|gif|webp)$/i);
                        }
                        return false;
                      })
                      .map((media, idx) => {
                        let url = '';
                        if (typeof media === 'object' && media.mediaUrl) {
                          url = media.mediaUrl.replace(/\\/g, '/');
                        } else if (typeof media === 'string') {
                          url = media.replace(/\\/g, '/');
                        }
                        if (!url.startsWith('http')) {
                          url = `${API_BASE_URL}${url.startsWith('/') ? url : '/' + url}`;
                        }
                        console.log('Imagem renderizada:', url);
                        return (
                          <img
                            key={idx}
                            src={url}
                            alt={url.split('/').pop()}
                            className="w-32 h-20 object-cover rounded shadow"
                          />
                        );
                      });
                  })()}
                </div>
              ) : (viewMedia && viewMedia.length > 0 && selectedPackage && selectedPackage.id) ? (
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {viewMedia
                    .filter(m => m.name && m.name.match(/\.(jpg|jpeg|png|gif|webp)$/i))
                    .map((media, idx) => {
                      const url = `${API_BASE_URL}/uploads/${selectedPackage.id}/${media.name}`;
                      console.log('Imagem renderizada (viewMedia):', url);
                      return (
                        <img
                          key={idx}
                          src={url}
                          alt={media.name}
                          className="w-32 h-20 object-cover rounded shadow"
                        />
                      );
                    })}
                </div>
              ) : null}
              <div className="flex flex-col gap-2 text-base">
                <span><b>ID:</b> {selectedPackage.id}</span>
                <span><b>Nome:</b> {selectedPackage.name}</span>
                <span><b>Descrição:</b> {selectedPackage.description}</span>
                <span><b>Origem:</b> {selectedPackage.origin}</span>
                <span><b>Destino:</b> {selectedPackage.destination}</span>
                <span><b>Preço:</b> R$ {selectedPackage.price}</span>
                <span><b>Desconto:</b> {selectedPackage.discountPercent ? selectedPackage.discountPercent + '%' : '-'}</span>
                <span><b>Data de Saída:</b> {selectedPackage.departureDate ? new Date(selectedPackage.departureDate).toLocaleDateString() : '-'}</span>
                <span><b>Data de Retorno:</b> {selectedPackage.returnDate ? new Date(selectedPackage.returnDate).toLocaleDateString() : '-'}</span>
                <span><b>Ativo:</b> {selectedPackage.isActive ? 'Sim' : 'Não'}</span>
              </div>
              {/* Hospedagem */}
              {selectedPackage.lodgingInfo && (
                <div className="mt-4">
                  <h4 className="font-semibold text-lg mb-2">Informações de Hospedagem</h4>
                  <div className="grid grid-cols-2 gap-2 text-base">
                    <span><b>Banheiros:</b> {selectedPackage.lodgingInfo.baths}</span>
                    <span><b>Camas:</b> {selectedPackage.lodgingInfo.beds}</span>
                    <span><b>Wi-Fi:</b> {selectedPackage.lodgingInfo.wifiIncluded ? 'Sim' : 'Não'}</span>
                    <span><b>Vaga de Estacionamento:</b> {selectedPackage.lodgingInfo.parkingSpot ? 'Sim' : 'Não'}</span>
                    <span><b>Piscina:</b> {selectedPackage.lodgingInfo.swimmingPool ? 'Sim' : 'Não'}</span>
                    <span><b>Academia:</b> {selectedPackage.lodgingInfo.fitnessCenter ? 'Sim' : 'Não'}</span>
                    <span><b>Restaurante:</b> {selectedPackage.lodgingInfo.restaurantOnSite ? 'Sim' : 'Não'}</span>
                    <span><b>Pet Friendly:</b> {selectedPackage.lodgingInfo.petAllowed ? 'Sim' : 'Não'}</span>
                    <span><b>Ar Condicionado:</b> {selectedPackage.lodgingInfo.airConditioned ? 'Sim' : 'Não'}</span>
                    <span><b>Café da Manhã:</b> {selectedPackage.lodgingInfo.breakfast ? 'Sim' : 'Não'}</span>
                  </div>
                  {selectedPackage.lodgingInfo.location && (
                    <div className="mt-2 text-base">
                      <b>Endereço:</b>
                      <div className="ml-2">
                        <div>{selectedPackage.lodgingInfo.location.street}, {selectedPackage.lodgingInfo.location.number}</div>
                        <div>{selectedPackage.lodgingInfo.location.neighborhood}</div>
                        <div>{selectedPackage.lodgingInfo.location.city} - {selectedPackage.lodgingInfo.location.state}, {selectedPackage.lodgingInfo.location.country}</div>
                        <div>CEP: {selectedPackage.lodgingInfo.location.zipCode}</div>
                        {selectedPackage.lodgingInfo.location.complement && <div>Compl.: {selectedPackage.lodgingInfo.location.complement}</div>}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* Avaliações */}
              <div className="mt-4">
                <h4 className="font-semibold text-lg mb-2">Avaliações</h4>
                {selectedPackage.ratings && selectedPackage.ratings.length > 0 ? (
                  <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
                    {selectedPackage.ratings.map(rating => (
                      <div key={rating.id} className="border rounded p-2 bg-gray-50">
                        <div className="flex items-center gap-2">
                          <span className="font-bold">Nota:</span> <span>{rating.rating}</span>
                          <span className="ml-4 text-sm text-gray-500">{rating.userName}</span>
                          <span className="ml-2 text-xs text-gray-400">{rating.createdAt ? new Date(rating.createdAt).toLocaleDateString() : ''}</span>
                        </div>
                        <div className="text-gray-700 mt-1">{rating.comment}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-500">Nenhuma avaliação.</span>
                )}
              </div>
            </div>
          </div>
        )}
        {/* Modal de criação de pacote */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full p-8 relative animate-fadeIn flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
              <button onClick={() => setShowCreateModal(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold">&times;</button>
              <h3 className="text-2xl font-semibold mb-4">Criar Novo Pacote</h3>
              <form onSubmit={handleCreateSubmit} className="flex flex-col gap-3">
                <label className="flex flex-col gap-1">
                  Nome
                  <input type="text" className="border rounded px-2 py-1" value={createForm.name} onChange={e => setCreateForm(f => ({ ...f, name: e.target.value }))} required />
                </label>
                <label className="flex flex-col gap-1">
                  Descrição
                  <textarea className="border rounded px-2 py-1 min-h-[60px]" value={createForm.description} onChange={e => setCreateForm(f => ({ ...f, description: e.target.value }))} required />
                </label>
                <label className="flex flex-col gap-1">
                  Origem
                  <input type="text" className="border rounded px-2 py-1" value={createForm.origin} onChange={e => setCreateForm(f => ({ ...f, origin: e.target.value }))} required />
                </label>
                <label className="flex flex-col gap-1">
                  Destino
                  <input type="text" className="border rounded px-2 py-1" value={createForm.destination} onChange={e => setCreateForm(f => ({ ...f, destination: e.target.value }))} required />
                </label>
                <label className="flex flex-col gap-1">
                  Preço
                  <input type="number" className="border rounded px-2 py-1" value={createForm.price} onChange={e => setCreateForm(f => ({ ...f, price: e.target.value }))} required min="0" />
                </label>
                <label className="flex flex-col gap-1">
                  Desconto (%)
                  <input type="number" className="border rounded px-2 py-1" value={createForm.discountPercent} onChange={e => setCreateForm(f => ({ ...f, discountPercent: e.target.value }))} min="0" max="100" />
                </label>
                <label className="flex flex-col gap-1">
                  Data de início (opcional)
                  <input type="date" className="border rounded px-2 py-1" value={createForm.activeFrom} onChange={e => setCreateForm(f => ({ ...f, activeFrom: e.target.value }))} />
                </label>
                <label className="flex flex-col gap-1">
                  Data de término (opcional)
                  <input type="date" className="border rounded px-2 py-1" value={createForm.activeUntil} onChange={e => setCreateForm(f => ({ ...f, activeUntil: e.target.value }))} />
                </label>
                <label className="flex flex-col gap-1">
                  Data de saída (opcional)
                  <input type="date" className="border rounded px-2 py-1" value={createForm.beginDate} onChange={e => setCreateForm(f => ({ ...f, beginDate: e.target.value }))} />
                </label>
                <label className="flex flex-col gap-1">
                  Data de retorno (opcional)
                  <input type="date" className="border rounded px-2 py-1" value={createForm.endDate} onChange={e => setCreateForm(f => ({ ...f, endDate: e.target.value }))} />
                </label>
                <label className="flex flex-col gap-1">
                  Quantidade
                  <input type="number" className="border rounded px-2 py-1" value={createForm.quantity} onChange={e => setCreateForm(f => ({ ...f, quantity: e.target.value }))} required min="0" />
                </label>
                <label className="flex flex-row gap-2 items-center">
                  <input type="checkbox" checked={createForm.isAvailable} onChange={e => setCreateForm(f => ({ ...f, isAvailable: e.target.checked }))} /> Disponível
                </label>
                <label className="flex flex-col gap-1">
                  URL da Imagem (opcional)
                  <input type="text" className="border rounded px-2 py-1" value={createForm.imageUrl} onChange={e => setCreateForm(f => ({ ...f, imageUrl: e.target.value }))} />
                </label>
                {/* Campos de avaliações (opcional) */}
                {/* Campos de hospedagem */}
                {/* Campos de avaliações (opcional) */}
                {/* Campos de hospedagem */}
                {/* Upload de mídia (agora abaixo das avaliações) */}
                {/* Upload de mídia removido aqui, mantido apenas após avaliações */}
                <div className="flex flex-col gap-2 mt-2 p-2 border rounded bg-gray-50">
                  <span className="font-semibold">Informações de Hospedagem</span>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="flex flex-col gap-1">
                      Banheiros
                      <input type="number" min="0" className="border rounded px-2 py-1" value={createForm.lodgingInfo.baths} onChange={e => setCreateForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, baths: e.target.value } }))} />
                    </label>
                    <label className="flex flex-col gap-1">
                      Camas
                      <input type="number" min="0" className="border rounded px-2 py-1" value={createForm.lodgingInfo.beds} onChange={e => setCreateForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, beds: e.target.value } }))} />
                    </label>
                    <label className="flex flex-row gap-2 items-center">
                      <input type="checkbox" checked={createForm.lodgingInfo.wifiIncluded} onChange={e => setCreateForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, wifiIncluded: e.target.checked } }))} /> Wi-Fi
                    </label>
                    <label className="flex flex-row gap-2 items-center">
                      <input type="checkbox" checked={createForm.lodgingInfo.parkingSpot} onChange={e => setCreateForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, parkingSpot: e.target.checked } }))} /> Estacionamento
                    </label>
                    <label className="flex flex-row gap-2 items-center">
                      <input type="checkbox" checked={createForm.lodgingInfo.swimmingPool} onChange={e => setCreateForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, swimmingPool: e.target.checked } }))} /> Piscina
                    </label>
                    <label className="flex flex-row gap-2 items-center">
                      <input type="checkbox" checked={createForm.lodgingInfo.fitnessCenter} onChange={e => setCreateForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, fitnessCenter: e.target.checked } }))} /> Academia
                    </label>
                    <label className="flex flex-row gap-2 items-center">
                      <input type="checkbox" checked={createForm.lodgingInfo.restaurantOnSite} onChange={e => setCreateForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, restaurantOnSite: e.target.checked } }))} /> Restaurante
                    </label>
                    <label className="flex flex-row gap-2 items-center">
                      <input type="checkbox" checked={createForm.lodgingInfo.petAllowed} onChange={e => setCreateForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, petAllowed: e.target.checked } }))} /> Pet Friendly
                    </label>
                    <label className="flex flex-row gap-2 items-center">
                      <input type="checkbox" checked={createForm.lodgingInfo.airConditioned} onChange={e => setCreateForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, airConditioned: e.target.checked } }))} /> Ar Condicionado
                    </label>
                    <label className="flex flex-row gap-2 items-center">
                      <input type="checkbox" checked={createForm.lodgingInfo.breakfast} onChange={e => setCreateForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, breakfast: e.target.checked } }))} /> Café da Manhã
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <label className="flex flex-col gap-1">
                      Rua
                      <input type="text" className="border rounded px-2 py-1" value={createForm.lodgingInfo.location.street} onChange={e => setCreateForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, location: { ...f.lodgingInfo.location, street: e.target.value } } }))} />
                    </label>
                    <label className="flex flex-col gap-1">
                      Número
                      <input type="text" className="border rounded px-2 py-1" value={createForm.lodgingInfo.location.number} onChange={e => setCreateForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, location: { ...f.lodgingInfo.location, number: e.target.value } } }))} />
                    </label>
                    <label className="flex flex-col gap-1">
                      Bairro
                      <input type="text" className="border rounded px-2 py-1" value={createForm.lodgingInfo.location.neighborhood} onChange={e => setCreateForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, location: { ...f.lodgingInfo.location, neighborhood: e.target.value } } }))} />
                    </label>
                    <label className="flex flex-col gap-1">
                      Cidade
                      <input type="text" className="border rounded px-2 py-1" value={createForm.lodgingInfo.location.city} onChange={e => setCreateForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, location: { ...f.lodgingInfo.location, city: e.target.value } } }))} />
                    </label>
                    <label className="flex flex-col gap-1">
                      Estado
                      <input type="text" className="border rounded px-2 py-1" value={createForm.lodgingInfo.location.state} onChange={e => setCreateForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, location: { ...f.lodgingInfo.location, state: e.target.value } } }))} />
                    </label>
                    <label className="flex flex-col gap-1">
                      País
                      <input type="text" className="border rounded px-2 py-1" value={createForm.lodgingInfo.location.country} onChange={e => setCreateForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, location: { ...f.lodgingInfo.location, country: e.target.value } } }))} />
                    </label>
                    <label className="flex flex-col gap-1">
                      CEP
                      <input type="text" className="border rounded px-2 py-1" value={createForm.lodgingInfo.location.zipCode} onChange={e => setCreateForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, location: { ...f.lodgingInfo.location, zipCode: e.target.value } } }))} />
                    </label>
                    <label className="flex flex-col gap-1">
                      Complemento
                      <input type="text" className="border rounded px-2 py-1" value={createForm.lodgingInfo.location.complement} onChange={e => setCreateForm(f => ({ ...f, lodgingInfo: { ...f.lodgingInfo, location: { ...f.lodgingInfo.location, complement: e.target.value } } }))} />
                    </label>
                  </div>
                </div>
      
                {/* Upload de mídia (agora abaixo das avaliações) */}
                <div className="flex flex-col gap-2 mt-2 p-2 border rounded bg-gray-50">
                  <span className="font-semibold">Adicionar Mídia ao Pacote (opcional)</span>
                  <input type="file" multiple accept="image/*,video/*" onChange={handleMediaChange} />
                  {mediaFiles.length > 0 && (
                    <ul className="text-sm text-gray-700 list-disc ml-5">
                      {mediaFiles.map((file, idx) => (
                        <li key={idx}>{file.name}</li>
                      ))}
                    </ul>
                  )}
                  {mediaError && <div className="text-red-500 text-sm mt-2">{mediaError}</div>}
                  {mediaLoading && <div className="text-blue-500 text-sm mt-2">Enviando mídia...</div>}
                </div>
                {createError && <div className="text-red-500 text-sm mt-2">{createError}</div>}
                <button type="submit" className="mt-4 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 font-semibold shadow disabled:opacity-60" disabled={createLoading}>{createLoading ? 'Criando...' : 'Criar Pacote'}</button>
              </form>
            </div>
          </div>
        )}
      </>
    );
  }
  if (title === 'Reservas') {
    return <BookingsContent packages={packages} />;
  }
  if (title === 'Métricas') {
    return <div>Conteúdo de Métricas</div>;
  }
  if (title === 'Avaliações') {
    return <RatingsContent />;
  }
  if (title === 'Ajuda') {
    return <div>Conteúdo de Ajuda</div>;
  }
  return <div>Selecione uma opção do menu</div>;
}

export default DashBoardContent;