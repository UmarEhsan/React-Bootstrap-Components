import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap'


export default function CustomizedDialogs({ title, component }) {
    const [show, setShow] = useState(false);

    return (
      <>
        <Button variant="primary" onClick={() => setShow(true)}>
         Add
        </Button>
  
        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
            {title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {component}
          </Modal.Body>
        </Modal>
      </>
    )
}
