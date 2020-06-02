import React from 'react';
import { Modal } from 'react-bootstrap';
import { useStore } from 'store';

const Alert = () => {
    const { state, dispatch } = useStore();

    return (
        <>
            {/* Set modal animation to false to avoid DOMnode error */}
            <Modal show={state.alert.show} animation={false}>
                <Modal.Header>
                    <Modal.Title>The Following Error(s) Occured</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {state.alert.msgs.map((msg, index) => <p key={index} className="invalid text-heavy text-center">{msg}</p>)}
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn btn-primary"
                        variant="secondary"
                        onClick={() => dispatch({ type: "closeAlert" })}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Alert
