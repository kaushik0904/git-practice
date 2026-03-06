import { useEffect } from 'react';

export const useKeyboard = (handlers) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            const { key } = e;
            if (/\d/.test(key)) handlers.handleNum(key);
            else if (key === '.') handlers.handleDecimal();
            else if (key === '=' || key === 'Enter') handlers.handleEquals();
            else if (key === 'Backspace') handlers.handleDel();
            else if (key === 'Escape') handlers.handleClear();
            else if (key === '%') handlers.handlePercentage();
            else if (key === '+') handlers.handleOperator('+');
            else if (key === '-') handlers.handleOperator('-');
            else if (key === '*') handlers.handleOperator('×');
            else if (key === '/') handlers.handleOperator('÷');
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handlers]);
};
