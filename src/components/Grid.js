import Square from "./Square";
import './../styles/grid.css';

const Grid = ({appState, setAppState, options, selectSquare, p1Color, p2Color}) => {

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

    const borderColor = () => {
        return appState.currentPlayer1 ? p1Color : p2Color;


        // if (isComputerPlayer) {
        //     if (appState.isComputerRed === appState.currentPlayer1) {
        //         return 'blue';
        //     }
        //     else {
        //         return 'red';
        //     }
        // }
        // else {
        //     return appState.currentPlayer1 ? 'red' : 'blue';
        // }
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