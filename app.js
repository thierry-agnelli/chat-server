const authentication = require("./middleware/authentification");


module.exports = (io) => {

    // Middleware d'authentification
    authentication(io);
    
    // event connexion
    io.on("connection", (socket) => {
        console.log("New Challenger: " + socket.username + "!");

        // AJout de la socket à la room1
        socket.join("room1");

        socket.to("room1").emit("message", {
            content: "A wild " + socket.username + " has appeared.",
            username: "Server"
        });

        // ecoute event 
        socket.on("message", (data) => {
            console.log("New message from: " + socket.username, ":", data.content);
            socket.to("room1").emit("message", {
                content: data.content,
                username: socket.username
            });
        });
    });
};