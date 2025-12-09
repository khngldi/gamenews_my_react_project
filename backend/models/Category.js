const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    gradient: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Category", CategorySchema);