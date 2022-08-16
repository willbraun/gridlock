const GameOver = ({appState, setAppState, startGame, isDraw}) => {
    const winner = appState.currentPlayer1 ? 'Red' : 'Blue';
    
    const resetGame = () => {
        setAppState(startGame);
    }

    return (
        <div className="game-over">
            {isDraw 
                ?   <h2>Draw</h2>
                :   <h2>{`${winner} wins!`}</h2>
            }
            <button className="play-again" type="button" onClick={resetGame}>Play again</button>
        </div>
    )
}

export default GameOver;