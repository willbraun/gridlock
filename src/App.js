import { useState } from 'react';
import Header from './components/Header';
import Grid from './components/Grid';
import './App.css';
import './styles/header.css';
import NumberSelection from './components/NumberSelection';
import NumberCircle from './components/NumberCircle';
import { numbers } from './data';

function App() {
	const [state, setState] = useState({
		currentPlayer1: true,
		p1Squares: [3, 6, 18, 42, 63, 16],
        p2Squares: [2, 20, 35, 72, 81, 64],
		num1: 2,
		num2: 8,
		selected: null,
		selectedRow: null,
        selectedMultiplier: null,
		selectedRow2: null,
		selectedMultiplier2: null,
	})

	const getAvailableSqaures = () => {
        const taken = [...state.p1Squares, ...state.p2Squares];
        let result = [...numbers];

        taken.forEach(num => {
            const index = result.findIndex(resultNum => resultNum === num);
            result.splice(index, 1);
        })

        return result;
    }

    const getMultipliers = number => {
        const available = getAvailableSqaures();
        return available.map(num => num/number).filter(num => Number.isInteger(num) && num < 10);
    }

	const num1Multipliers = getMultipliers(state.num1);
	const num2Multipliers = getMultipliers(state.num2);

	const getOptionSquares = () => {
		const num1Options = num1Multipliers.map(num => num * state.num1);
		const num2Options = num2Multipliers.map(num => num * state.num2);
		const result = [...num1Options, ...num2Options];
		return [...new Set(result)];
	}

	const options = getOptionSquares();

	const selectSquare = squareNum => {
		const multiplier1 = squareNum/state.num1;
		const multiplier2 = squareNum/state.num2;

		if (Number.isInteger(multiplier1) && Number.isInteger(multiplier2)) {
			setState({
				...state, 
				selected: squareNum, 
				selectedRow: state.num1, 
				selectedMultiplier: multiplier1, 
				selectedRow2: state.num2, 
				selectedMultiplier2: multiplier2,
			});
		}
		else if (Number.isInteger(multiplier1)) {
			setState({
				...state, 
				selected: squareNum, 
				selectedRow: state.num1, 
				selectedMultiplier: multiplier1, 
				selectedRow2: null, 
				selectedMultiplier2: null,
			});
		}
		else {
			setState({
				...state, 
				selected: squareNum, 
				selectedRow: state.num2, 
				selectedMultiplier: multiplier2, 
				selectedRow2: null, 
				selectedMultiplier2: null});
		}
	}

	const confirm = () => {
		const playerArray = state.currentPlayer1 ? 'p1Squares' : 'p2Squares';
		const newList = state[playerArray];
		newList.push(state.selected);

		const persistingNumState = Object.entries(state).find(entry => entry[1] === state.selectedRow)[0];
		const newNumState = persistingNumState === 'num1' ? 'num2' : 'num1';

		setState({
			...state,
			[playerArray]: newList,
			[newNumState]: state.selectedMultiplier,
			selected: null,
			selectedRow: null,
			selectedMultiplier: null,
			currentPlayer1: !state.currentPlayer1,
		})
	}

	const bothRows = !!state.selectedMultiplier && !!state.selectedMultiplier2;
  	 
	return (
		<div className="app">
			<div className="app-inner">
				<Header />
				<Grid appState={state} setAppState={setState} options={options} selectSquare={selectSquare}/>
				<div className="bottom">
					<NumberSelection appState={state} setAppState={setState} num1Multipliers={num1Multipliers} num2Multipliers={num2Multipliers}/>
					{bothRows 
						? <button className="confirm disabled" type="button" disabled={true}>
							<p>Select</p>
							<div className="confirm-select-circle">{state.selectedMultiplier}</div> 
							<p>or</p>
							<div className="confirm-select-circle">{state.selectedMultiplier2}</div>
						</button>
						: <button className="confirm" type="button" disabled={!state.selected} onClick={confirm}>{!!state.selected ? 'Confirm' : 'Select a number'}</button>
					}
				</div>
			</div>
		</div>
  	);
}

export default App;
