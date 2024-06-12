import React from 'react';

const SuccessFailDisplay = ({ data, type }) => {
  const getBackgroundColor = () => {
    return type === 'success' ? "#90EE90" : '#FF7F7F';
  };

  return (
    <div style={{ backgroundColor: getBackgroundColor() }}>
      <h3>{type === 'success' ? 'Success data' : 'Fail data'}</h3>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.vendor_name} {type}ful on {item.created_at}</li>
        ))}
      </ul>
    </div>
  );
};

export default SuccessFailDisplay;
