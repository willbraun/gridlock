import { useState } from "react";
import Number from "./Number";
import './../styles/numberrow.css';

const NumberRow = ({appState, setAppState, selectState, setSelectState, number, multipliers}) => {
    
    const selectMultiplier = multiplier => {
        setSelectState({...selectState, selectedRow: number, selectedMultiplier: multiplier})
        setAppState({...appState, selected: number * multiplier})
    }
    
    const multipliersList = multipliers.map(mult => <Number key={mult} value={mult} selectMultiplier={selectMultiplier} selected={selectState.selectedMultiplier === mult}/>)

    return (
        <div className="number-row">
            <Number value={number} selected={!!selectState.selectedRow}/>
            <p>x</p>
            <div className="multiplier-box">
                {multipliersList}
            </div>
        </div>
    )
}

export default NumberRow;