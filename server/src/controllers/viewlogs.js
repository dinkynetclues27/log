const express = require('express');
const fs = require('fs');
const path = require('path');

const viewlogs = (req,res)=>{
    const vendor = req.query.vendor;

  if (!vendor) {
    return res.status(400).json({ error: 'Vendor not provided' });
  }

  const logFilePath = path.join(__dirname, '..', 'logs', `${vendor}_logs.json`);

  if (!fs.existsSync(logFilePath)) {
    return res.status(404).json({ error: 'Logs not found for the vendor' });
  }

  const logs = JSON.parse(fs.readFileSync(logFilePath));
  res.json({ logs });
}

module.exports = viewlogs;
