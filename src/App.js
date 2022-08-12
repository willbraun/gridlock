import { useState } from 'react';
import Header from './components/Header';
import Grid from './components/Grid';
import './App.css';
import './styles/header.css';
import FirstNumberSelection from './components/FirstNumberSelection';
import NumberSelection from './components/NumberSelection';
import { numbers, getAllQuads } from './data';

function App() {
	const [state, setState] = useState({
		currentPlayer1: true,
		p1Squares: [],
        p2Squares: [],
		num1: null,
		num2: null,
		selected: null,
		selectedRow: null,
        selectedMultiplier: null,
		selectedRow2: null,
		selectedMultiplier2: null,
		winningQuad: [],
	})

	const isFirstTurn = !state.num1;
	const isBothRows = !!state.selectedMultiplier && !!state.selectedMultiplier2;
	const gameOver = state.winningQuad.length > 0;

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
				selectedMultiplier2: null
			});
		}
	}

	const checkForWin = array => {
		const winningQuads = getAllQuads(numbers);
		return winningQuads.find(quad => quad.every(num => array.includes(num)));
	}

	const playerArray = state.currentPlayer1 ? 'p1Squares' : 'p2Squares';

	const confirm = () => {
		const newList = state[playerArray];
		newList.push(state.selected);

		const winningQuad = checkForWin(newList);

		if (!!winningQuad) {
			setState({
				...state,
				winningQuad: winningQuad, 
			})
		}
		else {
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
	}

	const firstConfirm = () => {
		setState({
			...state,
			[playerArray]: [state.selected],
			num1: state.selectedRow,
			num2: state.selectedMultiplier,
			selected: null,
			selectedRow: null,
			selectedMultiplier: null,
			currentPlayer1: !state.currentPlayer1,
		})
	}
  	 
	return (
		<div className="app">
			<div className="app-inner">
				<Header />
				<Grid 
					appState={state} 
					setAppState={setState} 
					options={options} 
					selectSquare={selectSquare}
				/>
				<div className="bottom">
					{isFirstTurn
						? 	<FirstNumberSelection 
								appState={state} 
								setAppState={setState}
							/>
						:   <NumberSelection 
								appState={state} 
								setAppState={setState} 
								num1Multipliers={num1Multipliers} 
								num2Multipliers={num2Multipliers}
							/>
					}
					{isBothRows 
						? <button className="confirm disabled" type="button" disabled={true}>
							<p>Select</p>
							<div className="confirm-select-circle">{state.selectedMultiplier}</div> 
							<p>or</p>
							<div className="confirm-select-circle">{state.selectedMultiplier2}</div>
						</button>
						: <button className="confirm" type="button" disabled={!state.selected} onClick={isFirstTurn ? firstConfirm : confirm}>{
							!!state.selected 
								? 'Confirm' 
								:  isFirstTurn
									?  'Select numbers'
									:  'Select a number'
							}
						</button>
					}
				</div>
			</div>
		</div>
  	);
}

export default App;
