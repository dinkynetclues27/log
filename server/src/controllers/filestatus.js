const express = require('express');
const fs = require('fs');
const path = require('path');

const filestatus =(req,res)=>{
    const vendor = req.query.vendor;

  if (!vendor) {
    return res.status(400).json({ error: 'Vendor not provided' });
  }

  const filePath = path.join(__dirname, '..', 'vendors', vendor, `${vendor}.csv`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'CSV file not found' });
  }

  // Check if the file has been successfully processed
  // Here you can implement your own logic to check the status
  // For simplicity, I'm assuming the status based on the existence of logs
  const logFilePath = path.join(__dirname, '..', 'logs', `${vendor}_logs.json`);
  let fileStatus = 'pending';
  if (fs.existsSync(logFilePath)) {
    const logs = JSON.parse(fs.readFileSync(logFilePath));
    const successLogs = logs.filter(log => log.status === 'inserted' || log.status === 'updated');
    if (successLogs.length === logs.length) {
      fileStatus = 'success';
    } else {
      fileStatus = 'failure';
    }
  }

  res.json({ fileStatus });
}

module.exports = filestatus;