import { useState } from 'react';
import { numbers } from './../data';
import Square from "./Square";
import './../styles/grid.css';

const Grid = ({appState, setAppState, options}) => {
    const [state, setState] = useState({
        selected: 6,
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
        else if (options.includes(number)) {
            return 'optionSquare';
        }
        else {
            return 'notOptionSquare';
        }
    }

    const squares = numbers.map(num => <Square key={num} number={num} type={getSquareType(num)}/>)

    return (
        <div className="grid">
            {squares}
        </div>
    )
}

export default Grid;