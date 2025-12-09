const express = require("express");
const router = express.Router();
const News = require("../models/News");

router.get("/", async (req, res) => {
    try {
        const { category } = req.query;
        const filter = {};

        if (category) {
            filter.category = category;
        }

        const news = await News.find(filter).sort({ id: -1 });
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const newsItem = await News.findOne({ id: req.params.id });
        if (!newsItem) return res.status(404).json({ message: "Не найдено" });
        res.json(newsItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const last = await News.findOne().sort({ id: -1 });
        const newId = last ? last.id + 1 : 1;

        const newNews = await News.create({ id: newId, ...req.body });
        res.status(201).json(newNews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updated = await News.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Не найдено" });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deleted = await News.findOneAndDelete({ id: req.params.id });
        if (!deleted) return res.status(404).json({ message: "Не найдено" });
        res.json({ message: "Новость удалена" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
