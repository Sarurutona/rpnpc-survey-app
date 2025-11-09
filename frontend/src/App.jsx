import React, { useState } from 'react';
import './App.css';

// Placeholder components (create real ones in components/ as needed)
// import PartA from './components/PartA';
// import PartB from './components/PartB';

function App() {
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('Submitting...');

  // IMPORTANT: Use Vite env var VITE_API_URL for deployed backend; fallback to localhost for local testing
  // To set the live URL in production, define VITE_API_URL in your deployment environment (e.g. Render or GH Actions build step)
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/submit'; // For local testing

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setStatus(`Submission successful! Your reference ID is: ${result.id}`);
        // Optionally clear the form
        // setFormData({}); 
      } else {
        setStatus(`Submission failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('An error occurred. Please try again.');
    }
  };
  
  // A helper function to update our single state object
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="App">
      <h1>RPNGC Corporate Plan Survey</h1>
      <form onSubmit={handleSubmit}>
        {/* Example for Part A */}
        <h2>PART A: Professional and Bio Details</h2>
        <div>
          <label>Program / Activity Area</label>
          <input type="text" name="programArea" onChange={handleChange} />
        </div>
        <div>
          <label>Rank</label>
          <input type="text" name="rank" onChange={handleChange} />
        </div>
        {/* ... add all other fields from the form here ... */}
        {/* You would import and use your components like this: */}
        {/* <PartA formData={formData} handleChange={handleChange} /> */}
        {/* <PartB formData={formData} handleChange={handleChange} /> */}
        
        <hr/>
        <button type="submit">Submit Survey</button>
      </form>
      {status && <p className="status-message">{status}</p>}
    </div>
  );
}

export default App;
