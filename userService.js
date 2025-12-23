import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('sampleDB.db', sqlite3.OPEN_READWRITE);

// Using promise-based callbacks for SQLite queries
// since await db-calls finish before returning rows
export async function getAllUsers() {
    var sql = "SELECT * FROM users";
    return new Promise((resolve, reject) => {
        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

export async function getUserById(id) {
    var sql = "SELECT * FROM users WHERE id == ?";
    return new Promise((resolve, reject) => {
        db.get(sql, [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                console.log(row);
                resolve(row);
            }
        });
    });
}

export async function createUser(firstName, lastName) {
    var sql = "INSERT INTO users (firstName, lastName) VALUES (?, ?);";
    return new Promise((resolve, reject) => {
        db.run(sql, [firstName, lastName], function (err) {
            if (err) {
                reject(err);
            } else {
                console.log(this);
                resolve({
                    message: 'User created!',
                    id: this.lastID
                });
            }
        });
    });
}

export async function updateUser(id, firstName, lastName) {
    var sql = "UPDATE users SET firstName = ?, lastName = ? WHERE id = ?;";
    return new Promise((resolve, reject) => {
        db.run(sql, [firstName, lastName, id], function(err) {
            if (err) {
                reject(err);
            } else {
                console.log(this);
                resolve({
                    message: (this.changes < 0 ? 'User updated!' : 'User not found!'),
                    updatedRows: this.changes
                });
            }
        })
    });
}

export async function deleteUser(id) {
    var sql = "DELETE FROM users WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.run(sql, [id], function(err) {
            if (err) {
                reject(err);
            } else {
                console.log(this);
                resolve({
                    message: (this.changes > 0 ? 'User deleted!' : 'User not found!'),
                    deletedRows: this.changes
                });
            }
        });
    });
}