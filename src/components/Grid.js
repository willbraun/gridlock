import { useState } from 'react';
import { numbers } from './../data';
import Square from "./Square";
import './../styles/grid.css';

const Grid = ({appState, setAppState}) => {
    const [state, setState] = useState({
        selected: null,
    })

    const getSquareType = number => {
        if (appState.p1Squares.includes(number)) {
            return 'p1Square';
        }
        else if (appState.p2Squares.includes(number)) {
            return 'p2Square';
        }
        else if (state.selected === number) {
            return 'selectedSquare';
        }
        // get possible squares and return optionSquare
        // move functions in numberselection up to app, add function for getting option squares, and pass to grid
        else {
            return 'notOptionSquare'
        }
    }

    const squares = numbers.map(num => <Square key={num} number={num} type={getSquareType(num)}/>)
    // include color in the map function, pass color as prop to square component, css styling on color

    return (
        <div className="grid">
            {squares}
        </div>
    )
}

export default Grid;