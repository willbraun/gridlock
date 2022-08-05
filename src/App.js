import { useState } from 'react';
import Header from './components/Header';
import Grid from './components/Grid';
import './App.css';
import NumberSelection from './components/NumberSelection';

function App() {
	const [state, setState] = useState({
		currentPlayer1: true,
		p1squares: [1, 7, 49, 63],
        p2squares: [],
		num1: 7,
		num2: 3,
	})
  	 
	return (
		<div className="App">
			<Header />
			<h2>Turn: {state.currentPlayer1 ? 'Player 1' : 'Player 2'}</h2>
			<Grid appState={state} setAppState={setState}/>
			<NumberSelection appState={state} setAppState={setState}/>
			<button type="button">Confirm</button>
		</div>
  	);
}

export default App;
