import './../styles/square.css';

const Square = ({number, type}) => {
    return (
        <div className={`square ${type}`}>
            <p>{number}</p>
        </div>
    )
}

export default Square;