import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Start = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState('');
  const [logs, setLogs] = useState([]);
  const [showLogs, setShowLogs] = useState(false);

  const fetchVendors = async () => {
    try {
      const response = await axios.get("http://localhost:4000/getvendor");
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleChange = (event) => {
    setSelectedVendor(event.target.value);
  };

  const handleSelect = async () => {
    if (!selectedVendor) {
      console.log("Please select a vendor");
      return;
    }

    try {
      setLogs([]);
      setShowLogs(true);

      const eventSource = new EventSource('http://localhost:4000/events');

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Received SSE:', data);
        setLogs(prevLogs => [...prevLogs, data]);
      };

      eventSource.onerror = (error) => {
        console.error('SSE error:', error);
      };

      await axios.post("http://localhost:4000/insertpro", { vendor: selectedVendor });
      console.log("Products processing started");
    } catch (error) {
      console.error('Error inserting products:', error);
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'insert':
        return 'green';
      case 'update':
        return 'blue';
      case 'skip':
        return 'yellow';
      default:
        return 'black';
    }
  };

  return (
    <div className="container start-container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="form-group">
              <label htmlFor="vendor">Select Vendor:</label>
              <div className="select-wrapper">
                <select className="form-control" onChange={handleChange}>
                  {vendors.map((vendor, index) => (
                    <option key={index} value={vendor}>{vendor}</option>
                  ))}
                </select>
                <span className="select-icon">&#9662;</span>
              </div>
            </div>
            <div className="text-center">
              <button className="btnn" style={{ border: '1px solid #37f713' }} onClick={handleSelect}>Select</button>
            </div>
          </div>
          {showLogs && (
            <div className="logs">
              <h3>Product Insertion Logs:</h3>
              <ul>
                {logs.map((log, index) => (
                  <li key={index} style={{ color: getColor(log.type) }}>{log.message}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Start;
