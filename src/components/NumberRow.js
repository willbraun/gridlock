import NumberCircle from "./Number";
import './../styles/numberrow.css';

const NumberRow = ({appState, setAppState, number, multipliers}) => {
    
    const selectMultiplier = multiplier => {
        setAppState({...appState, selected: number * multiplier, selectedRow: number, selectedMultiplier: multiplier, selectedRow2: null, selectedMultiplier2: null})
    }

    const bothRows = !!appState.selectedMultiplier && !!appState.selectedMultiplier2;

    const isSelectedRow = () => {
        if (bothRows) {
            return 2;
        }
        else if (!bothRows && appState.selectedRow === number) {
            return 1;
        }
        else {
            return 0;
        }
    }

    const isSelectedMultiplier = multiplier => {
        if (bothRows && appState.selected === number * multiplier) {
            return 2;
        }
        else if (appState.selected === number * multiplier && appState.selectedMultiplier === multiplier) {
            return 1;
        }
        else {
            return 0;
        }
    }

    
    const multipliersList = multipliers.map(mult => <NumberCircle key={mult} value={mult} selectMultiplier={selectMultiplier} selected={isSelectedMultiplier(mult)} disabled={false}/>)

    return (
        <div className="number-row">
            <NumberCircle key={number} value={number} selected={isSelectedRow()} disabled={true}/>
            <p className="multiplier-x">x</p>
            <div className="multiplier-box">
                {multipliersList}
            </div>
        </div>
    )
}

export default NumberRow;