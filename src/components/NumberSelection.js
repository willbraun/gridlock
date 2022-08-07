import { useState } from 'react';
import NumberRow from "./NumberRow";

const NumberSelection = ({appState, setAppState, num1Multipliers, num2Multipliers}) => {
    const [state, setState] = useState({
        selectedRow: null,
        selectedMultiplier: null,
    })

    return (
        <div>
            <NumberRow appState={appState} setAppState={setAppState} selectState={state} setSelectState={setState} number={appState.num1} multipliers={num1Multipliers}/>
            <p>or</p>
            <NumberRow appState={appState} setAppState={setAppState} selectState={state} setSelectState={setState} number={appState.num2} multipliers={num2Multipliers}/>
            <button className="confirm" type="button">Confirm</button>
        </div>
    )
}

export default NumberSelection;