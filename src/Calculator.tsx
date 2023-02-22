import React, { useState } from 'react';
import './Calculator.css';
import Display from './components/Display';
import Button from './components/Button';

const Calculator: React.FC = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [clearDisplay, setClearDisplay] = useState(false);
  const [operation, setOperation] = useState<string | null>(null);
  const [values, setValues] = useState<number[]>([0, 0]);
  const [current, setCurrent] = useState(0);

  const clearMemory = () => {
    setDisplayValue('0');
    setClearDisplay(false);
    setOperation(null);
    setValues([0, 0]);
    setCurrent(0);
  };

  const handleSetOperation = (op: string) => {
    if (current === 0) {
      setOperation(op);
      setCurrent(1);
      setClearDisplay(true);
    } else {
      const equals = op === '=';
      const currentOperation = operation;
      const vals = [...values];

      switch (currentOperation) {
        case '+':
          vals[0] = vals[0] + vals[1];
          break;
        case '-':
          vals[0] = vals[0] - vals[1];
          break;
        case '*':
          vals[0] = vals[0] * vals[1];
          break;
        case '/':
          vals[0] = vals[0] / vals[1];
          break;
        case '%':
          vals[0] = (vals[0] / 100) * vals[1];
          break;
        default:
          break;
      }

      setDisplayValue(String(vals[0]));
      setOperation(equals ? null : op);
      setCurrent(equals ? 0 : 1);
      setClearDisplay(!equals);
      setValues(vals);
    }
  };

  const addDigit = (n: string) => {
    if (n === '.' && displayValue.includes('.')) {
      return;
    }

    const clear = displayValue === '0' || clearDisplay;
    const currentVal = clear ? '' : displayValue;

    let newDisplayValue = '';

    if (n === 'Del') {
      if (currentVal.length >= 1) {
        newDisplayValue = currentVal.substring(0, currentVal.length - 1);
      } else if (
        currentVal.length <= 0 ||
        isNaN(Number(currentVal)) ||
        currentVal === undefined
      ) {
        newDisplayValue = '0';
      }
    } else if (n === '+/-') {
      newDisplayValue = String(Number(currentVal) * -1);
    } else {
      newDisplayValue = currentVal + n;
    }
    setDisplayValue(newDisplayValue);
    setClearDisplay(false);
    if (n !== '.') {
      const i = current;
      const newValue = parseFloat(newDisplayValue);
      const vals = [...values];
      vals[i] = newValue;
      setValues(vals);
    }
  };

  function handleNegative() {
    const newDisplayValue = (parseFloat(displayValue) * -1).toString();
    setDisplayValue(newDisplayValue);

    const newValues = [...values];
    newValues[current] = parseFloat(newDisplayValue);
    setValues(newValues);
  }

  return (
    <div className="calculator">
      <Display value={displayValue} />
      <Button label="AC" click={clearMemory} operation />
      <Button label="Del" click={() => addDigit('Del')} operation />
      <Button label="%" click={() => handleSetOperation('%')} operation />
      <Button label="/" click={() => handleSetOperation('/')} operation />
      <Button label="7" click={() => addDigit('7')} />
      <Button label="9" click={() => addDigit('9')} />
      <Button label="8" click={() => addDigit('8')} />
      <Button label="*" click={() => handleSetOperation('*')} operation />
      <Button label="4" click={() => addDigit('4')} />
      <Button label="5" click={() => addDigit('5')} />
      <Button label="6" click={() => addDigit('6')} />
      <Button label="-" click={() => handleSetOperation('-')} operation />
      <Button label="1" click={() => addDigit('1')} />
      <Button label="2" click={() => addDigit('2')} />
      <Button label="3" click={() => addDigit('3')} />
      <Button label="+" click={() => handleSetOperation('+')} operation />
      <Button label="0" click={() => addDigit('0')} />
      <Button label="+/-" click={() => handleNegative()} />
      <Button label="." click={() => addDigit('.')} />
      <Button label="=" click={() => handleSetOperation('=')} operation />
    </div>
  );
};

export default Calculator;
