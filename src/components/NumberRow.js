import Number from "./Number";
import './../styles/numberrow.css';

const NumberRow = ({number, multipliers}) => {
    const multipliersList = multipliers.map(mult => <Number key={mult} value={mult}/>)

    return (
        <div className="number-row">
            <Number value={number}/>
            <p>x</p>
            <div className="multiplier-box">
                {multipliersList}
            </div>
        </div>
    )
}

export default NumberRow;