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

    // File operations
    socket.on(ACTIONS.FILE_CONTENT_CHANGE, ({ fileId, content, room }) => {
      socket.in(room).emit(ACTIONS.FILE_CONTENT_CHANGE, { fileId, content });
    });

    socket.on(ACTIONS.FILE_CREATE, ({ file, room }) => {
      socket.in(room).emit(ACTIONS.FILE_CREATE, { file });
    });

    socket.on(ACTIONS.FILE_DELETE, ({ fileId, room }) => {
      socket.in(room).emit(ACTIONS.FILE_DELETE, { fileId });
    });

    socket.on(ACTIONS.FILE_RENAME, ({ fileId, name, room }) => {
      socket.in(room).emit(ACTIONS.FILE_RENAME, { fileId, name });
    });

    socket.on(ACTIONS.FILE_REORDER, ({ fileOrder, room }) => {
      socket.in(room).emit(ACTIONS.FILE_REORDER, { fileOrder });
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
