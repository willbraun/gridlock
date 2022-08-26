import { numbers } from './data';
import { getMultipliers, getComputerChoices, getAllQuads, evaluateBoard } from './helpers';

class Node {
    constructor({id, compTurn, humanSquares, compSquares, num1, num2} = {}) {
        this.id = id;
        this.compTurn = compTurn;
        this.humanSquares = humanSquares;
        this.compSquares = compSquares;
        this.num1 = num1;
        this.num2 = num2;
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

// if performance is a problem, 
// - try deleting humanSquares, compSquares, nums, and multipliers from the parent after the children are created so each node isn't so big
// - try to get rid of traverse function since nodes should be added in a specific order. We shouldn't have to traverse the tree to find where to add a node.


// class Tree {
//     constructor() {
//         this.root = null;
//     }

//     add({id, compTurn, toNodeId, humanSquares, compSquares, num1, num2, value} = {}) {
//         const node = new Node({id, compTurn, humanSquares, compSquares, num1, num2, value});

//         const parent = toNodeId ? this.findBFS(toNodeId) : null;

//         if (parent) {
//             parent.children.push(node);
//         }
//         else {
//             if(!this.root) {
//                 this.root = node;
//             }
//             else {
//                 return "Tried to store node at root when root already exists.";
//             }
//         }
//     }

//     findBFS(id) {
//         let _node = null;

//         this.traverseBFS(node => {
//             if (node.id === id) {
//                 _node = node;
//             }
//         })

//         return _node;
//     }

//     traverseBFS(callback) {
//         const queue = [this.root];

//         if (callback) {
//             while (queue.length) {
//                 const node = queue.shift();

//                 callback(node);

//                 for (const child of node.children) {
//                     queue.push(child);
//                 }
//             }
//         }
//     }
// }

const getNodeChoices = node => {
    const num1Multipliers = getMultipliers(node.num1, node.humanSquares, node.compSquares);
    const num2Multipliers = getMultipliers(node.num2, node.humanSquares, node.compSquares);
    return getComputerChoices(node.num1, node.num2, num1Multipliers, num2Multipliers);
}

const getChildNodes = (node, depth, incrementNodeId, getNodeId, winningQuads) => {
    if (depth === 0) {
        node.value = evaluateBoard(winningQuads, node.humanSquares, node.compSquares);
        return;
    }
    
    const childNodes = [];
    const [playerSquares, otherPlayerSquares] = node.compTurn ? ['compSquares', 'humanSquares'] : ['humanSquares', 'compSquares'];
    const choices = getNodeChoices(node);

    choices.forEach(choice => {
        const newArray = [...node[playerSquares]]
        newArray.push(choice.num * choice.mult);

        const newNode = new Node({
            id: getNodeId(),
            compTurn: !node.compTurn,
            toNodeId: node.id,
            [playerSquares]: newArray,
            [otherPlayerSquares]: node[otherPlayerSquares],
            num1: choice.num,
            num2: choice.mult,
        })

        childNodes.push(newNode);
        incrementNodeId();
    })

    node.children.push(...childNodes);
    node.children.forEach(child => getChildNodes(child, depth - 1, incrementNodeId, getNodeId, winningQuads));
}

const minimax = (node, depth, isMaxPlayer) => {
    if (depth === 0 || node.children.length === 0) {
        return node.value;
    }

    let bestValue, value;

    if (isMaxPlayer) {
        bestValue = Number.NEGATIVE_INFINITY;

        node.children.forEach(child => {
            value = minimax(child, depth - 1, false);
            bestValue = Math.max(value, bestValue);
        })

        node.value = bestValue;
        return bestValue;
    }
    else {
        bestValue = Number.POSITIVE_INFINITY;

        node.children.forEach(child => {
            value = minimax(child, depth - 1, true);
            bestValue = Math.min(value, bestValue);
        })

        node.value = bestValue;
        return bestValue;
    }
}

const testMinimax = {
    children: [
        {
            children: [
                {
                    value: 5,
                },
                {
                    value: -9,
                },
                {
                    value: 0,
                },
            ]
        },
        {
            children: [
                {
                    value: 9,
                },
                {
                    value: -3,
                },
                {
                    value: 2,
                },
            ]
        },
    ]
}

const createTree = (humanSquares, compSquares, num1, num2, winningQuads, depth) => {
    const tree = new Node({id: 1, compTurn: true, humanSquares, compSquares, num1, num2});
    let nodeId = 2;

    const incrementNodeId = () => nodeId++;
    const getNodeId = () => nodeId;

    getChildNodes(tree, depth, incrementNodeId, getNodeId, winningQuads);
    return tree;
}

export const getComputerChoiceNums = (humanSquares, compSquares, num1, num2, gridLayout, depth) => {
    const winningQuads = getAllQuads(gridLayout);
    const tree = createTree(humanSquares, compSquares, num1, num2, winningQuads, depth);
    minimax(tree, depth, true);
    
    const choice = tree.children.find(node => node.value === tree.value);
    console.log(tree);
    console.log(tree.children.map(node => node.value));
    console.log(choice);
    return [choice.num1, choice.num2];
}

export const testTree = () => {
    // console.log(evaluateBoard(getAllQuads(numbers), [18, 30, 36, 4, 8, 10, 2, 5, 15, 28, 32, 54], [42, 48, 6, 20, 12, 16, 1, 25, 35, 56, 72, 24]));
    // console.log(minimax(testMinimax, 2, true));
    // const choice = computerMinimaxPlay([28], [45], 4, 7, array, 2);
    // console.log(choice);
}