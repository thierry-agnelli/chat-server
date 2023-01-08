

module.exports = io => {
    console.log("ready to Authentication");

    io.use((socket, next) => {
        console.log("Authentication attempt");
        // get données
        const { username, password } = socket.handshake.auth;

        // verif données
        if (!username || password !== "cacahuete")
            return next(new Error("Wrong username or password"));

        // Connexion acceptée
        socket.username = username;
        console.log("Connection granted");
        next();
    });
}