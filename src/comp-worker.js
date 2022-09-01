/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

const worker = () => {
    if (typeof importScripts === 'function') {

        onmessage = (message) => {
            importScripts(message.data.url + '/helpers.js')

            postMessage(message.data);
        }

    }
    
    // onmessage = function(message) {
        


    //     // take in data and helper functions in message
    //     // move all decision tree code inside here 
    //     // return choices or just run confirm if I can pass that here
    //     postMessage(message.data);
    // }
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


