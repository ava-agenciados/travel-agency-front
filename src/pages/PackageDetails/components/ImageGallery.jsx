import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function ImageGallery({ images }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <>
      <div className="bg-gray-100 grid grid-cols-4 gap-2 max-w-9xl mx-auto h-[400px] rounded-lg overflow-hidden shadow-lg relative my-10">
        <div
          className="col-span-2 row-span-2 cursor-pointer"
          onClick={() => openModal(0)}
        >
          <img
            src={images[1]}
            alt="Imagem 1"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="col-span-1 row-span-2 cursor-pointer"
          onClick={() => openModal(1)}
        >
          <img
            src={images[2]}
            alt="Imagem 2"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="col-span-1 row-span-1 cursor-pointer"
          onClick={() => openModal(2)}
        >
          <img
            src={images[3]}
            alt="Imagem 3"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="col-span-1 row-span-1 cursor-pointer relative"
          onClick={() => openModal(3)}
        >
          <img
            src={images[4]}
            alt="Imagem 4"
            className="w-full h-full object-cover"
          />
          {images.length > 5 && (
            <div className="absolute inset-0 bg-black/60 text-white flex items-center justify-center text-xl font-semibold ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              {images.length - 4}
            </div>
          )}
        </div>
      </div>
      <Dialog open={isOpen} onClose={closeModal} className="fixed z-50 inset-0 flex items-center justify-center bg-black/80">
        <div className="relative w-full h-full flex items-center justify-center">
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 z-50 text-white bg-black/40 rounded-full p-2 hover:bg-black/70"
          >
            <X size={24} />
          </button>
          {images.length > 1 && (
            <button
              onClick={() => setCurrentIndex((currentIndex - 1 + images.length) % images.length)}
              className="absolute left-6 z-50 text-white bg-black/40 rounded-full p-3 hover:bg-black/70"
            >
              <ChevronLeft size={32} />
            </button>
          )}
          <img
            src={images[currentIndex]}
            alt={`Imagem ${currentIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
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
    </>
  );
}