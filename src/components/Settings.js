import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './../styles/settings.css';

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
                <div className="setting-row mode-selection">
                    <p>Grid Layout</p>
                    <DropdownButton 
                        variant="primary" 
                        id="dropdown-basic-button" 
                        title={settings.mode === 0 ? 'Classic' : 'Random'}>
                        <Dropdown.Item as="button" onClick={() => setSettings({...settings, mode: 0})}>Classic</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => setSettings({...settings, mode: 1})}>Random</Dropdown.Item>
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