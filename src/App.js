import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LoadingSpinner from './components/LoadingSpinner';
import InteractivePlot from './components/InteractivePlot';
import Help from './components/Help';
import { Button, Container, Form, Alert } from 'react-bootstrap';

function App() {
    const [file, setFile] = useState(null);
    const [actualTimestamps, setActualTimestamps] = useState([]);
    const [actualValues, setActualValues] = useState([]);
    const [futureTimestamps, setFutureTimestamps] = useState([]);
    const [predictions, setPredictions] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type !== 'text/csv') {
            setError('Invalid file type. Please upload a CSV file.');
            setFile(null);
        } else {
            setFile(selectedFile);
            setError(null);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            setError('Please select a file to upload.');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/predict_week`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLoading(false);
            if (response.data.error) {
                setError(response.data.error);
            } else {
                setActualTimestamps(response.data.timestamps);
                setActualValues(response.data.actual_values);
                setFutureTimestamps(response.data.future_timestamps);
                setPredictions(response.data.predictions);
                setError(null);
            }
        } catch (error) {
            setLoading(false);
            setError('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <Container className="App">
            <header className="my-4">
                <h1>Energy Production Forecast From PV machines</h1>
            </header>
            <Form onSubmit={handleSubmit} className="mb-4 form-inline">
                <Form.Group>
                    <Form.Label className="mr-2">Upload CSV File:</Form.Label>
                    <Form.Control className="custom-file-input mr-2" type="file" accept=".csv" onChange={handleFileChange} />
                    <Button type="submit" variant="primary" className="mr-2">Predict</Button>
                    <Button variant="secondary" onClick={() => setShowHelp(true)}>Help</Button>
                </Form.Group>
            </Form>
            {loading && <LoadingSpinner />}
            {error && <Alert variant="danger">{error}</Alert>}
            {futureTimestamps.length > 0 && predictions.length > 0 && (
                <div className="plot-container my-4">
                    <InteractivePlot
                        actualTimestamps={actualTimestamps}
                        actualValues={actualValues}
                        futureTimestamps={futureTimestamps}
                        predictions={predictions}
                    />
                </div>
            )}
            <Help show={showHelp} handleClose={() => setShowHelp(false)} />
        </Container>
    );
}

export default App;
