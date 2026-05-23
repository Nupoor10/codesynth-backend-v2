const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const connectDB = require("./config/connectDB");
const userRoutes = require("./routes/userRoutes");
const codeRoutes = require("./routes/codeRoutes");
const cohereRoutes = require("./routes/cohereRoutes");
const noteRoutes = require("./routes/noteRoutes");
const roomRoutes = require('./routes/roomRoutes');
const initSocket = require('./socket');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const PORT = process.env.PORT || 4040;

connectDB();

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/codes", codeRoutes);
app.use("/api/v1/llm", cohereRoutes);
app.use("/api/v1/notes", noteRoutes);
app.use("/api/v1/rooms", roomRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to codesynth backend!!");
});

initSocket(server);

server.listen(PORT, () => {
  console.log(`Successfully started port at : ${PORT}`);
});
