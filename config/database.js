// config/database.js
module.exports = {
    MONGODB_URI:
        process.env.MONGODB_URI || "mongodb://localhost:27017/movie_list",
};
