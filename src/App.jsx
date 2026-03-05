import { useState, useEffect } from 'react';
import './index.css';

const clickSound = new Audio('/click.mp3');

const playSound = () => {
  clickSound.currentTime = 0; // Reset to start for rapid clicks
  clickSound.play().catch(err => console.error("Playback prevented:", err));
};

function App() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNum = (num) => {
    playSound();
    if (waitingForNewValue) {
      setDisplay(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const calculate = (a, b, op) => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    if (isNaN(numA) || isNaN(numB)) return numB;

    switch (op) {
      case '+': return numA + numB;
      case '-': return numA - numB;
      case '×': return numA * numB;
      case '÷': return numB === 0 ? 'Error' : numA / numB;
      default: return numB;
    }
  };

  const handleOperator = (nextOp) => {
    playSound();
    const inputValue = parseFloat(display);

    if (operator && waitingForNewValue) {
      setOperator(nextOp);
      setEquation(equation.slice(0, -1) + nextOp);
      return;
    }

    if (previousValue == null) {
      setPreviousValue(inputValue);
      setEquation(`${inputValue} ${nextOp}`);
    } else if (operator) {
      const result = calculate(previousValue, inputValue, operator);
      // to avoid weird javascript floats:
      const roundedResult = Math.round(result * 100000000) / 100000000;
      setDisplay(String(roundedResult));
      setPreviousValue(result);
      setEquation(`${roundedResult} ${nextOp}`);
    }

    setWaitingForNewValue(true);
    setOperator(nextOp);
  };

  const handleEquals = () => {
    playSound();
    if (!operator || waitingForNewValue) return;

    const inputValue = parseFloat(display);
    const result = calculate(previousValue, inputValue, operator);
    const roundedResult = Math.round(result * 100000000) / 100000000;

    setDisplay(String(roundedResult));
    setEquation('');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewValue(true);
  };

  const handleClear = () => {
    playSound();
    setDisplay('0');
    setEquation('');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewValue(false);
  };

  const handleDel = () => {
    playSound();
    if (waitingForNewValue) return;
    setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
  };

  const handleDecimal = () => {
    playSound();
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handlePercentage = () => {
    playSound();
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const handleToggleSign = () => {
    playSound();
    setDisplay(display.charAt(0) === '-' ? display.slice(1) : '-' + display);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const { key } = e;
      if (/\d/.test(key)) handleNum(key);
      else if (key === '.') handleDecimal();
      else if (key === '=' || key === 'Enter') handleEquals();
      else if (key === 'Backspace') handleDel();
      else if (key === 'Escape') handleClear();
      else if (key === '+') handleOperator('+');
      else if (key === '-') handleOperator('-');
      else if (key === '*') handleOperator('×');
      else if (key === '/') handleOperator('÷');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [display, equation, operator, previousValue, waitingForNewValue]);

  return (
    <>
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <div className="calculator">
        <div className="display-container">
          <div className="equation">{equation}</div>
          <div className="current-value">{display}</div>
        </div>

        <div className="keypad">
          <button className="clear" onClick={handleClear} style={{ '--active-color': '#f43f5e' }}>AC</button>
          <button onClick={handleToggleSign} style={{ '--active-color': '#a855f7' }}>+/-</button>
          <button onClick={handlePercentage} style={{ '--active-color': '#06b6d4' }}>%</button>
          <button className="operator" onClick={() => handleOperator('÷')} style={{ '--active-color': '#d946ef' }}>÷</button>

          <button onClick={() => handleNum('7')} style={{ '--active-color': '#3b82f6' }}>7</button>
          <button onClick={() => handleNum('8')} style={{ '--active-color': '#0ea5e9' }}>8</button>
          <button onClick={() => handleNum('9')} style={{ '--active-color': '#06b6d4' }}>9</button>
          <button className="operator" onClick={() => handleOperator('×')} style={{ '--active-color': '#ec4899' }}>×</button>

          <button onClick={() => handleNum('4')} style={{ '--active-color': '#6366f1' }}>4</button>
          <button onClick={() => handleNum('5')} style={{ '--active-color': '#8b5cf6' }}>5</button>
          <button onClick={() => handleNum('6')} style={{ '--active-color': '#a855f7' }}>6</button>
          <button className="operator" onClick={() => handleOperator('-')} style={{ '--active-color': '#f97316' }}>-</button>

          <button onClick={() => handleNum('1')} style={{ '--active-color': '#10b981' }}>1</button>
          <button onClick={() => handleNum('2')} style={{ '--active-color': '#14b8a6' }}>2</button>
          <button onClick={() => handleNum('3')} style={{ '--active-color': '#06b6d4' }}>3</button>
          <button className="operator" onClick={() => handleOperator('+')} style={{ '--active-color': '#eab308' }}>+</button>

          <button className="zero" onClick={() => handleNum('0')} style={{ '--active-color': '#64748b' }}>0</button>
          <button onClick={handleDecimal} style={{ '--active-color': '#94a3b8' }}>.</button>
          <button className="equals" onClick={handleEquals} style={{ '--active-color': '#22c55e' }}>=</button>
        </div>
      </div>
    </>
  );
}

export default App;
