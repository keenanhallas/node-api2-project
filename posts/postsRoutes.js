const express = require("express");
const db = require("../data/db");
const { response } = require("express");

const router = express.Router();

//Get all posts
router.get("/", (req, res) => {
    db.find()
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The posts information could not be retrieved." });
        });
});

//Get a specific post
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    db.findById(id)
        .then(response => {
            if(response.length !== 0) {
                res.status(200).json(response);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be retrieved." });
        });
});

//Get the comments for a specific post
router.get("/:id/comments", (req, res) => {
    const id = Number(req.params.id);
    db.findById(id)
        .then(response => {
            if(response.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The comments information could not be retrieved." });
        });
    db.findPostComments(id)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({ error: "The comments information could not be retrieved." });
        });
});

//Post a new post
router.post("/", (req, res) => {
    const post = req.body;
    if (!post.title || !post.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
    db.insert(post)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the post to the database" });
        });
});

//Post a comment
router.post("/:id/comments", (req, res) => {

});

//Edit a post
router.put("/:id", (req, res) => {

});

//Delete a post
router.delete("/:id", (req, res) => {

});

module.exports = router;