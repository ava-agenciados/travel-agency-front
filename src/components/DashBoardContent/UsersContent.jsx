
import { useEffect, useState } from 'react';

const DashBoardUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editUser, setEditUser] = useState(null);
  const [editRole, setEditRole] = useState('');
  const [saving, setSaving] = useState(false);
  const ITEMS_PER_PAGE = 7;
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE) || 1;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const openEditModal = (user) => {
    setEditUser(user);
    setEditRole(user.role);
  };

  const closeEditModal = () => {
    setEditUser(null);
    setEditRole('');
  };

  const handleSaveRole = async () => {
    if (!editUser || !editRole) return;
    setSaving(true);
    try {
      const res = await fetch('/api/v1/dashboard/users/change-role', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: editUser.email, newRole: editRole })
      });
      if (!res.ok) throw new Error('Erro ao atualizar cargo');
      // Atualiza localmente
      setUsers((prev) => prev.map(u => u.id === editUser.id ? { ...u, role: editRole } : u));
      closeEditModal();
    } catch (err) {
      alert('Erro ao atualizar cargo do usuário.');
    }
    setSaving(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/v1/dashboard/users/');
        if (!res.ok) throw new Error('Erro ao buscar usuários');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError('Erro ao buscar usuários');
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  return (
    <div className="w-full max-w-7xl flex-1 mx-auto rounded-lg bg-white p-2 md:p-10 flex flex-col justify-start shadow-xl mt-4 md:mt-16 overflow-auto" style={{ minHeight: '400px', maxHeight: 'calc(100vh - 6rem)' }}>
      <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 mt-4 md:mt-6 text-center">Usuários</h2>
      {loading ? (
        <p className="text-center text-gray-500">Carregando usuários...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum usuário encontrado.</p>
      ) : (
        <>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">ID</th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">Nome</th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">Email</th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">Cargo</th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {users.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((user) => (
                <tr key={user.id} className="hover:bg-blue-50">
                  <td className="px-4 py-2 text-center whitespace-nowrap font-medium">{user.id}</td>
                  <td className="px-4 py-2 text-center whitespace-nowrap">{user.firstName} {user.lastName}</td>
                  <td className="px-4 py-2 text-center whitespace-nowrap">{user.email}</td>
                  <td className="px-4 py-2 text-center whitespace-nowrap">{user.role}</td>
                  <td className="px-4 py-2 text-center whitespace-nowrap">
                    <button className="text-blue-500 hover:underline" onClick={() => openEditModal(user)} title="Editar">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                      </svg>
                    </button>
                  </td>
      {/* Modal de edição de usuário */}
      {editUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 relative animate-fadeIn flex flex-col gap-4">
            <button onClick={closeEditModal} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold">&times;</button>
            <h3 className="text-2xl font-bold mb-2">Editar Usuário</h3>
            <div className="flex flex-col gap-2">
              <div><span className="font-semibold">Nome:</span> {editUser.firstName} {editUser.lastName}</div>
              <div><span className="font-semibold">Email:</span> {editUser.email}</div>
              <div>
                <span className="font-semibold">Cargo:</span>
                <select
                  className="ml-2 border rounded px-2 py-1"
                  value={editRole}
                  onChange={e => setEditRole(e.target.value)}
                  disabled={saving}
                >
                  <option value="Admin">Admin</option>
                  <option value="Atendente">Atendente</option>
                  <option value="Cliente">Cliente</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 justify-end mt-2">
              <button onClick={closeEditModal} className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">Cancelar</button>
              <button onClick={handleSaveRole} disabled={saving || editRole === editUser.role} className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50">{saving ? 'Salvando...' : 'Salvar'}</button>
            </div>
          </div>
        </div>
      )}
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
  );
};

export default DashBoardUsers;
