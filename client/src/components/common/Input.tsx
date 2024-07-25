import React from 'react';

interface InputProps {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ type, name, value, onChange }) => {
  return <input type={type} name={name} value={value} onChange={onChange} />;
};

export default Input;
