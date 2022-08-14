import NumberRow from "./NumberRow";

const NumberSelection = ({appState, setAppState, num1Multipliers, num2Multipliers}) => {

    return (
        <div className="number-selection">
            <NumberRow appState={appState} setAppState={setAppState} number={appState.num1} multipliers={num1Multipliers}/>
            {appState.num1 !== appState.num2 &&
            <>
                <p>or</p>
                <NumberRow appState={appState} setAppState={setAppState} number={appState.num2} multipliers={num2Multipliers}/>
            </>
            }
        </div>
    )
}

export default NumberSelection;