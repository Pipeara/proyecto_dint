import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useRef } from 'react';
import { ENDPOINT } from '../config/constans';

const ContractModal = ({ show, handleClose }) => {
  const fileInput = useRef(null);

  const handleFileUpload = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', fileInput.current.files[0]);

    axios.post(ENDPOINT.upload, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
      },
    })
    .then(response => {
      console.log(response);
      // Aquí puedes manejar la respuesta del servidor
    })
    .catch(error => {
      console.error('Error uploading file:', error);
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Mis Contratos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFileUpload}>
          <Form.Group>
            <Form.Label>Subir Contrato</Form.Label>
            <Form.Control type="file" ref={fileInput} />
          </Form.Group>
          <Button variant="primary" type="submit">Subir</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ContractModal;