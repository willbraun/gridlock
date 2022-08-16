import './../styles/gameover.css';

const GameOver = ({appState, setAppState, startGame, isWin, isDraw}) => {
    const winner = appState.currentPlayer1 ? 'Red' : 'Blue';
    
    const resetGame = () => {
        setAppState(startGame);
    }

    return (
        <div className={`game-over ${isWin && winner.toLowerCase()} ${isDraw && !isWin && 'draw'}`}>
            {isWin 
                ?   <h2>{`${winner} wins!`}</h2>
                :   isDraw 
                    ?   <h2>Draw</h2>
                    :   null
            }
            <button className="play-again" type="button" onClick={resetGame}>Play again</button>
        </div>
    )
}

export default GameOver;