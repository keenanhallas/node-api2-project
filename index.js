const express = require("express");
const postsRoutes = require("./posts/postsRoutes");

const server = express();

server.use(express.json());

port = 8000;

server.listen(port, () => {
    console.log("server running...");
})

server.get("/", (req, res) => {
    res.status(200).send("Hello world from an express server");  
});

server.use("/posts", postsRoutes);