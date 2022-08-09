import './../styles/square.css';

const Square = ({number, type, selectSquare}) => {
    return (
        <button 
            className={`square ${type}`} 
            type="button" 
            onClick={() => selectSquare(number)}
            disabled={type !== 'optionSquare'}>
                <p>{number}</p>
        </button>
    )
}

export default Square;