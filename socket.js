const { Server } = require('socket.io');
const ACTIONS = require('./constants/Actions');
const Room = require('./models/roomModel'); // Import your Room model for automatic tracking syncing

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  // Track socket mappings cleanly: socket.id -> { username, roomId, dbUserId }
  const socketRegistry = new Map();

  // Helper: Safely derive names of active socket connections sitting in a room
  const getClientNamesInRoom = (roomId) => {
    const room = io.sockets.adapter.rooms.get(roomId);
    if (!room) return [];
    
    return Array.from(room)
      .map(socketId => socketRegistry.get(socketId)?.username)
      .filter(Boolean); // Discard undefined or orphaned references
  };

  io.on('connection', (socket) => {
    console.log(`Socket connected line tracking channel: ${socket.id}`);

    // 1. SAFE ROOM INITIALIZATION & JOIN PIPELINE
    socket.on(ACTIONS.JOIN_ROOM, async ({ roomId, username, dbUserId }) => {
      if (!roomId || !username) return;

      // Ensure the socket successfully joins the room channel
      await socket.join(roomId);
      
      // Explicitly register this socket's state properties (include dbUserId for DB sync updates)
      socketRegistry.set(socket.id, { username, roomId, dbUserId });

      // Gather the true, live collection of usernames now in the room
      const clients = getClientNamesInRoom(roomId);
      
      console.log(`User ${username} successfully verified in room: ${roomId}. Current clients:`, clients);

      // Broadcast the updated, accurate list to EVERYONE in the room cleanly
      io.to(roomId).emit(ACTIONS.NEW_JOIN, {
        username,
        clients
      });
    });

    // 2. BACKEND SIGNAL TRANSMISSION PIPELINES (Passthroughs)
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
        
        // Emit back out to all sockets currently residing inside the channel room
        socket.to(room).emit(ACTIONS.WORKSPACE_SAVED_BROADCAST, { username });
    });

    // 3. LEAK-PROOF DISCONNECT LIFECYCLE HANDLER WITH AUTO DATABASE CLEANUP
    socket.on('disconnecting', async () => {
      const registeredUser = socketRegistry.get(socket.id);
      const activeRooms = Array.from(socket.rooms);

      // We use Promise.all to ensure async database operations resolve before socket context drops completely
      await Promise.all(activeRooms.map(async (roomId) => {
        if (roomId !== socket.id) {
          
          // A. Update MongoDB State: Remove user profile reference from participants collection array automatically
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

          // B. Construct an updated array of users excluding the one currently leaving
          const currentClients = getClientNamesInRoom(roomId).filter(
            (name) => name !== registeredUser?.username
          );

          // C. Broadcast the departure to all remaining users in the room
          socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
            username: registeredUser?.username || "A collaborator",
            clients: currentClients // Send down the fresh list to force immediate UI syncing
          });
        }
      }));

      // Clear the socket from memory to prevent memory leaks
      socketRegistry.delete(socket.id);
      console.log(`Socket cleanly flushed from memory registry: ${socket.id}`);
    });
  });
};

module.exports = initSocket;