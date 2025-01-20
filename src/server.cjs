const express = require('express');             // create the server
const fs = require('fs');                       // for reading and writing files
const path = require('path');                   // for working with files and directory paths
const cors = require('cors');
const sqlite3 = require("sqlite3").verbose();   // sqlite3 database

const app = express();
const PORT = 5000;

// middleware for CORS (cross origin resource sharing)
app.use(cors());

// Middleware
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database("../data/database.db", (err) => {
    if (err) {
      console.error("Failed to connect to database:", err.message);
    } else {
      console.log("Connected to SQLite database.");
    }
});

// Example route to test database
app.get("/test-db", (req, res) => {
    db.serialize(() => {
        // Create a test table (if it doesn't exist)
        db.run(
            "CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY, name TEXT)",
            (err) => {
            if (err) {
                res.status(500).send("Error creating table: " + err.message);
                return;
            }
            }
        );
    
        // Insert a test row
        db.run("INSERT INTO test (name) VALUES (?)", ["John Doe"], (err) => {
            if (err) {
            res.status(500).send("Error inserting data: " + err.message);
            return;
            }
        });
    
        // Query the table
        db.all("SELECT * FROM test", [], (err, rows) => {
            if (err) {
            res.status(500).send("Error querying database: " + err.message);
            return;
            }
            res.json(rows); // Send the rows as a response
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});