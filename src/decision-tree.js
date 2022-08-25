import { getMultipliers, getComputerChoices } from './helpers';

class Node {
    constructor({id, humanSquares, compSquares, num1, num2, value = null} = {}) {
        this.id = id;
        this.compTurn = true;
        this.humanSquares = humanSquares;
        this.compSquares = compSquares;
        this.num1 = num1;
        this.num2 = num2;
        this.value = value;
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


class Tree {
    constructor() {
        this.root = null;
    }

    add({id, toNodeId, humanSquares, compSquares, num1, num2, value} = {}) {
        const node = new Node({id, humanSquares, compSquares, num1, num2, value});

        const parent = toNodeId ? this.findBFS(toNodeId) : null;

        if (parent) {
            parent.children.push(node);
        }
        else {
            if(!this.root) {
                this.root = node;
            }
            else {
                return "Tried to store node at root when root already exists.";
            }
        }
    }

    findBFS(id) {
        let _node = null;

        this.traverseBFS(node => {
            if (node.id === id) {
                _node = node;
            }
        })

        return _node;
    }

    traverseBFS(callback) {
        const queue = [this.root];

        if (callback) {
            while (queue.length) {
                const node = queue.shift();

                callback(node);

                for (const child of node.children) {
                    queue.push(child);
                }
            }
        }
    }
}

const getNodeChoices = node => {
    console.log(node.humanSquares)
    const num1Multipliers = getMultipliers(node.num1, node.humanSquares, node.compSquares);
    const num2Multipliers = getMultipliers(node.num2, node.humanSquares, node.compSquares);
    return getComputerChoices(node.num1, node.num2, num1Multipliers, num2Multipliers);
}

const getChildNodes = (node, currentId) => {
    const result = [];
    let id = currentId;
    const [playerSquares, otherPlayerSquares] = node.compTurn ? ['compSquares', 'humanSquares'] : ['humanSquares', 'compSquares'];
    const choices = getNodeChoices(node);

    choices.forEach(choice => {
        const newArray = [...node[playerSquares]]
        newArray.push(choice.num * choice.mult);

        const newNode = new Node({
            id: id,
            toNodeId: node.id,
            [playerSquares]: newArray,
            [otherPlayerSquares]: node[otherPlayerSquares],
            num1: choice.num,
            num2: choice.mult,
        })

        result.push(newNode);
        id++;
    })

    return result;
}

const createTree = (humanSquares, compSquares, num1, num2, depth) => {
    const tree = new Tree();
    const currentId = 1;

    // each iteration of findChildren, update currentId to be itself += results.length

    // function to get children from a node as an array of Node objects
    // Add them to the tree with forEach
    // after all children have had their children found, go to next level in depth and run again with 1 less depth, and flip compTurn
    // stop after depth = 0
}

export const testTree = () => {
    let tree = new Tree();

    tree.add({
        id: 1,
        humanSquares: [28],
        compSquares: [45],
        num1: 4,
        num2: 7,
    });
}