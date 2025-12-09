const express = require("express");
const router = express.Router();
const Platform = require("../models/Platform");

router.get("/", async (req, res) => {
    try {
        const platforms = await Platform.find().sort({ id: 1 });
        res.json(platforms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const last = await Platform.findOne().sort({ id: -1 });
        const newId = last ? last.id + 1 : 1;

        const newPlatform = await Platform.create({ id: newId, ...req.body });
        res.status(201).json(newPlatform);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;