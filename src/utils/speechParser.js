export const parseSpeechToCommands = (transcript) => {
    const words = transcript.toLowerCase().trim().split(/\s+/);
    const commands = [];

    const mapItem = (word) => {
        if (['to', 'too', 'two'].includes(word)) return '2';
        if (['for', 'four'].includes(word)) return '4';
        if (['one', 'won'].includes(word)) return '1';
        if (['tree', 'three'].includes(word)) return '3';
        if (['ate', 'eight'].includes(word)) return '8';
        if (['hero', 'zero'].includes(word)) return '0';

        if (['plus', 'add'].includes(word)) return '+';
        if (['minus', 'subtract', 'negative'].includes(word)) return '-';
        if (['times', 'multiply', 'multiplied', 'x', 'into'].includes(word)) return '*';
        if (['divide', 'divided', 'over'].includes(word)) return '/';

        if (['equals', 'calculate', 'equal', '='].includes(word)) return '=';
        if (['clear', 'reset', 'ac'].includes(word)) return 'Escape';
        if (['delete', 'backspace', 'remove'].includes(word)) return 'Backspace';
        if (['point', 'dot', 'decimal'].includes(word)) return '.';
        if (['percent', 'percentage'].includes(word)) return '%';

        return word;
    };

    const processedWords = words.map(mapItem);

    for (const item of processedWords) {
        if (!item) continue;
        if (/^\d+$/.test(item)) {
            for (const digit of item) {
                commands.push(digit);
            }
        } else if (item.length === 1 && /[\+\-\*\/\.\=\%]/.test(item)) {
            commands.push(item);
        } else if (['Escape', 'Backspace'].includes(item)) {
            commands.push(item);
        } else {
            for (const char of item) {
                if (/\d/.test(char)) commands.push(char);
                else if (['+', '-', '*', '/', '.', '=', '%'].includes(char)) commands.push(char);
            }
        }
    }

    return commands;
};
