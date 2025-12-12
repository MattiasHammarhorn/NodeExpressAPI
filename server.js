const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

const sampleUsers = [
    { 'id': 1, 'firstName': 'Anders', 'lastName': 'Gustavsson' },
    { 'id': 2, 'firstName': 'Bogdan', 'lastName': 'Hadzic' },
    { 'id': 3, 'firstName': 'Imran', 'lastName': 'Seyidoglu' }
];

app.get('/api/users/', async (req, res) => {
    res.send(sampleUsers);
});

app.get('/api/users/:id', async (req, res) => {
    var userId = req.params.id;
    var user = sampleUsers.find( u => u.id == userId);
    res.send(user);
});

app.post('/api/users/', async (req, res) => {
    let user = {
        id: sampleUsers.length + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    };
    sampleUsers.push(user);
    res.send(user);
});

app.put('/api/users/:id', async (req, res) => {
    let user = sampleUsers.find(u => u.id == req.params.id);
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    res.send(user);
});

app.listen(port, () => {
    console.log(`Example listening to http://localhost:${port}`);
});