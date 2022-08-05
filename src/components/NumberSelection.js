import NumberRow from "./NumberRow";
import { numbers } from './../data';

const NumberSelection = ({appState, setAppState}) => {

    const getAvailableSqaures = () => {
        const taken = [...appState.p1squares, ...appState.p2squares];
        let result = [...numbers];

        taken.forEach(num => {
            const index = result.findIndex(resultNum => resultNum === num);
            result.splice(index, 1);
        })

        return result;
    }

    const getMultipliers = number => {
        const available = getAvailableSqaures();
        return available.map(a => a/number).filter(x => Number.isInteger(x) && x < 10);
    }
    
    return (
        <div>
            <NumberRow number={appState.num1} multipliers={getMultipliers(appState.num1)}/>
            <p>or</p>
            <NumberRow number={appState.num2} multipliers={getMultipliers(appState.num2)}/>
        </div>
    )
}

export default NumberSelection;