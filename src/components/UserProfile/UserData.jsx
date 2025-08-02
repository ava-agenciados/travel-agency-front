import { useState, useEffect } from "react";
import { getUserProfile } from "../../services/userService";

const UserData = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [userPhoto, setUserPhoto] = useState(null); // Estado para a foto do usuário
    const [isEditing, setIsEditing] = useState(false); // Estado para modo de edição
    

    // Estado para dados do usuário autenticado
    const [userName, setUserName] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userCpf, setUserCpf] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Busca dados do usuário autenticado ao montar o componente
    useEffect(() => {
        async function fetchUser() {
            try {
                setLoading(true);
                const data = await getUserProfile();
                setUserName(data.fullName || `${data.firstName || ''} ${data.lastName || ''}`.trim());
                setUserPhone(data.phoneNumber || "");
                setUserEmail(data.email || "");
                setUserCpf(data.cpfPassport || "");
                setError(null);
            } catch (err) {
                setError("Erro ao carregar dados do usuário.");
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);
    
    // Função para extrair iniciais do nome
    const getInitials = (name) => {
        if (!name) return "";
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
  if (loading) {
    return <div className="text-center py-8">Carregando dados do usuário...</div>;
  }
  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }
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
                                <span className="p-1 sm:p-2 font-semibold text-[#223A5F] text-sm sm:text-base">{userName}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                                <span className="p-1 sm:p-2 font-semibold text-gray-500 text-sm sm:text-base">CPF:</span>
                                <span className="p-1 sm:p-2 font-semibold text-[#223A5F] text-sm sm:text-base">{userCpf}</span>
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
                                <span className="p-1 sm:p-2 font-semibold text-[#223A5F] text-sm sm:text-base">{userPhone}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                                <span className="p-1 sm:p-2 font-semibold text-gray-500 text-sm sm:text-base">Email:</span>
                                <span className="p-1 sm:p-2 font-semibold text-[#223A5F] text-sm sm:text-base">{userEmail}</span>
                            </div>
                        </div>
                    </div>


                    {/* Botão de edição removido pois os dados vêm da API e não são editáveis localmente */}

                </div>
  );
};

export default UserData;