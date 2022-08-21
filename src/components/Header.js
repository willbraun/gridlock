import { useState } from 'react';
import Settings from './Settings';
import gear from './../images/gear-solid.svg';
import { settingsMap } from './../data';

const Header = ({appState, setAppState}) => {
    const [show, setShow] = useState(false);
    
    return (
        <>
            <div className="header">
                <h1>Gridlock</h1>
                <p className={`vs-icon${appState.settings.playAgainst > 0 ? ' computer-player' : ''}`}>{`vs: ${settingsMap.playAgainst[appState.settings.playAgainst].emoji}`}</p>
                <button className="gear-icon" onClick={() => setShow(true)}>
                    <img src={gear} alt="gear icon" />
                </button>
            </div>
            <div>
                
            </div>
            <Settings 
                show={show} 
                setShow={setShow}
                appState={appState} 
				setAppState={setAppState}
            />
        </>
    )
}

export default Header;