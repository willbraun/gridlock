import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './../styles/settings.css';
import { settingsMap } from '../data';

const Settings = ({show, setShow, appState, setAppState}) => {
    const [settings, setSettings] = useState(appState.settings);

    const exitNoSave = () => {
        setTimeout(() => setSettings(appState.settings), 500);
        setShow(false);
    }

    const saveModal = () => {
        setAppState({...appState, settings: settings});
        window.localStorage.setItem('gridlockSettings', JSON.stringify(settings));
        setShow(false);;
    }
    
    return (
        <Modal 
            show={show} 
            onHide={exitNoSave}
            className="settings"
        >
            <Modal.Header closeButton>
                <Modal.Title>Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="setting-row">
                    <p>Play Against</p>
                    <DropdownButton 
                        variant="primary" 
                        id="dropdown-basic-button" 
                        title={settingsMap.playAgainst[settings.playAgainst]}>
                        <Dropdown.Item as="button" onClick={() => setSettings({...settings, playAgainst: 0})}>{settingsMap.playAgainst[0]}</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => setSettings({...settings, playAgainst: 1})}>{settingsMap.playAgainst[1]}</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => setSettings({...settings, playAgainst: 2})}>{settingsMap.playAgainst[2]}</Dropdown.Item>
                    </DropdownButton>
                </div>
                <div className="setting-row">
                    <p>Grid Layout</p>
                    <DropdownButton 
                        variant="primary" 
                        id="dropdown-basic-button" 
                        title={settingsMap.gridLayout[settings.gridLayout]}>
                        <Dropdown.Item as="button" onClick={() => setSettings({...settings, gridLayout: 0})}>{settingsMap.gridLayout[0]}</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => setSettings({...settings, gridLayout: 1})}>{settingsMap.gridLayout[1]}</Dropdown.Item>
                    </DropdownButton>
                </div>
            </Modal.Body>
            <Modal.Footer className="settings-footer">
                <Button className="close-button" variant="secondary" onClick={exitNoSave}>
                    Close
                </Button>
                <Button className="save-button" variant="success" onClick={saveModal}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Settings;