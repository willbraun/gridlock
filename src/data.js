// Updates to numbers, digits, and pointValues (which should be rare), also need to be made in comp-worker.js for the same reason as helpers.js

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