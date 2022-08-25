// import { getMultipliers } from './App';

class Node {
    constructor(data, humanSquares, compSquares, num1, num2, value = null) {
        this.data = data;
        this.compTurn = true;
        this.humanSquares = humanSquares;
        this.compSquares = compSquares;
        this.num1 = num1;
        this.num2 = num2;
        // this.num1Multipliers = getMultipliers(this.num1);
        // this.num2Multipliers = getMultipliers(this.num2);
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


class Tree {
    constructor() {
        this.root = null;
    }

    add(data, toNodeData) {
        const node = new Node(data);

        const parent = toNodeData ? this.findBFS(toNodeData) : null;
    }


}

(function test() {
    const testNode = new Node(1, [1, 2, 3], [4, 5, 6], 4, 9);
    console.log(testNode);
})()