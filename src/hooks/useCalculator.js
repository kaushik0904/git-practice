import { useState, useCallback } from 'react';
import { playSound } from '../utils/sound';

export const useCalculator = () => {
    const [display, setDisplay] = useState('0');
    const [equation, setEquation] = useState('');
    const [previousValue, setPreviousValue] = useState(null);
    const [operator, setOperator] = useState(null);
    const [waitingForNewValue, setWaitingForNewValue] = useState(false);

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

    const handleNum = useCallback((num) => {
        playSound();
        if (waitingForNewValue) {
            setDisplay(String(num));
            setWaitingForNewValue(false);
        } else {
            setDisplay(prev => prev === '0' ? String(num) : prev + num);
        }
    }, [waitingForNewValue]);

    const handleOperator = useCallback((nextOp) => {
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
            const roundedResult = Math.round(result * 100000000) / 100000000;
            setDisplay(String(roundedResult));
            setPreviousValue(result);
            setEquation(`${roundedResult} ${nextOp}`);
        }

        setWaitingForNewValue(true);
        setOperator(nextOp);
    }, [display, equation, operator, previousValue, waitingForNewValue]);

    const handleEquals = useCallback(() => {
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
    }, [display, operator, previousValue, waitingForNewValue]);

    const handleClear = useCallback(() => {
        playSound();
        setDisplay('0');
        setEquation('');
        setPreviousValue(null);
        setOperator(null);
        setWaitingForNewValue(false);
    }, []);

    const handleDel = useCallback(() => {
        playSound();
        if (waitingForNewValue) return;
        setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
    }, [waitingForNewValue]);

    const handleDecimal = useCallback(() => {
        playSound();
        if (waitingForNewValue) {
            setDisplay('0.');
            setWaitingForNewValue(false);
            return;
        }
        if (!display.includes('.')) {
            setDisplay(prev => prev + '.');
        }
    }, [display, waitingForNewValue]);

    const handlePercentage = useCallback(() => {
        playSound();
        const value = parseFloat(display);
        setDisplay(String(value / 100));
    }, [display]);

    const handleToggleSign = useCallback(() => {
        playSound();
        setDisplay(prev => prev.charAt(0) === '-' ? prev.slice(1) : '-' + prev);
    }, []);

    return {
        display,
        equation,
        handleNum,
        handleOperator,
        handleEquals,
        handleClear,
        handleDel,
        handleDecimal,
        handlePercentage,
        handleToggleSign,
    };
};
