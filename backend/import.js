const mongoose = require("mongoose");

const resources = {
    categories: require("./models/Category"),
    news: require("./models/News"),
    comments: require("./models/Comment"),
    friends: require("./models/Friend"),
    platforms: require("./models/Platform"),
};

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/auth";
const MOKKY_URL = (process.env.MOKKY_URL || "https://5ab9c8bc637d0098.mokky.dev").replace(/\/$/, "");

(async () => {
    try {
        console.log("Downloading and validating data...");
        // Validate every resource before writing anything to MongoDB.
        const datasets = await Promise.all(Object.entries(resources).map(async ([name, Model]) => {
            const response = await fetch(`${MOKKY_URL}/${name}`, {
                signal: AbortSignal.timeout(15000),
            });
            if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`);
            const data = await response.json();
            if (!Array.isArray(data)) throw new Error(`${name}: expected an array`);
            const ids = new Set();
            const documents = data.map((item, index) => {
                const document = new Model({ ...item, id: item.id ?? index + 1 });
                const error = document.validateSync();
                if (error) throw error;
                if (ids.has(document.id)) throw new Error(`${name}: duplicate id ${document.id}`);
                ids.add(document.id);
                const record = document.toObject();
                delete record._id;
                return record;
            });
            return { name, Model, documents };
        }));
        await mongoose.connect(MONGO_URL, { serverSelectionTimeoutMS: 5000 });
        console.log(`MongoDB connected: ${mongoose.connection.name}`);
        for (const { name, Model, documents } of datasets) {
            if (!documents.length) {
                console.log(`${name}: no source records`);
                continue;
            }
            // Re-running the import preserves existing records and comments.
            const result = await Model.bulkWrite(documents.map(document => ({
                updateOne: {
                    filter: { id: document.id },
                    update: { $setOnInsert: document },
                    upsert: true,
                },
            })));
            console.log(`${name}: added ${result.upsertedCount}, existing ${result.matchedCount}`);
        }
        console.log("Import completed!");
    } catch (err) {
        console.error("Import failed:", err.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
})();
