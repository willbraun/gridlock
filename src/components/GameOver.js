import './../styles/gameover.css';

const GameOver = ({appState, setAppState, startGame, isWin, isDraw, p1Color, p2Color}) => {
    const winner = appState.currentPlayer1 ? p1Color : p2Color;
    const winnerCapital = winner.slice(0, 1).toUpperCase() + winner.slice(1);
    
    const resetGame = () => {
        setAppState(startGame);
    }

    return (
        <div className={`game-over ${isWin && winner.toLowerCase()} ${isDraw && !isWin && 'draw'}`}>
            {isWin 
                ?   <h2>{`${winnerCapital} wins!`}</h2>
                :   isDraw 
                    ?   <h2>Draw</h2>
                    :   null
            }
            <button className="play-again" type="button" onClick={resetGame}>Play again</button>
        </div>
    )
}

export default GameOver;