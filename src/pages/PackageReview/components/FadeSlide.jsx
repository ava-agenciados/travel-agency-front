import React from 'react';

const FadeSlide = ({ show, children }) => {
  return (
    <div
      style={{
        transition: 'opacity 0.4s, transform 0.4s',
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(40px)',
        pointerEvents: show ? 'auto' : 'none',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

export default FadeSlide;
