import { numbers, pointValues } from './data';

export const isSingleDigitInt = num => {
    return Number.isInteger(num) && num < 10;
}

const getAvailableSqaures = (p1Squares, p2Squares) => {
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
    const choices2 = num2Multipliers.map(mult => Object.fromEntries([['num', num2], ['mult', mult]]));
    return [...choices1, ...choices2];
}

const countColors = (quad, playerSquares) => {
    return quad.filter(x => playerSquares.includes(x)).length;
}

const evaluateQuad = (quad, humanSquares, compSquares) => {
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

// temporary note - to be used with winningQuads variable in App currently
export const evaluateBoard = (winningQuads, humanSquares, compSquares) => {
    return winningQuads.map(quad => evaluateQuad(quad, humanSquares, compSquares)).reduce((a, b) => a + b, 0);
}


const computerMinimaxPlay = () => {
    console.log('minimax choice');
}