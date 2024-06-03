import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const Help = ({ show, handleClose }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Help</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>To use the energy production prediction tool:</p>
      <ol>
        <li>Upload a CSV file with ONLY the required columns.</li>
        <li>Click the "Predict" button.</li>
        <li>View the prediction plots below.</li>
      </ol>
      <p>The CSV file should contain the following columns: timestamp, kwh, temperature_2m, relative_humidity_2m, weather_code, shortwave_radiation, is_day, wind_direction.</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

export default Help;
