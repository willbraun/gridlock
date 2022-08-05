import { useState } from 'react';
import { numbers } from './../data';
import Square from "./Square";
import './../styles/grid.css';

const Grid = ({appState, setAppState}) => {
    const [state, setState] = useState({
        selected: null,
    })

    const squares = numbers.map(num => <Square key={num} number={num}/>)

    return (
        <div className="grid">
            {squares}
        </div>
    )
}

export default Grid;