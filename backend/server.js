const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const app = express();
const port = 2000;

const MONGO_URL = 'mongodb://172.30.209.223:27017/auth';
const JWT_SECRET = "my_super_secret_key_2025";

const User = require('./models/User');
const newsRoutes = require("./routes/news");
const friendRoutes = require("./routes/friends");
const categoryRoutes = require("./routes/categories");
const platformRoutes = require("./routes/platforms");
const commentRoutes = require("./routes/comments");

const auth = require('./middleware/auth');

app.use(express.json());
app.use(cors());

mongoose.connect(MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Error connecting:", err));


app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Заполните username и password" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: "Пользователь уже существует" });
        }

        const newUser = await User.create({ username, password });

        const token = jwt.sign(
            { id: newUser._id, username: newUser.username },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        const { _id } = newUser;
        res.json({ message: "Регистрация успешная", user: { _id, username }, token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Заполните username и password" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Неверный логин или пароль" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Пароли не совпадают!" });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        const { _id } = user;
        res.json({ message: "Вход успешный", token, user: { _id, username } });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

app.get("/api/profile", auth, (req, res) => {
    res.json({ message: "Доступ разрешён!", user: req.user });
});

app.use("/api/news", newsRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/platforms", platformRoutes);
app.use("/api/comments", commentRoutes);

app.listen(port, () => {
    console.log(`Сервер работает: http://localhost:${port}`);
});
