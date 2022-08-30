import { digits } from './data';
import { getMultipliers, getComputerChoices, getAllQuads, evaluateBoard } from './helpers';

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

// data is the index of the node, unique identifier in the whole tree. 
// minimax algorithm assumes you already have the tree with values in the bottom nodes

// node represents a board position
// children nodes will be possible positions after the parent
// children nodes represent a MULTIPLIER selection
// - you can have the same optionSquare but with different multipliers, which affects further decisions down the tree
// children nodes are created by checking all num1 * num1Multipliers and num2* num2Multipliers, adding those products to the current players turn, and setting new nums and multipliers
// include humanSquares, compSquares, and whose turn it is on the node
// alternate turns each level in depth

// when creating nodes not at at max depth, do not include value
// when creating nodes at max depth, include value
// to include value, take humanSquares and compSquares and feed to evaluateBoard

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
    return tree;
}

export const getComputerChoiceNums = (humanSquares, compSquares, num1, num2, gridLayout, depth) => {
    const winningQuads = getAllQuads(gridLayout);
    const tree = createTree(humanSquares, compSquares, num1, num2, winningQuads, depth);
    
    const choice = tree.children.find(node => node.value === tree.value);
    console.log(tree);
    console.log(tree.children.map(node => node.value));
    console.log(choice);
    return [choice.num1, choice.num2];
}

export const getComputerFirstChoice = (gridLayout) => {
    const trees = [];
    const winningQuads = getAllQuads(gridLayout);
    const depth = 2;

    for (const i of digits) {
        for (let j = i; j < 10; j++) {
            const tree = createTree([], [], i, j, winningQuads, depth);
            trees.push(tree);
        }
    }

    const max = Math.max(...trees.map(rootNode => rootNode.value));
    const choices = trees.filter(rootNode => rootNode.value === max);
    const choice = choices[Math.floor(Math.random() * choices.length)];

    return [choice.num1, choice.num2];
}



const testTree = () => {
    // console.log(evaluateBoard(getAllQuads(numbers), [18, 30, 36, 4, 8, 10, 2, 5, 15, 28, 32, 54], [42, 48, 6, 20, 12, 16, 1, 25, 35, 56, 72, 24]));
    // console.log(minimax(testMinimax, 2, true));
    // const choice = computerMinimaxPlay([28], [45], 4, 7, array, 2);
    // console.log(choice);
}