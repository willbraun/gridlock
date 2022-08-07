import NumberRow from "./NumberRow";

const NumberSelection = ({appState, setAppState, num1Multipliers, num2Multipliers}) => {
    
    return (
        <div>
            <NumberRow number={appState.num1} multipliers={num1Multipliers}/>
            <p>or</p>
            <NumberRow number={appState.num2} multipliers={num2Multipliers}/>
        </div>
    )
}

export default NumberSelection;