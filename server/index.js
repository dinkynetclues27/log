const express = require('express');
const sequelize = require('./src/config/database')
require('dotenv').config();
const app = express();
const path = require("path")
const port = process.env.PORT
const cors = require('cors')
const bodyParser = require('body-parser');
const routers = require('./src/routes/route')

const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routers);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

sequelize;

app.listen(port, () => {
    console.log("Server is running on port 4000");
  });

module.exports = io