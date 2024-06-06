const express = require('express');
const routers = express.Router()
const getvendorlist = require("../controllers/vendor");

routers.get("/getvendor",getvendorlist);


module.exports = routers;