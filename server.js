const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect database
connectDB();

app.get("/", (req, res) => res.send("API running."));

// Define routes for endpoints - where these defined endpoints will point to in my file structure.
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

// Will watch port set in the env variable once deployed on Heroku. otherwise it'll watch port 5000.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));