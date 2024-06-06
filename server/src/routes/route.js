const express = require('express');
const routers = express.Router()
const getvendorlist = require("../controllers/vendor");
const productinsert = require("../controllers/productinsert");

routers.get("/getvendor",getvendorlist);
routers.post("/insertpro",productinsert);

module.exports = routers;

