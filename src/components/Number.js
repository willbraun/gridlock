import './../styles/number.css';

const NumberCircle = ({value, selectMultiplier, selected, disabled}) => {

    return (
        <button 
            className={`number${
                selected === 1
                    ? ' selected' 
                    : selected === 2 
                        ? ' half-selected'
                        : ''
                }`} 
            type="button" 
            onClick={() => selectMultiplier(value)}
            disabled={disabled}>
            <p>{value}</p>
        </button>
    )
}

export default NumberCircle;