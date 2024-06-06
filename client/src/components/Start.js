import React,{useState} from 'react'
import axios from 'axios'
import io from "socket.io-client";

const Start = () => {
const [vendors,setvendor] = useState([]);

    const fetch = async () =>{
      try {
        const response = await axios.get("http://localhost:4000/getvendor");
        console.log(response)
        setvendor(response.data)
        console.log(response.data)
      }
      catch (error) {
        console.log(error);
      }
    }
    fetch();
    
  return (
    <div className="container start-container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="form-group">
              <label htmlFor="">Select Vendor:</label>
              <div className="select-wrapper">
                <select className="form-control">

                  {console.log(vendors)}
                {vendors.map((vendor) => (
                    <option value={vendor}>{vendor}</option>
                  ))} 
                </select>
                <span className="select-icon">&#9662;</span>
              </div>
            </div>
            <div className="text-center">
              <button className="btnn" style={{ border: '1px solid #37f713' }}>Select</button>

            
            </div>
          
          </div>
          <div>
              <table style={{border:"1px solid black"}} >

                <tr >
                    <td style={{height:"200",width:"200",padding:"500"}}>
                      hi
                    </td>
                    
                </tr>
              </table>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Start;
