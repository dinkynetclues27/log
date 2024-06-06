import React from 'react'

const Start = () =>{
    return(
        <div className="container start-container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              {/* <h1 className="card-title text-center"><u id='underline'>Quiz</u></h1> */}
              <div className="form-group">
                <label htmlFor="">Select Vendor:</label>
                <div className="select-wrapper">
                  <select id="numque" className="form-control">
                    <option value="5">-select vendor</option>
                  </select>
                  <span className="select-icon">&#9662;</span>
                </div>
              </div>
              <div className="text-center">
                <button className="btnn"style={{border:'1px solid #37f713'}}>Select</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Start;