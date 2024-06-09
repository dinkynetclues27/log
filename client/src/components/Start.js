import React,{useState,useEffect} from 'react'
import axios from 'axios'


const Start = () => {
const [vendors,setvendor] = useState([]);
const [selectedVendor, setSelectedVendor] = useState('');
const [logs, setLogs] = useState([]);
const [showLogs, setShowLogs] = useState(false);




    const fetch = async () =>{
      try {
        const response = await axios.get("http://localhost:4000/getvendor");
        // console.log(response.data); // Add this line to check the fetched vendors
        setvendor(response.data)
        // console.log(response.data)
      }
      catch (error) {
        // console.log(error);
      }
    }

    fetch()


    const handlechange = (event) => {
      setSelectedVendor(event.target.value);
    };
    

    const select = async () => {
      if (!selectedVendor) {
        console.log("Please select a vendor");
        return;
      }
    
      try {
        setLogs([]); // Clear previous logs
        setShowLogs(true); // Show logs section
  
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
        console.log(selectedVendor)
        console.log("Products inserted successfully");
      } catch (error) {
        console.log(error);
      }
    }

    // useEffect(() => {
      
    //   return () => {
    //     eventSource.close();
    //   };
    // }, []);

  return (
    <div className="container start-container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="form-group">
              <label htmlFor="">Select Vendor:</label>
              <div className="select-wrapper">
              <select className="form-control" onChange={handlechange}>

                  {/* {console.log(vendors)} */}
                {vendors.map((vendor,index) => (
                    <option key={index}value={vendor}>{vendor}</option>
                  ))} 
                </select>
                <span className="select-icon">&#9662;</span>
              </div>
            </div>
            <div className="text-center">
              <button className="btnn" style={{ border: '1px solid #37f713' }} onClick={select}>Select</button>

            
            </div>
          
          </div>
          {showLogs && (
            <div className="logs">
              <h3>Product Insertion Logs:</h3>
              <ul>
                {logs.map((log, index) => (
                  <li key={index}>{log.message}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default Start;
