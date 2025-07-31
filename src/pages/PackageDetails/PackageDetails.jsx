// components/ImageGallery.jsx
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Dialog } from '@headlessui/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import NavBar from '../../components/Navbar/NavBar';
import Footer from '../../components/Footer/Footer';

const images = [
  'https://tse1.mm.bing.net/th/id/OIP.ONZXZ91RS56i6S74kz-hVgHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
  'https://tse1.mm.bing.net/th/id/OIP.p63JvdF67KP1uFNx-BzcHQHaEp?r=0&w=1600&h=1005&rs=1&pid=ImgDetMain&o=7&rm=3',
  'https://tse1.mm.bing.net/th/id/OIP.ONZXZ91RS56i6S74kz-hVgHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
  'https://tse1.mm.bing.net/th/id/OIP.ONZXZ91RS56i6S74kz-hVgHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
  'https://tse1.mm.bing.net/th/id/OIP.ONZXZ91RS56i6S74kz-hVgHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
  'https://tse1.mm.bing.net/th/id/OIP.ONZXZ91RS56i6S74kz-hVgHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
];

export default function PackageDetails() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <>
    <NavBar />
<div className="bg-gray-100 grid grid-cols-4 gap-2 max-w-9xl mx-auto h-[400px] rounded-lg overflow-hidden shadow-lg relative my-10">

  <div
    className="col-span-2 row-span-2 cursor-pointer"
    onClick={() => openModal(0)}
  >
    <img
      src={images[0]}
      alt="Imagem 1"
      className="w-full h-full object-cover"
    />
  </div>

  <div
    className="col-span-1 row-span-2 cursor-pointer"
    onClick={() => openModal(1)}
  >
    <img
      src={images[1]}
      alt="Imagem 2"
      className="w-full h-full object-cover"
    />
  </div>

  <div
    className="col-span-1 row-span-1 cursor-pointer"
    onClick={() => openModal(2)}
  >
    <img
      src={images[2]}
      alt="Imagem 3"
      className="w-full h-full object-cover"
    />
  </div>

  <div
    className="col-span-1 row-span-1 cursor-pointer relative"
    onClick={() => openModal(3)}
  >
    <img
      src={images[3]}
      alt="Imagem 4"
      className="w-full h-full object-cover"
    />

    {images.length > 4 && (
      <div className="absolute inset-0 bg-black/60 text-white flex items-center justify-center text-xl font-semibold ">
        <FaPlus className="mr-1" />
        {images.length - 4}
      </div>
    )}
  </div>
</div>

<Dialog open={isOpen} onClose={closeModal} className="fixed z-50 inset-0 flex items-center justify-center bg-black/80">
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Botão Fechar */}
    <button
      onClick={closeModal}
      className="absolute top-6 right-6 z-50 text-white bg-black/40 rounded-full p-2 hover:bg-black/70"
    >
      <X size={24} />
    </button>

{/* Botao para navegacao (esquerda) */}
    {images.length > 1 && (
      <button
        onClick={() => setCurrentIndex((currentIndex - 1 + images.length) % images.length)}
        className="absolute left-6 z-50 text-white bg-black/40 rounded-full p-3 hover:bg-black/70"
      >
        <ChevronLeft size={32} />
      </button>
    )}

    {/* Imagem */}
    <img
      src={images[currentIndex]}
      alt={`Imagem ${currentIndex + 1}`}
      className="max-h-[90vh] max-w-[90vw] object-contain"
    />

{/* Botao para navegacao (direiita) */}
    {images.length > 1 && (
      <button
        onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}
        className="absolute right-6 z-50 text-white bg-black/40 rounded-full p-3 hover:bg-black/70"
      >
        <ChevronRight size={32} />
      </button>
    )}
  </div>
</Dialog>

      <section className="bg-gray-100 py-10 px-4">
  <div className="max-w-9xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
    
    {/* (Conteúdo principal) */}
    <div className="lg:col-span-2 space-y-8">

      {/* Título e Local */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Lorem ipsum sit amet dolok sit amet dolok</h2>
        <p className="text-sm text-gray-500">Recife - PE, Brasil</p>
        <p className="mt-2 text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia porro magni quaerat nostrum excepturi. Quasi qui veniam...
        </p>
      </div>

      {/* acomodações */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Acomodações que o pacote inclui</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
      d="M4 6h16M4 10h16M10 14h4m-6 4h8m-4 0v4M6 6v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6" />
  </svg>
              <span>Café da manhã</span>
            </div>
          ))}
        </div>
      </div>

{/* autor */}
      <div className="flex items-center gap-4 border-t pt-6">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Autor"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="text-sm text-gray-500">Publicado por</p>
          <p className="font-semibold">Lorem ipsum sit amet</p>
          <p className="text-blue-600 text-sm font-medium">4,9★</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Avaliações do pacote</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array(2).fill(0).map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold">Lorem ipsum sit amet</p>
                <span className="text-blue-600 text-sm">★★★★★</span>
              </div>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia porro magni quaerat nostrum excepturi...
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>

    {/* (Resumo do pacote) */}
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6 h-fit">
      <h4 className="text-sm font-semibold text-gray-700">Resumo</h4>
      
      {/* Datas */}
      <div className="flex flex-col gap-2">
        <input type="date" className="border rounded px-3 py-2 text-sm" defaultValue="2005-03-01" />
        <input type="date" className="border rounded px-3 py-2 text-sm" defaultValue="2005-03-01" />
      </div>

    {/* Dependendo nào vai precisar da quantidade de passageiros */}
      {/* <div>
        <select className="w-full border rounded px-3 py-2 text-sm">
          <option>1 Passageiro</option>
        </select>
      </div> */}


      <div>
        <p className="text-lg font-bold text-gray-800">R$ 1.200</p>
      </div>


      <button className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2 rounded">
        Reservar
      </button>

      <p className="text-xs text-gray-500 text-center">Ainda não haverá cobranças</p>
    </div>
  </div>
</section>


<section>
    <div className='max-w-9xl mx-auto py-8'>
        <h4 className='text-lg font-semibold mb-2 text-[#656565]'>Localização do local</h4>
        <div className='col-span-2 max-w-9xl'>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.123456789012!2d-34.901112!3d-8.047562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab0c12345678901%3A0x1234567890123456!2sPraia%20de%20Boa%20Viagem%2C%20Recife%20-%20PE%2C%20Brasil!5e0!3m2!1sen!2sus!4v1616161616161"
                width="100%"
                height="600"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
            ></iframe>
            </div>
    </div>
</section>

<Footer/>
    </>
  );

  
}
