const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const connectDB = require("./config/connectDB");
const userRoutes = require("./routes/userRoutes");
const codeRoutes = require("./routes/codeRoutes");
const roomRoutes = require('./routes/roomRoutes');
const initSocket = require('./socket');
const { setupWSConnection } = require('y-websocket/bin/utils');
const WebSocket = require('ws');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const PORT = process.env.PORT || 4040;

connectDB();

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/codes', codeRoutes);
app.use('/api/v1/rooms', roomRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to codesynth backend!!");
});

initSocket(server);

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (conn, req) => {
  setupWSConnection(conn, req);
});

server.on('upgrade', (request, socket, head) => {
  const pathname = request.url.split('?')[0];

  if (pathname.startsWith('/yjs')) {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  }
});

server.listen(PORT, () => {
  console.log(`Successfully started port at : ${PORT}`);
});