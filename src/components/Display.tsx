import React from 'react';
import './Display.css';

interface DisplayProps {
  value: string;
}

const Display: React.FC<DisplayProps> = ({ value }) => {
  return <div className="display">{value}</div>;
};

export default Display;
