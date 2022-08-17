import { useState } from 'react';
import Settings from './Settings';
import gear from './../images/gear-solid.svg';

const Header = ({appState, setAppState}) => {
    const [show, setShow] = useState(false);
    
    return (
        <>
            <div className="header">
                <h1>Gridlock</h1>
                <button className="gear-icon" onClick={() => setShow(true)}>
                    <img src={gear} alt="gear icon" />
                </button>
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