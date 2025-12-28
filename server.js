import express from 'express';
import sqlite3 from 'sqlite3';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from './userService.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

const db = new sqlite3.Database('sampleDB.db', sqlite3.OPEN_READWRITE);

app.get('/api/users/', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (Error) {
        res.status(500).json(Error);
    }
});

app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await getUserById(req.params.id);

        if (user == null || user == undefined)
            return res.status(404).json('Message: user not found!');

        res.status(200).json(user);
    } catch (Error) {
        res.status(500).json(Error);
    }
});

app.post('/api/users/', async (req, res) => {
    try {
        const result = await createUser(req.body.firstName, req.body.lastName);
        res.status(201).send(result);
    } catch (Error) {
        res.status(500).send(Error);
    }
});

app.put('/api/users/:id', async (req, res) => {
    try {
        var user = await getUserById(req.params.id);

        if (user == null || user == undefined)
            return res.status(404).json('Message: user not found!');

        var result = await updateUser(user.id, req.body.firstName, req.body.lastName);
        res.status(204).json(result);
    } catch (Error) {
        res.status(500).json(Error);
    }
});

app.delete('/api/users/:id', async (req, res) => {
    try {
        var user = await getUserById(req.params.id);

        if (user == null || user == undefined)
            return res.status(404).json('Message: user not found!');

        var result = await deleteUser(user.id);
        res.status(204).json(result);
    } catch (Error) {
        res.status(500).json(Error);
    }
});

app.listen(port, () => {
    console.log(`Example listening to http://localhost:${port}`);
});