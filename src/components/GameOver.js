import './../styles/gameover.css';

const GameOver = ({appState, setAppState, isWin, isDraw, p1Color, p2Color, isComputerPlayer, startNewGame}) => {
    const winner = appState.currentPlayer1 ? p1Color : p2Color;
    const winnerCapital = winner.slice(0, 1).toUpperCase() + winner.slice(1);

    const getMessage = () => {
        if (isComputerPlayer) {
            if (winner === p1Color) {
                return 'You win! 🥳';
            }
            else {
                return 'You lose 😵';
            }
        }
        else {
            return `${winnerCapital} wins!`;
        }
    } 

    return (
        <div className={`game-over ${isWin && winner.toLowerCase()} ${isDraw && !isWin && 'draw'}`}>
            {isWin 
                ?   <h2>{getMessage()}</h2>
                :   isDraw 
                    ?   <h2>Draw</h2>
                    :   null
            }
            <button className="play-again" type="button" onClick={startNewGame}>Play again</button>
        </div>
    )
}

export default GameOver;