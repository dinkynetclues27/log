import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Start = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState([]);
  const [logs, setLogs] = useState({});
  const [showLogs, setShowLogs] = useState(false);
  const [success, setSuccess] = useState([]);
  const [fail, setFail] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);

  const fetch = async () => {
    try {
      const response = await axios.get("http://localhost:4000/getvendor");
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const fetchSuccess = async () => {
    try {
      const response = await axios.get("http://localhost:4000/filesuccess");
      setSuccess(response.data);
      setShowSuccess(true);
      setShowFail(false);
      setShowLogs(false);
    } catch (error) {
      console.error('Error fetching success data:', error);
    }
  };

  const fetchFail = async () => {
    try {
      const response = await axios.get("http://localhost:4000/filefail");
      setFail(response.data);
      setShowSuccess(false);
      setShowFail(true);
      setShowLogs(false);
    } catch (error) {
      console.error('Error fetching fail data:', error);
    }
  };

  const handleChange = (event) => {
    const vendor = event.target.value;
    if (vendor && !selectedVendor.includes(vendor)) {
      setSelectedVendor([...selectedVendor, vendor]);
    }
  };

  const onCurrentClick = async () => {
    setShowLogs(true);
    setShowSuccess(false);
    setShowFail(false);
  };

  const handleSelect = async (vendor) => {
    if (!vendor) {
      console.log("Please select a vendor");
      return;
    }

    try {
      if (!logs[vendor]) {
        setLogs({ ...logs, [vendor]: [] });
      } 
      //it is sending parallely data to both vendor through one sse message so sse sending message from one vendor than another vendor so it is fetching in both vendors that's why it is showing like these
      const eventSource = new EventSource('http://localhost:4000/events');

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Received SSE:', data);
        setLogs((prevLogs) => ({
          ...prevLogs,
          [vendor]: [...prevLogs[vendor], data], 
        }));
        console.log(vendor,data)
      };

      eventSource.onerror = (error) => {
        console.error('SSE error:', error);
      };
    
      await axios.post("http://localhost:4000/insertpro", { vendor });
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
        return '#ADD8E6';
      case 'skip':
        return 'pink';
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
              <button className="btnn" style={{ border: '1px solid #37f713' }} onClick={fetchSuccess}>Success</button>
              <button className="btnn" style={{ border: '1px solid #37f713' }} onClick={fetchFail}>Fail</button>
              <button className="btnn" style={{ border: '1px solid #37f713' }} onClick={onCurrentClick}>Current</button>
            </div>
          </div>
          {showSuccess && (
            <div style={{ backgroundColor: "#90EE90" }}>
              <h3>Success data</h3>
              <ul>
                {success.map((successs, index) => (
                  <li key={index}>{successs.vendor_name} successful on {successs.created_at}</li>
                ))}
              </ul>
            </div>
          )}
          {showFail && (
            <div style={{ backgroundColor: '#FF7F7F' }}>
              <h3>Fail data</h3>
              <ul>
                {fail.map((fails, index) => (
                  <li key={index}>{fails.vendor_name} failed on {fails.created_at}</li>
                ))}
              </ul>
            </div>
          )}
          {showLogs && (
            <div className="logs" style={{ backgroundColor: 'black' }}>
              <h3 style={{ color: 'white' }}>Product Logs:</h3>
              {selectedVendor.map((vendor, index) => (
                <div key={index}>
                  <h6 style={{ color: 'white' }}>{vendor}
                    <button onClick={() => handleSelect(vendor)}>View</button>
                  </h6>
                  <ul>
                    {logs[vendor] && logs[vendor].map((log, logIndex) => (
                      <li key={logIndex} style={{ color: getColor(log.type) }}>{log.message}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Start;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Start = () => {
//   const [vendors, setVendors] = useState([]);
//   const [selectedVendors, setSelectedVendors] = useState([]);
//   const [logs, setLogs] = useState({});
//   const [showLogs, setShowLogs] = useState(false);
//   const [success, setSuccess] = useState([]);
//   const [fail, setFail] = useState([]);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [showFail, setShowFail] = useState(false);

//   const fetch = async () => {
//     try {
//       const response = await axios.get("http://localhost:4000/getvendor");
//       setVendors(response.data);
//     } catch (error) {
//       console.error('Error fetching vendors:', error);
//     }
//   };

//   useEffect(() => {
//     fetch();
//   }, []);

//   const fetchSuccess = async () => {
//     try {
//       const response = await axios.get("http://localhost:4000/filesuccess");
//       setSuccess(response.data);
//       setShowSuccess(true);
//       setShowFail(false);
//       setShowLogs(false);
//     } catch (error) {
//       console.error('Error fetching success data:', error);
//     }
//   };

//   const fetchFail = async () => {
//     try {
//       const response = await axios.get("http://localhost:4000/filefail");
//       setFail(response.data);
//       setShowSuccess(false);
//       setShowFail(true);
//       setShowLogs(false);
//     } catch (error) {
//       console.error('Error fetching fail data:', error);
//     }
//   };

//   const handleChange = (event) => {
//     const vendor = event.target.value;
//     if (vendor && !selectedVendors.includes(vendor)) {
//       setSelectedVendors([...selectedVendors, vendor]);
//     }
//   };

//   const handleCurrentClick = () => {
//     setShowLogs(true);
//     setShowSuccess(false);
//     setShowFail(false);
//   };

//   const handleSelect = async (vendor) => {
//     if (!vendor) {
//       console.log("Please select a vendor");
//       return;
//     }

//     try {
//       setLogs(prevLogs => ({ ...prevLogs, [vendor]: [] }));

//       const eventSource = new EventSource('http://localhost:4000/events');

//       eventSource.onmessage = (event) => {
//         const data = JSON.parse(event.data);
//         console.log('Received SSE:', data);
//         setLogs(prevLogs => ({
//           ...prevLogs,
//           [vendor]: [...(prevLogs[vendor] || []), data]
//         }));
//       };

//       eventSource.onerror = (error) => {
//         console.error('SSE error:', error);
//       };

//       await axios.post("http://localhost:4000/insertpro", { vendor });
//       console.log(`Products processing started for ${vendor}`);
//     } catch (error) {
//       console.error(`Error inserting products for ${vendor}:`, error);
//     }
//   };

//   const getColor = (type) => {
//     switch (type) {
//       case 'insert':
//         return 'green';
//       case 'update':
//         return '#ADD8E6';
//       case 'skip':
//         return 'pink';
//       default:
//         return 'black';
//     }
//   };

//   return (
//     <div className="container start-container">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card">
//             <div className="form-group">
//               <label htmlFor="vendor">Select Vendor:</label>
//               <div className="select-wrapper">
//                 <select className="form-control" onChange={handleChange}>
//                   <option value="">Select a vendor</option>
//                   {vendors.map((vendor, index) => (
//                     <option key={index} value={vendor}>{vendor}</option>
//                   ))}
//                 </select>
//                 <span className="select-icon">&#9662;</span>
//               </div>
//             </div>
//             <div className="text-center">
//               <button className="btnn" style={{ border: '1px solid #37f713' }} onClick={fetchSuccess}>Success</button>
//               <button className="btnn" style={{ border: '1px solid #37f713' }} onClick={fetchFail}>Fail</button>
//               <button className="btnn" style={{ border: '1px solid #37f713' }} onClick={handleCurrentClick}>Current</button>
//             </div>
//           </div>
//           {showSuccess && (
//             <div style={{ backgroundColor: "#90EE90" }}>
//               <h3>Success data</h3>
//               <ul>
//                 {success.map((successItem, index) => (
//                   <li key={index}>{successItem.vendor_name} successful on {successItem.created_at}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//           {showFail && (
//             <div style={{ backgroundColor: '#FF7F7F' }}>
//               <h3>Fail data</h3>
//               <ul>
//                 {fail.map((failItem, index) => (
//                   <li key={index}>{failItem.vendor_name} failed on {failItem.created_at}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//           {showLogs && (
//             <div className="logs" style={{ backgroundColor: 'black' }}>
//               <h3 style={{ color: 'white' }}>Product Logs:</h3>
//               {selectedVendors.map((vendor, index) => (
//                 <div key={index} style={{ marginBottom: '20px' }}>
//                   <h6 style={{ color: 'white' }}>{vendor}
//                     <button onClick={() => handleSelect(vendor)}>View</button>
//                   </h6>
//                   <ul>
//                     {logs[vendor] && logs[vendor].map((log, logIndex) => (
//                       <li key={logIndex} style={{ color: getColor(log.type) }}>{log.message}</li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Start;
