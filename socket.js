const { Server } = require('socket.io');
const ACTIONS = require('./constants/Actions');

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*"
    }
  });

  const userMap = new Map();

  const getClientNamesinRoom = (roomId) => {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
      return userMap.get(socketId);
    });
  };

  const getClientIdsinRoom = (roomId) => {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || [])
  };

  io.on('connection', (socket) => {

    socket.on(ACTIONS.JOIN_ROOM, ({ roomId, username }) => {
      socket.join(roomId);
      if (!userMap.has(socket.id)) {
        userMap.set(socket.id, username);
      }
      const clients = getClientNamesinRoom(roomId);
      getClientIdsinRoom(roomId).forEach((socketId) => {
        io.to(socketId).emit(ACTIONS.NEW_JOIN, { username, clients });
      })
    });

    socket.on(ACTIONS.CODE_CHANGE, ({ editorLang, code, room }) => {
      socket.in(room).emit(ACTIONS.CODE_CHANGE, { lang: editorLang, code });
    });

    socket.on(ACTIONS.DISCONNECTING, () => {
      const rooms = socket.rooms;
      rooms.forEach((roomId) => {
        socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
          username: userMap.get(socket.id),
        });
      });
      userMap.delete(socket.id);
      socket.leave();
    });
  });
};

module.exports = initSocket;
