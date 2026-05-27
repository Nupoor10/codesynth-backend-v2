const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const connectDB = require("./config/connectDB");
const userRoutes = require("./routes/userRoutes");
const codeRoutes = require("./routes/codeRoutes");
const roomRoutes = require('./routes/roomRoutes');
const initSocket = require('./socket');
// Use the package-exported bin utils entry to access setupWSConnection
const { setupWSConnection } = require('y-websocket/bin/utils');
const WebSocket = require('ws');

// 1. Load environment configurations
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// 2. Initialize native HTTP server wrapper instance
const server = http.createServer(app);
const PORT = process.env.PORT || 4040;

// 3. Connect to MongoDB instances
connectDB();

// 4. REST API Endpoint Route Pipeline Configuration
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/codes", codeRoutes);
app.use("/api/v1/rooms", roomRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to codesynth backend!!");
});

// 5. Initialize Socket.io instance framework layer
initSocket(server);

// 6. Instantiate Yjs isolated WebSocket server framework with noServer mode 
// This cleanly stops it from intercepting standard global server traffic hooks automatically
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (conn, req) => {
  setupWSConnection(conn, req);
});

// 7. Optimal Traffic Routing: Safely hand over network frames depending on requested route paths
server.on('upgrade', (request, socket, head) => {
  // Use a reliable string split parser to gracefully catch clean pathname strings
  const pathname = request.url.split('?')[0];

  if (pathname.startsWith('/yjs')) {
    // Exclusively hand off execution control over to the Yjs WebSocket execution server
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  } else {
    // Fall back and allow Socket.io's underlying engine listeners to process its /socket.io requests natively
  }
});

// 8. Start Application Host Listener Processes
server.listen(PORT, () => {
  console.log(`Successfully started port at : ${PORT}`);
});