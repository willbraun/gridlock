import { useState } from 'react';
import Header from './components/Header';
import Grid from './components/Grid';
import './App.css';
import NumberSelection from './components/NumberSelection';
import { numbers } from './data';

function App() {
	const [state, setState] = useState({
		currentPlayer1: true,
		p1Squares: [1, 7, 49, 63],
        p2Squares: [3, 4, 24, 48],
		num1: 7,
		num2: 3,
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
  	 
	return (
		<div className="App">
			<Header />
			<Grid appState={state} setAppState={setState} options={options}/>
			<NumberSelection appState={state} setAppState={setState} num1Multipliers={num1Multipliers} num2Multipliers={num2Multipliers}/>
			<button className="confirm" type="button">Confirm</button>
		</div>
  	);
}

export default App;
