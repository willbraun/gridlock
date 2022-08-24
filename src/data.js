export const numbers = [
    1, 2, 3, 4, 5, 6, 
    7, 8, 9, 10, 12, 14, 
    15, 16, 18, 20, 21, 24, 
    25, 27, 28, 30, 32, 35, 
    36, 40, 42, 45, 48, 49, 
    54, 56, 63, 64, 72, 81
];

export const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const pointValues = [0, 1, 3, 9, 1000];

const getHorizontalQuads = numberArray => {
    const result = [];
    let position;
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 3; j++) {
            position = (6 * i) + j;
            result.push(numberArray.slice(position, position + 4));
        }
    }
    return result;
}

const getVerticalQuads = numberArray => {
    const result = [];
    let position;
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 3; j++) {
            position = i + (6 * j);
            result.push([numberArray[position], numberArray[position + 6], numberArray[position + 12], numberArray[position + 18]]);
        }
    }
    return result;
}

const getAscDiagonalQuads = numberArray => {
    const result = [];
    let position;
    for (let i = 3; i < 6; i++) {
        for (let j = 0; j < 3; j++) {
            position = (6 * i) + j;
            result.push([numberArray[position], numberArray[position - 5], numberArray[position - 10], numberArray[position - 15]]);
        }
    }
    return result;
}

const getDescDiagonalQuads = numberArray => {
    const result = [];
    let position;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            position = (6 * i) + j;
            result.push([numberArray[position], numberArray[position + 7], numberArray[position + 14], numberArray[position + 21]]);
        }
    }
    return result;
}

export const getAllQuads = numberArray => {
    return [
        ...getHorizontalQuads(numberArray),
        ...getVerticalQuads(numberArray),
        ...getAscDiagonalQuads(numberArray),
        ...getDescDiagonalQuads(numberArray),
    ]
}

export const settingsMap = {
    playAgainst: {
        0: {
            name: 'Human (local)',
            emoji: '👤',
        },
        1: {
            name: 'Computer - Easy',
            emoji: '🤖',
        },
        2: {
            name: 'Computer - Hard',
            emoji: '🤖⚡️',
        },
    },
    gridLayout: {
        0: 'Classic',
        1: 'Random',
    },
}