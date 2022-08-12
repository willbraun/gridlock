import { numbers } from './../data';
import Square from "./Square";
import './../styles/grid.css';

const Grid = ({appState, setAppState, options, selectSquare}) => {
    
    const getSquareType = number => {
        if (appState.p1Squares.includes(number)) {
            return 'p1Square';
        }
        else if (appState.p2Squares.includes(number)) {
            return 'p2Square';
        }
        else if (appState.selected === number) {
            return 'selectedSquare';
        }
        else if (options.includes(number)) {
            return 'optionSquare';
        }
        else {
            return 'notOptionSquare';
        }
    }

    const squares = numbers.map(num => <Square key={num} number={num} type={getSquareType(num)} selectSquare={selectSquare}/>)

    return (
        <div className={`grid-border ${appState.currentPlayer1 ? 'p1' : 'p2'}`}>
            <div className="grid">
                {squares}
            </div>
        </div>
    )
}

export default Grid;