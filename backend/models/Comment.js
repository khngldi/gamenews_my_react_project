const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    postId: {
        type: Number,
        required: true
    },
    author: {
        type: String,
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model("Comment", CommentSchema);