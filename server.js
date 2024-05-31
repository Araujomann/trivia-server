const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Helcome to the trivia server");
});
let db = new sqlite3.Database("./trivia.db", (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log("Connected to the trivia database.");
});

db.run(
    `CREATE TABLE IF NOT EXISTS scores (
    name text,
    score integer
)`,
    (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Table created.");
    }
);

app.post("/score", (req, res) => {
    const { name, score } = req.body;
    db.run(
        `INSERT INTO scores(name, score) VALUES(?, ?)`,
        [name, score],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ lastID: this.lastID });
        }
    );
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
