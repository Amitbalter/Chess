require("./connection.js");

const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");
const { instrument } = require("@socket.io/admin-ui");

const app = express();
const { PORT = 1234 } = process.env;

const server = http.createServer(app);

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "https://admin.socket.io/"],
        methods: ["GET"],
    },
});

instrument(io, {
    auth: false,
    mode: "development",
});

const gamesRouter = require("./routes/games")(io);
app.use("/games", gamesRouter);

server.listen(PORT, () => console.log(`Listening on ${PORT}...`));
