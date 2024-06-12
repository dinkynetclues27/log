import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LogDisplay = ({ vendor, getColor }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(`http://localhost:4000/events?vendor=${vendor}`);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLogs((prevLogs) => [...prevLogs, data]);
    };

    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
    };

    return () => {
      eventSource.close();
    };
  }, [vendor]);

  return (
    <div className="logs" style={{ backgroundColor: 'black' }}>
      <h3 style={{ color: 'white' }}>Product Logs for {vendor}:</h3>
      <ul>
        {logs.map((log, index) => (
          <li key={index} style={{ color: getColor(log.type) }}>{log.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default LogDisplay;
