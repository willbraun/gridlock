import { numbers, digits, pointValues } from './data';

export const isSingleDigitInt = num => {
    return Number.isInteger(num) && num < 10;
}

export const randomDigit = () => {
    return digits[Math.floor(Math.random() * 9)];
}

export const getAvailableSqaures = (p1Squares, p2Squares) => {
    const taken = [...p1Squares, ...p2Squares];
    let result = [...numbers];

    taken.forEach(num => {
        const index = result.findIndex(resultNum => resultNum === num);
        result.splice(index, 1);
    })

    return result;
}

export const getMultipliers = (number, p1Squares, p2Squares) => {
    const available = getAvailableSqaures(p1Squares, p2Squares);
    return available.map(num => num/number).filter(num => isSingleDigitInt(num));
}

export const getComputerChoices = (num1, num2, num1Multipliers, num2Multipliers) => {
    const choices1 = num1Multipliers.map(mult => Object.fromEntries([['num', num1], ['mult', mult]]));
    if (num1 === num2) {
        return choices1;
    }
    else {
        const choices2 = num2Multipliers.map(mult => Object.fromEntries([['num', num2], ['mult', mult]]));
        return [...choices1, ...choices2];
    }
}

export const getHorizontalQuads = numberArray => {
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

export const getVerticalQuads = numberArray => {
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

export const getAscDiagonalQuads = numberArray => {
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

export const getDescDiagonalQuads = numberArray => {
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

export const countColors = (quad, playerSquares) => {
    return quad.filter(x => playerSquares.includes(x)).length;
}

export const evaluateQuad = (quad, humanSquares, compSquares) => {
    const humanCount = countColors(quad, humanSquares);
    const compCount = countColors(quad, compSquares);
    if (humanCount === 0) {
        return pointValues[compCount];
    }
    else if (compCount === 0) {
        return -pointValues[humanCount];
    }
    else {
        return 0;
    }
}

export const evaluateBoard = (winningQuads, humanSquares, compSquares) => {
    return winningQuads.map(quad => evaluateQuad(quad, humanSquares, compSquares)).reduce((a, b) => a + b, 0);
}