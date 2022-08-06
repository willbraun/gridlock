import { useState } from 'react';
import Header from './components/Header';
import Grid from './components/Grid';
import './App.css';
import NumberSelection from './components/NumberSelection';

function App() {
	const [state, setState] = useState({
		currentPlayer1: true,
		p1Squares: [1, 7, 49, 63],
        p2Squares: [3, 4, 24, 48],
		num1: 7,
		num2: 3,
	})
  	 
	return (
		<div className="App">
			<Header />
			<Grid appState={state} setAppState={setState}/>
			<NumberSelection appState={state} setAppState={setState}/>
			<button className="confirm" type="button">Confirm</button>
		</div>
  	);
}

export default App;
