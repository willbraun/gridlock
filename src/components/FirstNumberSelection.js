import NumberCircle from './NumberCircle';
import { digits } from './../data';
import './../styles/firstnumberselection.css';

const FirstNumberSelection = (appState, setAppState) => {

    const selectFirstNumbers = (number, property) => {
        console.log(setAppState);
        console.log(appState);
        setAppState({...appState, [property]: number});
    }

    const [digitList1, digitList2] = ['selectedRow', 'selectedMultiplier'].map(stateProperty => digits.map(digit => 
        <NumberCircle 
            key={digit} 
            value={digit} 
            selectFunction={() => selectFirstNumbers(digit, stateProperty)}
            selected={appState[stateProperty] === digit ? 1 : 0}
            />
        ));
    
    return (
        <>
        <p>Select a number from each side</p>
        <div className="first-number-selection">
            <div className="digit-grid">
                {digitList1}
            </div>
            <div className="divider"></div>
            <div className="digit-grid">
                {digitList2}
            </div>
        </div>
        </>
        
    )
}

export default FirstNumberSelection;