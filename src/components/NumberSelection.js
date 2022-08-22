import NumberRow from "./NumberRow";

const NumberSelection = ({appState, setAppState, num1Multipliers, num2Multipliers, isComputerTurn}) => {

    return (
        <div className="number-selection">
            <NumberRow appState={appState} setAppState={setAppState} number={appState.num1} multipliers={num1Multipliers} isComputerTurn={isComputerTurn}/>
            {appState.num1 !== appState.num2 &&
            <>
                
                <NumberRow appState={appState} setAppState={setAppState} number={appState.num2} multipliers={num2Multipliers} isComputerTurn={isComputerTurn}/>
            </>
            }
        </div>
    )
}

export default NumberSelection;