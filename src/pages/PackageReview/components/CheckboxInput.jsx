import React from 'react';

const CheckboxInput = ({ id, checked, onChange, label }) => (
  <div className="flex items-center">
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="mr-2"
    />
    <label htmlFor={id} className="text-sm text-gray-700">{label}</label>
  </div>
);

export default CheckboxInput;
