export const numbers = [
    1, 2, 3, 4, 5, 6, 
    7, 8, 9, 10, 12, 14, 
    15, 16, 18, 20, 21, 24, 
    25, 27, 28, 30, 32, 35, 
    36, 40, 42, 45, 48, 49, 
    54, 56, 63, 64, 72, 81
];

export const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const getHorizontalQuads = (numberArray) => {
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

const getVerticalQuads = (numberArray) => {
    const result = [];
    let position;
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 3; j++) {
            position = i + 6 * j;
            result.push([numberArray[position], numberArray[position + 6], numberArray[position + 12], numberArray[position + 18]]);
        }
    }
    return result;
}

