import React from 'react';
import './FormInput.css';

const FormInput = ({ label, value, onChange, type = 'text', name }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default FormInput;
