const express = require('express');             // create the server
const fs = require('fs');                       // for reading and writing files
const path = require('path');                   // for working with files and directory paths
const cors = require('cors');
const sqlite3 = require("sqlite3").verbose();   // sqlite3 database
const dbPath = path.resolve(__dirname, '../data/database.db'); // Adjust 'database.db' as needed

const app = express();
const PORT = 5000;

// middleware for CORS (cross origin resource sharing)
app.use(cors());

// Middleware
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error("Failed to connect to database:", err.message);
    } else {
      console.log("Connected to SQLite database.");
    }

    // Create the "users" table if it doesn't exist
    db.serialize(() => {
        db.run(
            `CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                firstName TEXT NOT NULL,
                lastName TEXT NOT NULL,
                username TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            )`,
            (err) => {
                if (err) {
                    console.error("Error creating users table:", err);
                } else {
                    console.log("Users table created or already exists.");
                }
            }
        )
    })
});

// create a new user account - add new row of user data into database
app.post("/create-new-account", (req, res) => {
    const { firstName, lastName, username, password } = req.body;

    if (!firstName || !lastName ||
        !username || !password
    ) {
        return res.status(400).json({ error: "Missing fields for creating account." });
    }

    // Insert user into database
    const query = `INSERT INTO users (firstName, lastName, username, password) VALUES (?, ?, ?, ?)`;
    db.run(query, [firstName, lastName, username, password], function (err) {
        if (err) {
            if (err.code === "SQLITE_CONSTRAINT") {
                return res.status(400).json({ error: "Username already exists." });
            }
            console.error("Error inserting user:", err);
            return res.status(500).json({ error: "Database error." });
        }

        // Respond with success
        return res.status(201).json({ message: "User created successfully!", userId: this.lastID });
    });
});

// returns all users in the database
app.get('/all-users', (req, res) => {
    const query = "SELECT * FROM users";

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error("Error retrieving users:", err);
            return res.status(500).json({ error: "Database error." });
        }

        // Respond with all users as JSON
        res.status(200).json({ users: rows });
    })
})


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});