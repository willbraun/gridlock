

/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */


onmessage = (message) => {
    const numbers = [
        1, 2, 3, 4, 5, 6, 
        7, 8, 9, 10, 12, 14, 
        15, 16, 18, 20, 21, 24, 
        25, 27, 28, 30, 32, 35, 
        36, 40, 42, 45, 48, 49, 
        54, 56, 63, 64, 72, 81
    ];
    
    const pointValues = [0, 1, 3, 9, 1000];

    const isSingleDigitInt = num => {
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
    
    const getMultipliers = (number, p1Squares, p2Squares) => {
        const available = getAvailableSqaures(p1Squares, p2Squares);
        return available.map(num => num/number).filter(num => isSingleDigitInt(num));
    }
    
    const getComputerChoices = (num1, num2, num1Multipliers, num2Multipliers) => {
        const choices1 = num1Multipliers.map(mult => Object.fromEntries([['num', num1], ['mult', mult]]));
        if (num1 === num2) {
            return choices1;
        }
        else {
            const choices2 = num2Multipliers.map(mult => Object.fromEntries([['num', num2], ['mult', mult]]));
            return [...choices1, ...choices2];
        }
    }
    
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
    
    const getAllQuads = numberArray => {
        return [
            ...getHorizontalQuads(numberArray),
            ...getVerticalQuads(numberArray),
            ...getAscDiagonalQuads(numberArray),
            ...getDescDiagonalQuads(numberArray),
        ]
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
    
    const evaluateBoard = (winningQuads, humanSquares, compSquares) => {
        return winningQuads.map(quad => evaluateQuad(quad, humanSquares, compSquares)).reduce((a, b) => a + b, 0);
    }

    class Node {
        constructor({id, compTurn, alpha, beta, humanSquares, compSquares, num1, num2} = {}) {
            this.id = id;
            this.num1 = num1;
            this.num2 = num2;
            this.value = null;
            this.alpha = alpha;
            this.beta = beta;
            this.compTurn = compTurn;
            this.humanSquares = humanSquares;
            this.compSquares = compSquares;
            this.children = [];
        }
    }

    const setNodeValue = (node, value) => {
        node.value = value;
        node.alpha = null;
        node.beta = null;
    }
    
    const getNodeChoices = node => {
        const num1Multipliers = getMultipliers(node.num1, node.humanSquares, node.compSquares);
        const num2Multipliers = getMultipliers(node.num2, node.humanSquares, node.compSquares);
        return getComputerChoices(node.num1, node.num2, num1Multipliers, num2Multipliers);
    }
    
    const getChildNodes = (node, depth, getNodeId, incrementNodeId, winningQuads) => {
        if (depth === 0) {
            const value = evaluateBoard(winningQuads, node.humanSquares, node.compSquares);
            setNodeValue(node, value);
            return;
        }
    
        const currentValue = evaluateBoard(winningQuads, node.humanSquares, node.compSquares);
        if (Math.abs(currentValue) > 600) {
            setNodeValue(node, currentValue);
            return;
        }
        
        const [playerSquares, otherPlayerSquares] = node.compTurn ? ['compSquares', 'humanSquares'] : ['humanSquares', 'compSquares'];
        const choices = getNodeChoices(node);
    
        for (const choice of choices) {
            if (node.alpha >= node.beta) {
                break;
            }
    
            const newArray = [...node[playerSquares]];
            newArray.push(choice.num * choice.mult);
    
            const newNode = new Node({
                id: getNodeId(),
                alpha: node.alpha,
                beta: node.beta,
                num1: choice.num,
                num2: choice.mult,
                compTurn: !node.compTurn,
                [playerSquares]: newArray,
                [otherPlayerSquares]: node[otherPlayerSquares],
            })
    
            node.children.push(newNode);
            incrementNodeId();
    
            getChildNodes(newNode, depth - 1, getNodeId, incrementNodeId, winningQuads);
    
            const childValues = node.children.map(child => [child.alpha, child.beta, child.value]).flat();
        
            if (node.compTurn) {
                const max = Math.max(...childValues);
                node.value = max;
                if (max > node.alpha) {
                    node.alpha = max;
                }
            } 
            else {
                const min = Math.min(...childValues);
                node.value = min;
                if (min < node.beta) {
                    node.beta = min;
                }
            }
        }
    }
    
    const createTree = (humanSquares, compSquares, num1, num2, winningQuads, depth) => {
        const tree = new Node({id: 1, compTurn: true, alpha: Number.NEGATIVE_INFINITY, beta: Number.POSITIVE_INFINITY, humanSquares, compSquares, num1, num2});
        let nodeId = 2;
    
        const getNodeId = () => nodeId;
        const incrementNodeId = () => nodeId++;
    
        getChildNodes(tree, depth, getNodeId, incrementNodeId, winningQuads);
        console.log(nodeId, 'nodes');
        return [tree, nodeId];
    }
    
    const getComputerChoiceNums = ({humanSquares, compSquares, num1, num2, gridLayout, depth}) => {
        const winningQuads = getAllQuads(gridLayout);
        const [tree, nodeId] = createTree(humanSquares, compSquares, num1, num2, winningQuads, depth);
        
        const choice = tree.children.find(node => node.value === tree.value);
        console.log(tree);
        console.log(tree.children.map(node => node.value));
        console.log(choice);
        return [choice.num1, choice.num2, nodeId];
    }

    postMessage(getComputerChoiceNums(message.data));
    
    // const getComputerFirstChoice = (gridLayout) => {
    //     const trees = [];
    //     const winningQuads = getAllQuads(gridLayout);
    //     const depth = 2;
    
    //     for (const i of digits) {
    //         for (let j = i; j < 10; j++) {
    //             const tree = createTree([], [], i, j, winningQuads, depth);
    //             trees.push(tree);
    //         }
    //     }
    
    //     const max = Math.max(...trees.map(rootNode => rootNode.value));
    //     const choices = trees.filter(rootNode => rootNode.value === max);
    //     const choice = choices[Math.floor(Math.random() * choices.length)];
    
    //     return [choice.num1, choice.num2];
    // }

}



// onmessage = (message) => {
//     // const data = JSON.parse(message.data.data);
//     const helperFuncs = {};
//     JSON.parse(message.data.helpers).forEach(helper => {
//         let [args, ...func] = helper.func.split('=>');
//         args = args.replace(/[() ]/gm, '').split(',');
        
//         helperFuncs[helper.name] = new Function(...args, func.join('=>'))
//     })
//     console.log(helperFuncs.randomDigit)
//     // postMessage(helperFuncs.toString());
// }

// const worker = () => {
//     if (typeof importScripts === 'function') {

//         onmessage = (message) => {
//             importScripts(message.data.url + '/helpers.js')

//             postMessage(message.data);
//         }

//     }
    
//     // onmessage = function(message) {
        


//     //     // take in data and helper functions in message
//     //     // move all decision tree code inside here 
//     //     // return choices or just run confirm if I can pass that here
//     //     postMessage(message.data);
//     // }
// }



// default worker;

        // if (typeof importScripts === 'function') {

        //     // convert decision-tree and helpers files to blobs

        //     // get URL from blob
        //     // add URL to importScripts
        //     // importScripts(`${path}/decision-tree.js`);
        //     // importScripts('helpers.js');
        // }

// addEventListener('message', message => {
//     const result = getComputerChoiceNums(message);

//     postMessage(result);
//   });

// onmessage = function(message) {
//         const result = getComputerChoiceNums(message);
    
//         postMessage(result);
//     }

// onmessage = function({humanSquares, compSquares, num1, num2, gridLayout, depth}) {
    
//     const choiceNums = getComputerChoiceNums(humanSquares, compSquares, num1, num2, gridLayout, depth);
//     postMessage(choiceNums);
// }


