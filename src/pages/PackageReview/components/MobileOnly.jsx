import React from 'react';

const MobileOnly = ({ children, className = '', ...props }) => (
  <div className={`block lg:hidden ${className}`} {...props}>
    {children}
  </div>
);

export default MobileOnly;
