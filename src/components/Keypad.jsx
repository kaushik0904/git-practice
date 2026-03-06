export const Keypad = ({ handlers }) => {
    const {
        handleNum,
        handleOperator,
        handleEquals,
        handleClear,
        handleDecimal,
        handlePercentage,
        handleToggleSign
    } = handlers;

    const buttons = [
        { label: 'AC', className: 'clear', onClick: handleClear, color: '#f43f5e' },
        { label: '+/-', className: '', onClick: handleToggleSign, color: '#a855f7' },
        { label: '%', className: '', onClick: handlePercentage, color: '#06b6d4' },
        { label: '÷', className: 'operator', onClick: () => handleOperator('÷'), color: '#d946ef' },

        { label: '7', className: '', onClick: () => handleNum('7'), color: '#3b82f6' },
        { label: '8', className: '', onClick: () => handleNum('8'), color: '#0ea5e9' },
        { label: '9', className: '', onClick: () => handleNum('9'), color: '#06b6d4' },
        { label: '×', className: 'operator', onClick: () => handleOperator('×'), color: '#ec4899' },

        { label: '4', className: '', onClick: () => handleNum('4'), color: '#6366f1' },
        { label: '5', className: '', onClick: () => handleNum('5'), color: '#8b5cf6' },
        { label: '6', className: '', onClick: () => handleNum('6'), color: '#a855f7' },
        { label: '-', className: 'operator', onClick: () => handleOperator('-'), color: '#f97316' },

        { label: '1', className: '', onClick: () => handleNum('1'), color: '#10b981' },
        { label: '2', className: '', onClick: () => handleNum('2'), color: '#14b8a6' },
        { label: '3', className: '', onClick: () => handleNum('3'), color: '#06b6d4' },
        { label: '+', className: 'operator', onClick: () => handleOperator('+'), color: '#eab308' },

        { label: '0', className: 'zero', onClick: () => handleNum('0'), color: '#64748b' },
        { label: '.', className: '', onClick: handleDecimal, color: '#94a3b8' },
        { label: '=', className: 'equals', onClick: handleEquals, color: '#22c55e' },
    ];

    return (
        <div className="keypad">
            {buttons.map((btn, index) => (
                <button
                    key={index}
                    className={btn.className}
                    onClick={btn.onClick}
                    style={{ '--active-color': btn.color }}
                >
                    {btn.label}
                </button>
            ))}
        </div>
    );
};
