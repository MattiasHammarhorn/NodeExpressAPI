import express from 'express';
import sqlite3 from 'sqlite3';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from './userService.js';

const app = express();
const port = 3000;

app.use(express.json());

const db = new sqlite3.Database('sampleDB.db', sqlite3.OPEN_READWRITE);

app.get('/api/users/', async (req, res) => {
    const users = await getAllUsers();
    res.status(200).send(users);
});

app.get('/api/users/:id', async (req, res) => {
    const user = await getUserById(req.params.id);

    if (user == null || user == undefined)
        return res.sendStatus(404);

    res.status(200).send(user);
});

app.post('/api/users/', async (req, res) => {
    const result = await createUser(req.body.firstName, req.body.lastName);
    res.status(201).send(result);
});

app.put('/api/users/:id', async (req, res) => {
    var user = await getUserById(req.params.id);

    if (user == null || user == undefined)
        return res.sendStatus(404);

    var result = await updateUser(user.id, req.body.firstName, req.body.lastName);
    res.status(204).send(result);
});

app.delete('/api/users/:id', async (req, res) => {
    var user = await getUserById(req.params.id);

    if (user == null || user == undefined)
        return res.sendStatus(404);

    var result = await deleteUser(user.id);
    res.status(204).send(result);
});

app.listen(port, () => {
    console.log(`Example listening to http://localhost:${port}`);
});