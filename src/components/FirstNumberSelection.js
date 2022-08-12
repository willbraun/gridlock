import NumberCircle from './NumberCircle';
import { digits } from './../data';
import './../styles/firstnumberselection.css';

const FirstNumberSelection = ({appState, setAppState}) => {

    const selectFirstNumbers = (number, property) => {
        if (property === 'selectedRow' && !!appState.selectedMultiplier) {
            const selected = number * appState.selectedMultiplier;
            setAppState({...appState, [property]: number, selected: selected})
        }
        else if (property === 'selectedMultiplier' && !!appState.selectedRow) {
            const selected = number * appState.selectedRow;
            setAppState({...appState, [property]: number, selected: selected})
        }
        else {
            setAppState({...appState, [property]: number});
        }
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
        <div className="first-number-selection">
            <div className="digit-grid">
                {digitList1}
            </div>
            <p className="first-x">x</p>
            <div className="digit-grid">
                {digitList2}
            </div>
        </div>
    )
}

export default FirstNumberSelection;