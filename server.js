const express = require("express");

const app = express();

app.get("/", (req, res) => res.send("API running."));

// Will watch port set in the env variable once deployed on Heroku. otherwise it'll watch port 5000.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));