const express = require('express');
const sqlite3 = require('sqlite3');

const app = express();
const port = 3000;

app.use(express.json());

const db = new sqlite3.Database('sampleDB.db', sqlite3.OPEN_READWRITE);

app.get('/api/users/', async (req, res) => {
    let data = [];
    await db.all("SELECT * FROM users", (err, rows) => {
        if (err) {
            throw err;
        } else {
            rows.forEach(row => {
                console.log(row);
                data.push(row);
            });
        res.send(data);
        }
    });
});

app.get('/api/users/:id', async (req, res) => {
    var userId = req.params.id;
    await db.get("SELECT * FROM users WHERE id == " + userId, (err, row) => {
        if (err) {
            throw err;
        } else {
            console.log(row);
            res.send(row);
        }
    });
});

app.post('/api/users/', async (req, res) => {
    await db.run("INSERT INTO users (firstName, lastName) VALUES ('" + req.body.firstName + "', '" + req.body.lastName + "');", (err, row) => {
        if (err) {
            throw(err);
        } else {
            console.log(row);
            res.send(row);
        }
    });
});

app.put('/api/users/:id', async (req, res) => {
    var userId = req.params.id;
    await db.run("UPDATE users SET firstName = '" + req.body.firstName + "', lastName = '" + req.body.lastName + "' WHERE id == " + userId + ";", (err, row) => {
        if (err) {
            throw(err);
        } else {
            console.log(row);
            res.send(row);
        }
    });
});

app.listen(port, () => {
    console.log(`Example listening to http://localhost:${port}`);
});