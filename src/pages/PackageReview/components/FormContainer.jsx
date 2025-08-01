import React from 'react';

const FormContainer = ({ onSubmit, children }) => (
  <form
    className="w-full max-w-7xl flex flex-col gap-6 md:gap-8 md:grid md:grid-cols-1 lg:flex lg:flex-row lg:gap-8"
    onSubmit={onSubmit}
  >
    {children}
  </form>
);

export default FormContainer;
