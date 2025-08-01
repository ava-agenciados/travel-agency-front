import React from 'react';

const DesktopOnly = ({ children, className = '', ...props }) => (
  <div className={`hidden lg:flex ${className}`} {...props}>
    {children}
  </div>
);

export default DesktopOnly;
