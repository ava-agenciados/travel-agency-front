import React from 'react';

const TextInput = ({ label, value, onChange, placeholder, type = 'text', id }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700" htmlFor={id}>{label}</label>
    <input
      id={id}
      type={type}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

export default TextInput;
