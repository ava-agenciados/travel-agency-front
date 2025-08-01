
import TextInput from './TextInput.jsx';
import CheckboxInput from './CheckboxInput.jsx';

const CompanionForm = ({ index, onRemove, onChange, data }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-4 relative border border-gray-200">
      {/* Botão de remover */}
      <button
        type="button"
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl font-bold"
        onClick={() => onRemove(index)}
        aria-label="Remover acompanhante"
      >
        ×
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Nome */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={data.firstName}
            onChange={e => onChange(index, 'firstName', e.target.value)}
            placeholder="Nome"
          />
        </div>
        {/* Sobrenome */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Sobrenome</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={data.lastName}
            onChange={e => onChange(index, 'lastName', e.target.value)}
            placeholder="Sobrenome"
          />
        </div>
        {/* CPF ou Passaporte */}
        <div>
          <label className="block text-sm font-medium text-gray-700">CPF ou Passaporte</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={data.cpfPassport}
            onChange={e => onChange(index, 'cpfPassport', e.target.value)}
            placeholder="CPF ou Passaporte"
          />
        </div>
        {/* Telefone */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Telefone</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={data.phoneNumber}
            onChange={e => onChange(index, 'phoneNumber', e.target.value)}
            placeholder="Telefone"
          />
        </div>
        {/* Checkbox - ocupa toda a largura */}
        <div className="col-span-1 sm:col-span-2 flex items-center mt-2">
          <input
            id="isForeigner-responsible"
            type="checkbox"
            checked={data.isForeigner}
            onChange={e => onChange(index, 'isForeigner', e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="isForeigner-responsible" className="text-sm text-gray-700">Sou estrangeiro</label>
        </div>
      </div>
    </div>
  );
};

export default CompanionForm;
