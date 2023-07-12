const express = require('express');
const socket = require('socket.io');
const path = require('path');

const app = express();

const messages = [];
const users = [];

// middlewares
app.use(express.static(path.join(__dirname, '/client')));

// catching bad links
app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

// show app on /
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

// start server
const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
  socket.on('join', (user) => {
    console.log('We\'ve got a new pirate on board! Arrrr ' + user.user);
    users.push({ name: user.user, id: socket.id });
    console.log(users);
  });
  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });
  socket.on('disconnect', () => { 
    console.log('Oh, socket ' + socket.id + ' has left');
    const index = users.findIndex(item => item.id === socket.id);
    if (index !== -1) {
      users.splice(index, 1);
    }
    console.log(users);    
  });  
  console.log('I\'ve added a listener on message event \n');
});