const axios = require("axios");
const mongoose = require("mongoose");

const Category = require("./models/Category");
const News = require("./models/News");
const Comment = require("./models/Comment");
const Friend = require("./models/Friend");
const Platform = require("./models/Platform");

const MONGO_URL = 'mongodb://172.30.209.223:27017/auth';

(async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("MongoDB connected!");

        const urls = {
            categories: "https://5ab9c8bc637d0098.mokky.dev/categories",
            news:       "https://5ab9c8bc637d0098.mokky.dev/news",
            comments:   "https://5ab9c8bc637d0098.mokky.dev/comments",
            friends:    "https://5ab9c8bc637d0098.mokky.dev/friends",
            platforms:  "https://5ab9c8bc637d0098.mokky.dev/platforms",
        };

        console.log("Downloading data...");

        const [
            categoriesRes,
            newsRes,
            commentsRes,
            friendsRes,
            platformsRes
        ] = await Promise.all([
            axios.get(urls.categories),
            axios.get(urls.news),
            axios.get(urls.comments),
            axios.get(urls.friends),
            axios.get(urls.platforms),
        ]);

        console.log("Clearing old data...");
        await Category.deleteMany({});
        await News.deleteMany({});
        await Comment.deleteMany({});
        await Friend.deleteMany({});
        await Platform.deleteMany({});

        console.log("Inserting into MongoDB...");

        const categoriesData = categoriesRes.data.map((item, index) => ({ id: index + 1, ...item }));
        const newsData       = newsRes.data.map((item, index) => ({ id: index + 1, ...item }));
        const commentsData   = commentsRes.data.map((item, index) => ({ id: index + 1, ...item }));
        const friendsData    = friendsRes.data.map((item, index) => ({ id: index + 1, ...item }));
        const platformsData  = platformsRes.data.map((item, index) => ({ id: index + 1, ...item }));

        await Category.insertMany(categoriesData);
        await News.insertMany(newsData);
        await Comment.insertMany(commentsData);
        await Friend.insertMany(friendsData);
        await Platform.insertMany(platformsData);

        console.log("Import completed!");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
