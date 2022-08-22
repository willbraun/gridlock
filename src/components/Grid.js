import Square from "./Square";
import './../styles/grid.css';

const Grid = ({appState, setAppState, options, selectSquare, p1Color, p2Color, isComputerTurn}) => {

    const getSquareType = number => {
        let result = [];
        
        if (appState.winningQuad.includes(number)) {
            result.push('winningSquare');
        }

        if (appState.p1Squares.includes(number)) {
            result.push(`${p1Color}Square`);
        }
        else if (appState.p2Squares.includes(number)) {
            result.push(`${p2Color}Square`);
        }
        else if (appState.selected === number) {
            result.push('selectedSquare');
        }
        else if (options.includes(number)) {
            if (isComputerTurn) {
                result.push('compOptionSquare');
            }
            else {
                result.push('optionSquare');
            }
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

    const borderColor = () => {
        return appState.currentPlayer1 ? p1Color : p2Color;
    }

    
    const squares = appState.gridLayoutArray.map(num => <Square key={num} number={num} type={getSquareType(num)} selectSquare={selectSquare}/>)

    return (
        <div className={`grid-border ${borderColor()}`}>
            <div className="grid">
                {squares}
            </div>
        </div>
    )
}

export default Grid;