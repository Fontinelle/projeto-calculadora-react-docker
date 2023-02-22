import React from 'react';
import './Button.css';

interface ButtonProps {
  label: string;
  click?: (label: string) => void;
  operation?: boolean;
  double?: boolean;
  triple?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { label, click, operation, double, triple } = props;

  return (
    <button
      onClick={(e) => click && click(label)}
      className={`
            button
            ${operation ? 'operation' : ''}
            ${double ? 'double' : ''}
            ${triple ? 'triple' : ''}
    `}
    >
      {label}
    </button>
  );
};

export default Button;
