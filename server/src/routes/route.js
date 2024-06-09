const express = require('express');
const routers = express.Router()
const getvendorlist = require("../controllers/vendor");
const productinsert = require("../controllers/productinsert");
const sseHandler = require("../controllers/ssehandle")
routers.get("/getvendor",getvendorlist);
routers.post("/insertpro",productinsert);
routers.get('/events', (req, res) => {
    sseHandler.sendSSE(res);
  });
  

module.exports = routers;

