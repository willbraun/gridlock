import './../styles/number.css';

const Number = ({value, selectMultiplier, selected}) => {
    
    return (
        <button className={`number${selected ? ' selected' : ''}`} type="button" onClick={() => selectMultiplier(value)}>
            <p>{value}</p>
        </button>
    )
}

export default Number;