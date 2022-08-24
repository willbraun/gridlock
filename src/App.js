import { useState, useEffect } from 'react';
import Header from './components/Header';
import Grid from './components/Grid';
import './App.css';
import './styles/header.css';
import FirstNumberSelection from './components/FirstNumberSelection';
import NumberSelection from './components/NumberSelection';
import GameOver from './components/GameOver';
import { numbers, digits, pointValues, getAllQuads } from './data';

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

	const isSingleDigitInt = num => {
		return Number.isInteger(num) && num < 10;
	}

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
        return available.map(num => num/number).filter(num => isSingleDigitInt(num));
    }

	const num1Multipliers = getMultipliers(state.num1);
	const num2Multipliers = getMultipliers(state.num2);
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

	const confirm = (num, mult) => {
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

			setState({
				...state,
				[playerArray]: newList,
				[persistingNumState]: num,
				[newNumState]: mult,
				selected: null,
				selectedRow: null,
				selectedMultiplier: null,
				currentPlayer1: !state.currentPlayer1,
			})
		}
	}

	const getComputerChoices = () => {
		const choices1 = num1Multipliers.map(mult => Object.fromEntries([['num', state.num1], ['mult', mult]]));
		const choices2 = num2Multipliers.map(mult => Object.fromEntries([['num', state.num2], ['mult', mult]]));
		return [...choices1, ...choices2];
	}

	const computerRandomPlay = () => {
		const choices = getComputerChoices();
		const {num, mult} = choices[Math.floor(Math.random() * choices.length)];
		setTimeout(() => confirm(num, mult), 2000);
	}

	const randomDigit = () => {
		return digits[Math.floor(Math.random() * 9)];
	}

	const computerRandomFirstPlay = () => {
		setTimeout(() => confirm(randomDigit(), randomDigit()), 2000);
	}

	const countColors = (quad, playerSquares) => {
		return quad.filter(x => playerSquares.includes(x)).length;
	}

	const evaluateQuad = (quad, humanSquares, compSquares) => {
		const humanCount = countColors(quad, humanSquares);
		const compCount = countColors(quad, compSquares);
		if (humanCount === 0) {
			return pointValues[compCount];
		}
		else if (compCount === 0) {
			return -pointValues[humanCount];
		}
		else {
			return 0;
		}
	}

	const evaluateBoard = (humanSquares, compSquares) => {
		return winningQuads.map(quad => evaluateQuad(quad, humanSquares, compSquares)).reduce((a, b) => a + b, 0);
	}

	const computerMinimaxPlay = () => {
		console.log('minimax choice');
	}

	useEffect(() => {
		if (isComputerPlayer && state.winningQuad.length === 0) {
			const p1Start = getRandomBool();
			setState({...startGame, currentPlayer1: p1Start, isComputerRed: !p1Start})
			if (!p1Start) {
				computerRandomFirstPlay();
			}
		}
		else {
			setState({...startGame, currentPlayer1: true, isComputerRed: false})
		}
	}, [state.settings.gridLayout, state.settings.playAgainst]);

	useEffect(() => {
		if (!isFirstTurn && !state.currentPlayer1) {
			if (state.settings.playAgainst === 1) {
				computerRandomPlay();
			}
			else if (state.settings.playAgainst === 2) {
				computerMinimaxPlay();
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
						startGame={startGame}
						isWin={isWin}
						isDraw={isDraw}
						p1Color={p1Color}
						p2Color={p2Color}
						isComputerPlayer={isComputerPlayer}
						/>
					: 	gameBottom	
				}
			</div>
		</div>
  	);
}

export default App;
