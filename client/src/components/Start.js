import React,{useState,useEffect} from 'react'
import axios from 'axios'
import socketIO from 'socket.io-client';

const Start = () => {
const [vendors,setvendor] = useState([]);
const [selectedVendor, setSelectedVendor] = useState('');
const [log, setLog] = useState([]);


useEffect(() => {
  const socket = socketIO.connect('http://localhost:4000');

  socket.on('connect', () => {
    console.log('Socket connected successfully');
  });

  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  socket.on('insert', (data) => {
    console.log("Received data from socket:", data); 
    setLog(prevLog => [...prevLog, data]);
  });
  
  console.log("Socket connecting...");

  return () => {
    if(socket){
      socket.disconnect();
    }
  };
}, []);


    const fetch = async () =>{
      try {
        const response = await axios.get("http://localhost:4000/getvendor");
        // console.log(response)
        setvendor(response.data)
        // console.log(response.data)
      }
      catch (error) {
        console.log(error);
      }
    }
    useEffect (() =>{
      fetch();
    },[])
  


    const handlechange = (event) =>{
      setSelectedVendor(event.target.value)
    }

    const select = async () => {
      try {
        await axios.post("http://localhost:4000/insertpro", { vendor: selectedVendor });
        console.log("Products inserted successfully");
      } catch (error) {
        console.log(error);
      }
    }

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
         
        </div>
      </div>
      <div>
  {log.map((logg, index) => (
    <div key={index}>{logg}</div>
  ))}
</div>
    </div>
  )
}

export default Start;
