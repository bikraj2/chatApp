const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const router = require('./router/chat');
const PORT = 4000;
const cors = require('cors');
const app = express();
const {
  addUser,
  removeUser,
  getUser,
  getUserInRoom,
} = require('./controllers/users');
const connect = require('./config/database');
app.use(router);
const server = http.createServer(app);
app.use(cors());
const io = socketio(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', async (socket) => {
  console.log(`We have a new connection`);
  socket.on('disconnect', () => {
    console.log(`User left!!`);
  });
  socket.on('join', async ({ name, room, username }, callback) => {
    try {
      console.log(username);
      const { error, user } = await addUser({
        id: socket.id,
        name,
        room,
        username,
      });

      if (error) callback(error);
      else if (user) {
        socket.emit('message', {
          user: 'admin',
          text: `${user.name}, Welcome to the room: ${user.room}`,
        });
        socket.broadcast
          .to(user.room)
          .emit('message', { user: 'admin', text: `${user.name} has joined!` });
        socket.join(user.room);
      }
    } catch (error) {
      callback(error);
    }
  });

  socket.on('sendMessage', async (message, callback) => {
    try {
      console.log('hey');
      const user = getUser(socket.id);

      io.to(user.room).emit('message', { user: user.name, text: message });
      callback();
    } catch (error) {
      callback(error);
    }
  });
});

const start = async () => {
  try {
    connect();
    server.listen(PORT, () =>
      console.log(`Server has started on port ${PORT}`)
    );
  } catch (error) {
    console.log(`Error occured ${error}`);
  }
};

start();
