const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Client connected');

  // Send mock data every 3 seconds
  setInterval(() => {
    const data = {
      time: new Date().toLocaleTimeString(),
      value: Math.floor(Math.random() * 100)
    };
    socket.emit('dashboardData', data);
  }, 3000);
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
