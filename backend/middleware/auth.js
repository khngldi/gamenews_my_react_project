const jwt = require("jsonwebtoken");
const JWT_SECRET = "my_super_secret_key_2025";

module.exports = function (req, res, next) {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({ message: "Нет токена" });
    }

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Неверный токен" });
    }
};
