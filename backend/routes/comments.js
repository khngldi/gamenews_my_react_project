const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

router.get("/", async (req, res) => {
    try {
        const { postId } = req.query;
        let comments;
        if (postId) {
            comments = await Comment.find({ postId: Number(postId) }).sort({ id: -1 });
        } else {
            comments = await Comment.find().sort({ id: -1 });
        }
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const { postId, author, text } = req.body;

        if (!postId || !text) return res.status(400).json({ message: "postId и text обязательны" });

        const last = await Comment.findOne().sort({ id: -1 });
        const newId = last ? last.id + 1 : 1;

        const newComment = await Comment.create({
            id: newId,
            postId: Number(postId),
            author: author || "Аноним",
            text,
            createdAt: new Date()
        });

        res.status(201).json(newComment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при добавлении комментария" });
    }
});


module.exports = router;
