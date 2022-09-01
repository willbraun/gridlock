// import { getComputerChoiceNums } from "./decision-tree.js";

/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

const worker = () => {
    onmessage = function(message) {
        postMessage(message.data);
    }
}



export default worker;

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


