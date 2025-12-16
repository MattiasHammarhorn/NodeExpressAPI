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
    var sql = "SELECT * FROM users WHERE id == " + id;
    return new Promise((resolve, reject) => {
        db.get(sql, (err, row) => {
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
    var sql = "INSERT INTO users (firstName, lastName) VALUES ('" + firstName + "', '" + lastName + "');";
    return new Promise((resolve, reject) => {
        db.exec(sql, (err, row) => {
            if (err) {
                reject(err);
            } else {
                console.log(row);
                resolve('User created!');
            }
        });
    });
}

export async function updateUser(id, firstName, lastName) {
    var sql = "UPDATE users SET firstName = '" + firstName + "', lastName = '" + lastName + "' WHERE id == " + id + ";";
    return new Promise((resolve, reject) => {
        db.exec(sql, (err, row) => {
            if (err) {
                reject(err);
            } else {
                console.log(row);
                resolve('User updated!');
            }
        })
    });
}
