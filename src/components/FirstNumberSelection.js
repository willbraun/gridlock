import { useState } from 'react';
import NumberCircle from './NumberCircle';
import { digits } from './../data';
import './../styles/firstnumberselection.css';

const FirstNumberSelection = () => {
    const [state, setState] = useState({
        num1: null,
        num2: null,
    })

    const selectFirstNumbers = (number, property) => {
        setState({...state, [property]: number});
    }

    const [digitList1, digitList2] = ['num1', 'num2'].map(stateProperty => digits.map(digit => <NumberCircle key={digit} value={digit} selectFunction={() => selectFirstNumbers(digit, stateProperty)}/>));
    
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