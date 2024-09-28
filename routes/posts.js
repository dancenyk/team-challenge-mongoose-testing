const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
router.post("/create", async(req, res) => {
    try {
        const post = await Post.create(req.body);
        if (!req.body.title) {
            return res.status(400).json({ message: "Title is required" });
        }
        res.status(201).json(post);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "There was a problem trying to create a post" });
    }
});
router.get("/", async(req, res) => {
    try {
        const posts = await Post.find()
        res.status(200).json(posts);
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "There was a problem trying to get all posts"})
    }
})
router.get("/id/:_id", async(req,res) => {
    try {
        const post = await Post.findById(req.params._id);
        if (!post) {
            return res.status(404).json({ message: "The task with the provided id does not exist" })
        }
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "An error occurred while fetching the post" });
    }
})
router.get("/title/:title", async(req,res) => {
    try {
        const post = await Post.findOne({ title: req.params.title });
        if (!post) {
            return res.status(404).json({ message: "The post with the provided title does not exist" })
        }
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "An error occurred while fetching the post" });
    }
})
router.put("/id/:_id", async(req,res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params._id, 
            { title: req.body.title, content: req.body.content }, 
            { new: true, runValidators: true} 
            );
        if (!post) {
            return res.status(404).json({ message: "The post with the provided id does not exist" })
        }
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "An error occurred while fetching the post" });
    }
})
router.delete("/id/:_id", async(req,res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params._id);
        if (!post) {
            return res.status(404).json({ message: "The post with the provided id does not exist" })
        }
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "An error occurred while fetching the post" });
    }
})
module.exports = router