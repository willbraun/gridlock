import './../styles/numbercircle.css';

const NumberCircle = ({value, selectFunction, selected, disabled}) => {

    return (
        <button 
            className={`number-circle${
                selected === 1
                    ? ' selected' 
                    : selected === 2 
                        ? ' half-selected'
                        : ''
                }`} 
            type="button" 
            onClick={() => selectFunction(value)}
            disabled={disabled}>
            <p>{value}</p>
        </button>
    )
}

export default NumberCircle;