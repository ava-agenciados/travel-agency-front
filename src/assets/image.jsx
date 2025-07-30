// Importa imagens estáticas da pasta de imagens
import Bg_HeroSection from './images/bg_herosection.png'     // Imagem de fundo da seção hero
import PalmTree from './images/palm-tree.png'                // Imagem de palmeira decorativa
import Plan from './images/plan.png'                          // Imagem relacionada a planos
import LoginPageImage from './images/LoginPageImage.jpg'      // Imagem de fundo da página de login
import IconPayments from './images/IconPayment.png'
import IconLoading from './images/Icons/IconLoading.png'
import IconCorret from './images/Icons/IconCorret.png'
import IconPending from './images/Icons/IconPending.png'
import IconRefuse from './images/Icons/Refused.png'
import IconQrCode from './images/Icons/IconQrCode.png'
// Objeto que centraliza todas as imagens da aplicação
// Facilita a importação e gerenciamento de assets
const Images = {
    Bg_HeroSection,      // Fundo da seção hero
    PalmTree,           // Decoração com palmeira
    Plan,               // Imagem de planos
    LoginPageImage,     // Fundo da página de login
    IconPayments,       // Ícone de pagamentos
    IconLoading,       // Ícone de carregamento
    IconCorret,        // Ícone de status de pagamento confirmado
    IconPending,       // Ícone de status de pagamento pendente
    IconRefuse,         // Ícone de status de pagamento recusado
    IconQrCode          // Icone de QrCode para método de pagamento como pix
};

// Exporta o objeto Images como padrão para uso em outros componentes
export default Images;