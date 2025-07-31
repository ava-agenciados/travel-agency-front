import { useState } from "react";

const UserData = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [userPhoto, setUserPhoto] = useState(null); // Estado para a foto do usuário
    const [isEditing, setIsEditing] = useState(false); // Estado para modo de edição
    
    // Dados do usuário (normalmente viriam de uma API ou contexto)
    const [userName, setUserName] = useState("Eryck Santos");
    const [userPhone, setUserPhone] = useState("(11) 99999-9999");
    const [userEmail, setUserEmail] = useState("erycksantos@mail.com");
    
    // Função para extrair iniciais do nome
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2); // Pega apenas as duas primeiras iniciais
    };

    // Função para lidar com a seleção de foto
    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUserPhoto(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Função para acionar o input de arquivo
    const triggerFileInput = () => {
        document.getElementById('photo-input').click();
    };

    // Função para alternar modo de edição
    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };
  return (
<div className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-4 sm:p-6 md:p-8 my-4">
                    
                    {/* Círculo para foto do usuário */}
                    <div className="flex justify-center mb-4 sm:mb-6">
                        <div className="relative">
                            <div 
                                className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden cursor-pointer hover:bg-gray-300 transition-colors"
                                onClick={triggerFileInput}
                            >
                                {userPhoto ? (
                                    <img 
                                        src={userPhoto} 
                                        alt="Foto do usuário" 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-xl sm:text-2xl font-bold text-gray-600">
                                        {getInitials(userName)}
                                    </span>
                                )}
                            </div>
                            {/* Ícone de câmera para indicar que é clicável */}
                            <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 cursor-pointer hover:bg-blue-600 transition-colors">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            {/* Input de arquivo escondido */}
                            <input
                                id="photo-input"
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                className="hidden"
                            />
                        </div>
                    </div>

                    {/* Informações pessoais */}
                    <div className="mb-4 sm:mb-6">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-500 mb-3 sm:mb-4">Informações Pessoais</h2>
                        {/*Caixa*/}
                        <div className="border bg-white rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                                <span className="p-1 sm:p-2 font-semibold text-gray-500 text-sm sm:text-base">Nome:</span>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        className="p-1 sm:p-2 font-semibold text-[#223A5F] border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                                    />
                                ) : (
                                    <span className="p-1 sm:p-2 font-semibold text-[#223A5F] text-sm sm:text-base">{userName}</span>
                                )}
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                                <span className="p-1 sm:p-2 font-semibold text-gray-500 text-sm sm:text-base">CPF:</span>
                                <span className="p-1 sm:p-2 font-semibold text-[#223A5F] text-sm sm:text-base">123.456.789-00</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                                <span className="p-1 sm:p-2 font-semibold text-gray-500 text-sm sm:text-base">Senha:</span>
                                <span 
                                    className="p-1 sm:p-2 font-semibold text-[#223A5F] cursor-pointer hover:underline select-none text-sm sm:text-base"
                                    onClick={togglePassword}
                                >
                                    {showPassword ? "minhasenha123" : "Visualizar Senha"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Informações de contato */}
                    <div className="mb-4 sm:mb-6">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-500 mb-3 sm:mb-4">Informações de Contato</h2>
                        {/*Caixa*/}
                        <div className="border bg-white rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                                <span className="p-1 sm:p-2 font-semibold text-gray-500 text-sm sm:text-base">Telefone:</span>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={userPhone}
                                        onChange={(e) => setUserPhone(e.target.value)}
                                        className="p-1 sm:p-2 font-semibold text-[#223A5F] border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                                    />
                                ) : (
                                    <span className="p-1 sm:p-2 font-semibold text-[#223A5F] text-sm sm:text-base">{userPhone}</span>
                                )}
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                                <span className="p-1 sm:p-2 font-semibold text-gray-500 text-sm sm:text-base">Email:</span>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        value={userEmail}
                                        onChange={(e) => setUserEmail(e.target.value)}
                                        className="p-1 sm:p-2 font-semibold text-[#223A5F] border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                                    />
                                ) : (
                                    <span className="p-1 sm:p-2 font-semibold text-[#223A5F] text-sm sm:text-base">{userEmail}</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Botão de edição */}
                    <div className="flex justify-center mt-4 sm:mt-6">
                        <button
                            onClick={toggleEdit}
                            className={`px-4 sm:px-6 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base ${
                                isEditing 
                                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                            }`}
                        >
                            {isEditing ? 'Salvar Alterações' : 'Editar Informações'}
                        </button>
                    </div>

                </div>
  );
};

export default UserData;