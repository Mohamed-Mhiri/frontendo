import React from 'react';
import Plot from 'react-plotly.js';

const InteractivePlot = ({ actualTimestamps, actualValues, futureTimestamps, predictions }) => {
  const pastAndPredictedData = [
    {
      x: actualTimestamps,
      y: actualValues,
      type: 'scatter',
      mode: 'lines',
      name: 'Past Values',
      line: { color: 'green' }
    },
    {
      x: futureTimestamps,
      y: predictions,
      type: 'scatter',
      mode: 'lines',
      name: 'Predicted Values',
      line: { color: 'red' }
    }
  ];

  const futurePredictionData = [
    {
      x: futureTimestamps,
      y: predictions,
      type: 'scatter',
      mode: 'lines',
      name: 'Predicted Values',
      line: { color: 'red' }
    }
  ];

  const pastAndPredictedLayout = {
    xaxis: {
      title: 'Timestamp',
      tickformat: '%Y-%m-%d',
      tickangle: 45,
      nticks: 10,
      automargin: true,
    },
    yaxis: { title: 'kWh' },
    margin: { t: 50, b: 100, l: 50, r: 150 },  // Increase right margin for legend
    hovermode: 'closest',
    width: 1000,  // Set the width
    height: 500   // Set the height
  };

  const futurePredictionLayout = {
    xaxis: {
      title: 'Timestamp',
      tickformat: '%Y-%m-%d',
      tickangle: 45,
      nticks: 10,
      automargin: true,
    },
    yaxis: { title: 'kWh' },
    margin: { t: 50, b: 100, l: 50, r: 50 },
    hovermode: 'closest',
    width: 1000,  // Set the width
    height: 500   // Set the height
  };

  return (
    <div className="plot-container">
      <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '20px' }}> {/* Adjust margins here */}
        <h2 className="title-primary">Past and predicted energy</h2>
        <Plot data={pastAndPredictedData} layout={pastAndPredictedLayout} config={{ responsive: true }} />
      </div>
      <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '20px' }}> {/* Adjust margins here */}
        <h2 className="title-primary"> The Energy predicted to be produced</h2>
        <Plot data={futurePredictionData} layout={futurePredictionLayout} config={{ responsive: true }} />
      </div>
    </div>
  );
};

export default InteractivePlot;
