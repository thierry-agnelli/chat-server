const http = require("http");

const app = require("./app");

const server = http.createServer();

const io = require("socket.io")(server, {
    cors:{
        origin: "*"
    }
});

const port = process.env.PORT || 8080;

server.listen(port);

server.on("listening", () => {
    console.log("Server start on port: " + port);
    app(io);
});