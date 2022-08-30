import { getComputerChoiceNums } from "./decision-tree.js";

onmessage = function(message) {
    const result = getComputerChoiceNums(message);
    postMessage(result);
}

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


