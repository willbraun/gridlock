import './../styles/square.css';

const Square = ({number}) => {
    return (
        <div className="square">
            <p>{number}</p>
        </div>
    )
}

export default Square;