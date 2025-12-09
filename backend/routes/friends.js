const express = require("express");
const router = express.Router();
const Friend = require("../models/Friend");

router.get("/", async (req, res) => {
    try {
        const friends = await Friend.find().sort({ id: 1 });
        res.json(friends);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const last = await Friend.findOne().sort({ id: -1 });
        const newId = last ? last.id + 1 : 1;

        const newFriend = await Friend.create({ id: newId, ...req.body });
        res.status(201).json(newFriend);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;