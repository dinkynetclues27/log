import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VendorSelection = ({ onVendorSelect }) => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get("http://localhost:4000/getvendor");
        setVendors(response.data);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    };
    fetchVendors();
  }, []);

  const handleChange = (event) => {
    const vendor = event.target.value;
    if (vendor) {
      onVendorSelect(vendor);
    }
  };

  return (
    <div className="form-group">
      <label htmlFor="vendor">Select Vendor:</label>
      <div className="select-wrapper">
        <select className="form-control" onChange={handleChange}>
          <option value="">Select a vendor</option>
          {vendors.map((vendor, index) => (
            <option key={index} value={vendor}>{vendor}</option>
          ))}
        </select>
        <span className="select-icon">&#9662;</span>
      </div>
    </div>
  );
};

export default VendorSelection;
