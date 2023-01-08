const authentication = require("./middleware/authentification");

module.exports = (io) => {

    // Middleware d'authentification
    authentication(io);
    
    // event connexion
    io.on("connection", (socket) => {
        console.log("New Challenger: " + socket.username + "!");
        
        if(io.usersList)
            io.usersList.push(socket.username);
        else
            io.usersList = [socket.username]

        // AJout de la socket à la room1
        socket.join("room1");
        
        io.emit("users", {
            usersList: io.usersList
        });

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

        socket.on("disconnect", reason => {
            const index = io.usersList.indexOf(socket.username);
            
            io.usersList.splice(index,1);

            io.emit("users", {
                usersList: io.usersList
            });
        });

    });

    
};