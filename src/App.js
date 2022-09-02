import { useState, useEffect } from 'react';
import Header from './components/Header';
import Grid from './components/Grid';
import './App.css';
import './styles/header.css';
import FirstNumberSelection from './components/FirstNumberSelection';
import NumberSelection from './components/NumberSelection';
import GameOver from './components/GameOver';
import { numbers } from './data';
import { isSingleDigitInt, getMultipliers, getComputerChoices, getAllQuads, randomDigit } from './helpers';


function App() {
	const savedSettings = JSON.parse(window.localStorage.getItem('gridlockSettings'));
	const blankSettings = {
		playAgainst: 0,
        gridLayout: 0,
    }

	const settings = savedSettings ?? blankSettings;

	const shuffle = array => {
		const newArray = [...array];
		newArray.sort(() => Math.random() - 0.5);
		return newArray;
	}

	const getBoard = () => {
		return settings.gridLayout === 0 ? numbers : shuffle(numbers);
	}

	const getRandomBool = () => {
		return Math.random() > 0.5;
	}
	
	const startGame = {
		currentPlayer1: null,
		isComputerRed: null,
		gridLayoutArray: getBoard(),
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
		settings: settings,
		depth: 6,
	}
	
	const [state, setState] = useState(startGame);

	const isFirstTurn = state.p1Squares.length === 0 && state.p2Squares.length === 0;
	const isBothRows = !!state.selectedMultiplier && !!state.selectedMultiplier2;
	const isComputerPlayer = state.settings.playAgainst > 0;
	const isComputerTurn = isComputerPlayer && !state.currentPlayer1;
	const isWin = state.winningQuad.length > 0;

	const [p1Color, p2Color] = (
        isComputerPlayer && state.isComputerRed 
            ? ['blue', 'red']
            : ['red', 'blue']
    )

	const num1Multipliers = getMultipliers(state.num1, state.p1Squares, state.p2Squares);
	const num2Multipliers = getMultipliers(state.num2, state.p1Squares, state.p2Squares);
	const isDraw = num1Multipliers.length === 0 && num2Multipliers.length === 0 && !!state.num1;

	const getOptionSquares = () => {
		const num1Options = num1Multipliers.map(num => num * state.num1);
		const num2Options = num2Multipliers.map(num => num * state.num2);
		const result = [...num1Options, ...num2Options];
		return [...new Set(result)];
	}

	const options = getOptionSquares();

	const selectSquare = squareNum => {
		const calc1 = squareNum/state.num1;
		const calc2 = squareNum/state.num2;

		const multiplier1 = isSingleDigitInt(calc1) ? calc1 : null;
		const multiplier2 = isSingleDigitInt(calc2) ? calc2 : null;

		if (!!multiplier1 && !!multiplier2 && multiplier1 !== multiplier2) {
			setState({
				...state, 
				selected: squareNum, 
				selectedRow: state.num1, 
				selectedMultiplier: multiplier1, 
				selectedRow2: state.num2, 
				selectedMultiplier2: multiplier2,
			});
		}
		else if (multiplier1) {
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

	const winningQuads = getAllQuads(state.gridLayoutArray);

	const checkForWin = array => {
		return winningQuads.find(quad => quad.every(num => array.includes(num)));
	}

	const playerArray = state.currentPlayer1 ? 'p1Squares' : 'p2Squares';

	const confirm = (num, mult, nodeId = undefined) => {
		const newList = state[playerArray];
		newList.push(num * mult);

		const winningQuad = checkForWin(newList);

		if (!!winningQuad) {
			setState({
				...state,
				winningQuad: winningQuad, 
			})
			return;
		}
		else {
			const persistingNumState = isFirstTurn 
				? 'num1'
				: Object.entries(state).find(entry => entry[1] === num)[0];
			const newNumState = persistingNumState === 'num1' ? 'num2' : 'num1';

			let newDepth = state.depth;
			if (nodeId < 10000) {
				newDepth = state.depth + 2;
			}
			else if (nodeId < 30000) {
				newDepth = state.depth + 1;
			}

			setState({
				...state,
				[playerArray]: newList,
				[persistingNumState]: num,
				[newNumState]: mult,
				selected: null,
				selectedRow: null,
				selectedMultiplier: null,
				currentPlayer1: !state.currentPlayer1,
				depth: newDepth,
			})
		}
	}

	const computerRandomFirstPlay = () => {
		setTimeout(() => confirm(randomDigit(), randomDigit()), 2000);
	}

	const computerRandomPlay = () => {
		const choices = getComputerChoices(state.num1, state.num2, num1Multipliers, num2Multipliers);
		const {num, mult} = choices[Math.floor(Math.random() * choices.length)];
		setTimeout(() => confirm(num, mult), 2000);
	}

	const worker = new Worker(new URL('./comp-worker.js', import.meta.url));

	const computerMinimaxPlay = (gridLayout, humanSquares, compSquares, num1, num2, depth) => {
		worker.postMessage({humanSquares, compSquares, num1, num2, gridLayout, depth});
		worker.onmessage = message => setTimeout(() => confirm(...message.data), 1000);
	}

	const startNewGame = () => {
		if (isComputerPlayer) {
			const p1Start = getRandomBool();
			setState({...startGame, currentPlayer1: p1Start, isComputerRed: !p1Start})
		}
		else {
			setState({...startGame, currentPlayer1: true, isComputerRed: false})
		}
	}

	useEffect(() => {
		startNewGame();
	}, [state.settings.gridLayout, state.settings.playAgainst]);

	useEffect(() => {
		if (isComputerPlayer && isFirstTurn && state.isComputerRed) {
			if (state.settings.playAgainst === 2) {
				computerMinimaxPlay(state.gridLayoutArray);
			}
			else {
				computerRandomFirstPlay();
			}
		}
	}, [state.isComputerRed, isFirstTurn])

	useEffect(() => {
		if (!isFirstTurn && !state.currentPlayer1) {
			if (state.settings.playAgainst === 1) {
				computerRandomPlay();
			}
			else if (state.settings.playAgainst === 2) {
				computerMinimaxPlay(state.gridLayoutArray, state.p1Squares, state.p2Squares, state.num1, state.num2, state.depth);
			}
		}
	}, [state.currentPlayer1])

	const gameBottom = (
		<div className="bottom">
			{isFirstTurn
				? 	<FirstNumberSelection 
						appState={state} 
						setAppState={setState}
						isComputerTurn={isComputerTurn}
					/>
				:   <NumberSelection 
						appState={state} 
						setAppState={setState} 
						num1Multipliers={num1Multipliers} 
						num2Multipliers={num2Multipliers}
						isComputerTurn={isComputerTurn}
					/>
			}
			{isBothRows 
				? <button className="confirm disabled" type="button" disabled={true}>
					<p>Select</p>
					<div className="confirm-select-circle">{state.selectedMultiplier}</div> 
					<p>or</p>
					<div className="confirm-select-circle">{state.selectedMultiplier2}</div>
				</button>
				: <button className="confirm" type="button" disabled={!state.selected} onClick={() => confirm(state.selectedRow, state.selectedMultiplier)}>{
					!!state.selected 
						? 'Confirm' 
						:  isFirstTurn
							?  'Select numbers'
							:  'Select a number'
					}
				</button>
			}
		</div>
	)
  	 
	return (
		<div className="app">
			<div className="app-inner">
				<Header 
					appState={state} 
					setAppState={setState}
					blankSettings={blankSettings}
					isComputerPlayer={isComputerPlayer}
					isComputerTurn={isComputerTurn}
				/>
				<Grid 
					appState={state} 
					setAppState={setState} 
					options={options} 
					selectSquare={selectSquare}
					p1Color={p1Color}
					p2Color={p2Color}
					isComputerTurn={isComputerTurn}
				/>
				{isWin || isDraw
					? 	<GameOver 
						appState={state} 
						setAppState={setState}
						isWin={isWin}
						isDraw={isDraw}
						p1Color={p1Color}
						p2Color={p2Color}
						isComputerPlayer={isComputerPlayer}
						startNewGame={startNewGame}
						/>
					: 	gameBottom	
				}
			</div>
		</div>
  	);
}

export default App;
