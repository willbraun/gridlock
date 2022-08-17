import Modal from 'react-bootstrap/Modal';

const Settings = ({show, setShow}) => {
    const hide = () => setShow(false);
    
    return (
        <Modal show={show} onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <button onClick={hide}>
                    Close
                </button>
                <button onClick={hide}>
                    Save Changes
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default Settings;