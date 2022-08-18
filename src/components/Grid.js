import Square from "./Square";
import './../styles/grid.css';

const Grid = ({appState, setAppState, options, selectSquare}) => {

    const getSquareType = number => {
        let result = [];
        
        if (appState.winningQuad.includes(number)) {
            result.push('winningSquare');
        }

        if (appState.p1Squares.includes(number)) {
            result.push('p1Square');
        }
        else if (appState.p2Squares.includes(number)) {
            result.push('p2Square');
        }
        else if (appState.selected === number) {
            result.push('selectedSquare');
        }
        else if (options.includes(number)) {
            result.push('optionSquare');
        }
        else {
            result.push('notOptionSquare');
        }
        return result.join(' ');
    }

    if (!appState.gridLayoutArray) {
        return (
            <div>Loading</div>
        )
    }

    const squares = appState.gridLayoutArray.map(num => <Square key={num} number={num} type={getSquareType(num)} selectSquare={selectSquare}/>)

    return (
        <div className={`grid-border ${appState.currentPlayer1 ? 'p1' : 'p2'}`}>
            <div className="grid">
                {squares}
            </div>
        </div>
    )
}

export default Grid;