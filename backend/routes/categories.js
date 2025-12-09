const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

router.get("/", async (req, res) => {
    try {
        const categories = await Category.find().sort({ id: 1 });
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const last = await Category.findOne().sort({ id: -1 });
        const newId = last ? last.id + 1 : 1;

        const newCategory = await Category.create({ id: newId, ...req.body });
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;