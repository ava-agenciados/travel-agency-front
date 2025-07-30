// components/ImageGallery.jsx
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';

const images = [
 'https://tse1.mm.bing.net/th/id/OIP.ONZXZ91RS56i6S74kz-hVgHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
 'https://tse1.mm.bing.net/th/id/OIP.ONZXZ91RS56i6S74kz-hVgHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
 'https://tse1.mm.bing.net/th/id/OIP.ONZXZ91RS56i6S74kz-hVgHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
 'https://tse1.mm.bing.net/th/id/OIP.ONZXZ91RS56i6S74kz-hVgHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
 'https://tse1.mm.bing.net/th/id/OIP.ONZXZ91RS56i6S74kz-hVgHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
 'https://tse1.mm.bing.net/th/id/OIP.ONZXZ91RS56i6S74kz-hVgHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
];

const PackageDetails = () => {
 const [isOpen, setIsOpen] = useState(false);
 const [currentIndex, setCurrentIndex] = useState(0);

 const openModal = (index) => {
 setCurrentIndex(index);
 setIsOpen(true);
 };

 const closeModal = () => setIsOpen(false);

 return (
 <>
 <div className="grid grid-cols-3 gap-2 xl:grid-cols-4 max-w-5xl mx-auto column-gap-4 row-gap-6">
 {images.slice(0, 4).map((src, i) => (
 <div
 key={i}
 className={`relative h-60 cursor-pointer overflow-hidden rounded`}
 onClick={() => openModal(i)}
 >
 <img
 src={src}
 alt={`Imagem ${i + 1}`}
 className="w-full h-full object-cover transition duration-300 hover:scale-105"
 />
 {i === 3 && images.length > 4 && (
 <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xl font-bold">
 <FaPlus className="mr-2" />
 {images.length - 4}
 </div>
 )}
 </div>
 ))}
 </div>

 <Dialog open={isOpen} onClose={closeModal} className="fixed z-50 inset-0 flex items-center justify-center bg-black/80">
 <div className="relative w-full h-full flex items-center justify-center">
 <button
 onClick={closeModal}
 className="absolute top-6 right-6 z-50 text-white bg-black/40 rounded-full p-2 hover:bg-black/70"
 >
 <X size={24} />
 </button>
 <img
 src={images[currentIndex]}
 alt={`Imagem Ampliada`}
 className="max-h-[80vh] max-w-[90vw] object-contain"
 />
 </div>
 </Dialog>

 <section>
    <div className='grid'>
        <div className='max-w-xl'></div>
        <div></div>
    </div>
 </section>
 </>
 );
}

export default PackageDetails;