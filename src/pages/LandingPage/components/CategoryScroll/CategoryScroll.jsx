import { useState, useRef, useEffect } from "react";

function CategoryScroll({ category, selectedIdx, setSelectedIdx }) {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  function updateArrows() {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 1);
  }

  useEffect(() => {
    updateArrows();

    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);

    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scrollBy = (distance) => {
    scrollRef.current?.scrollBy({ left: distance, behavior: "smooth" });
  };

  return (
    <div className="relative w-full max-w-9xl mx-auto">
      {showLeftArrow && (
        <button
          onClick={() => scrollBy(-200)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md rounded-full p-2"
          aria-label="Scroll left"
        >
          <i className='bxr  bx-chevron-left text-3xl text-blue-600 font-black'  ></i> 
        </button>
      )}

      <div
        ref={scrollRef}
        className="w-full overflow-x-auto scrollbar-hide scroll-smooth"
      >
        <div className="w-max bg-white rounded-t-xl shadow-sm flex justify-start gap-4 px-4 py-2">
          {category.map((name, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              className={`
                flex flex-col items-center text-xs whitespace-nowrap px-2 py-2 rounded-md transition
                ${
                  selectedIdx === idx
                    ? "border border-blue-300 text-blue-600 bg-blue-50 font-semibold"
                    : "text-gray-500"
                }
                hover:bg-blue-100
              `}
            >
              <span className="text-base">H</span>
              <span className="text-[0.55rem]">{name}</span>
            </button>
          ))}
        </div>
      </div>

      {showRightArrow && (
        <button
          onClick={() => scrollBy(200)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white shadow-md p-2"
          aria-label="Scroll right"
        >
          <i className='bxr  bx-chevron-right text-3xl text-blue-600 font-black'  ></i> 
        </button>
      )}
    </div>
  );
}


export default CategoryScroll;
