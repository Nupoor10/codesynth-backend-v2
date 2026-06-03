const { Server } = require('socket.io');
const ACTIONS = require('./constants/Actions');
const Room = require('./models/roomModel');

const initSocket = (server) => {
  const io = new Server(server, {
    destroyUpgrade: false,
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  const socketRegistry = new Map();

  const getClientNamesInRoom = (roomId) => {
    const room = io.sockets.adapter.rooms.get(roomId);
    if (!room) return [];
    
    return Array.from(room)
      .map(socketId => socketRegistry.get(socketId)?.username)
      .filter(Boolean);
  };

  io.on('connection', (socket) => {
    console.log(`Socket connected line tracking channel: ${socket.id}`);

    socket.on(ACTIONS.JOIN_ROOM, async ({ roomId, username, dbUserId }) => {
      if (!roomId || !username) return;

      await socket.join(roomId);
      socketRegistry.set(socket.id, { username, roomId, dbUserId });
      const clients = getClientNamesInRoom(roomId);
      
      console.log(`User ${username} successfully verified in room: ${roomId}. Current clients:`, clients);
      io.to(roomId).emit(ACTIONS.NEW_JOIN, {
        username,
        clients
      });
    });

    socket.on(ACTIONS.FILE_CREATE, ({ file, room }) => {
      if (room) socket.in(room).emit(ACTIONS.FILE_CREATE, { file });
    });

    socket.on(ACTIONS.FILE_DELETE, ({ fileId, room }) => {
      if (room) socket.in(room).emit(ACTIONS.FILE_DELETE, { fileId });
    });

    socket.on(ACTIONS.FILE_RENAME, ({ fileId, name, room }) => {
      if (room) socket.in(room).emit(ACTIONS.FILE_RENAME, { fileId, name });
    });

    socket.on(ACTIONS.WORKSPACE_SAVED, ({ room, username }) => {
      console.log(`💾 Broadcast save notification to room: ${room} by user: ${username}`);
      socket.to(room).emit(ACTIONS.WORKSPACE_SAVED_BROADCAST, { username });
    });

    socket.on('disconnecting', async () => {
      const registeredUser = socketRegistry.get(socket.id);
      const activeRooms = Array.from(socket.rooms);

      await Promise.all(activeRooms.map(async (roomId) => {
        if (roomId !== socket.id) {
          
          if (registeredUser && registeredUser.dbUserId) {
            try {
              await Room.findOneAndUpdate(
                { roomId: roomId },
                { $pull: { participants: registeredUser.dbUserId } }
              );
              console.log(`Database sync: Removed ${registeredUser.username} from room document participants array.`);
            } catch (dbErr) {
              console.error("Failed to update database participants list on disconnect:", dbErr);
            }
          }

          const currentClients = getClientNamesInRoom(roomId).filter(
            (name) => name !== registeredUser?.username
          );

          socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
            username: registeredUser?.username || "A collaborator",
            clients: currentClients
          });
        }
      }));

      socketRegistry.delete(socket.id);
      console.log(`Socket cleanly flushed from memory registry: ${socket.id}`);
    });
  });
};

module.exports = initSocket;