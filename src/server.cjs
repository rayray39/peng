require("dotenv").config({ path: '.env.local' });                     // Load env variables
const express = require('express');             // create the server
const fs = require('fs');                       // for reading and writing files
const path = require('path');                   // for working with files and directory paths
const cors = require('cors');
const sqlite3 = require("sqlite3").verbose();   // sqlite3 database
const dbPath = path.resolve(__dirname, '../data/database.db'); // Adjust 'database.db' as needed

const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const app = express();
const PORT = 5000;

// middleware for CORS (cross origin resource sharing)
app.use(cors());

// Middleware
app.use(express.json());

// Cloudinary API
if (process.env.CLOUDINARY_URL) {
    console.log("Successfully connected to Cloudinary.");
}

// Configure Multer Storage for Cloudinary
const storage = multer.memoryStorage(); // Store files in memory before uploading
const upload = multer({ storage });


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
                password TEXT NOT NULL,
                bio TEXT,
                hobbies TEXT
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
        return res.status(201).json({ 
            message: "User created successfully!", 
            user: {
                id: this.lastID,
                username: username
            }
        });
    });
});

// retrieves user credentials from client-side, verfiy them, returns back the logged in user
app.post("/log-user-in", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(403).json({ error: 'Username or Password missing.' });
    }

    // validate user identity
    const query = `SELECT id, username, password FROM users WHERE username = ?`;

    db.get(query, [username], (err, row) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ error: 'Database error.' });
        }

        if (!row) {
            return res.status(404).json({ error: 'User not found.' });
        }

        if (row.password !== password) {
            return res.status(403).json({ error: 'Incorrect Password.' });
        }

        // Respond with user data, excluding sensitive fields
        res.status(200).json({
            message: 'Successfully logged in.',
            user: {
                id: row.id,
                username: row.username
            }
        });
    });
})

// updates currently logged in user's bio
app.post('/save-bio', (req, res) => {
    const { currentUser, bio } = req.body;

    if (!bio) {
        return res.status(400).json({ error: 'Missing bio.' });
    }
    if (!currentUser) {
        return res.status(400).json({ error: 'User not logged in.' });
    }

    const query = `
        UPDATE users
        SET bio = ?
        WHERE id = ? AND username = ?
    `;

    db.run(query, [bio, currentUser.id, currentUser.username], function (err) {
        if (err) {
            console.error("Error updating bio:", err);
            return res.status(500).json({ error: "Database error." });
        }
    
        if (this.changes === 0) {
            return res.status(404).json({ error: "User not found." });
        }
    
        res.status(200).json({
            message: "Bio updated successfully!",
        });
    })

})

// updates currently logged in user's selected hobbies
app.post('/save-hobbies', (req, res) => {
    const { currentUser, selectedHobbies } = req.body;

    if (!selectedHobbies) {
        return res.status(400).json({ error: 'Missing hobbies.' });
    }
    if (!currentUser) {
        return res.status(400).json({ error: 'User not logged in.' });
    }

    const query = `
        UPDATE users
        SET hobbies = ?
        WHERE id = ? AND username = ?
    `;

    db.run(query, [selectedHobbies.join(","), currentUser.id, currentUser.username], function (err) {
        if (err) {
            console.error("Error updating hobbies:", err);
            return res.status(500).json({ error: "Database error." });
        }
    
        if (this.changes === 0) {
            return res.status(404).json({ error: "User not found." });
        }
    
        res.status(200).json({
            message: "Hobbies updated successfully!",
        });
    })
})

// API endpoint to handle multiple image uploads (to Cloudinary)
app.post("/upload-to-cloud", upload.array("images", 5), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
    }

    const imageUrls = []; // Array to store the image URLs

    // Upload each image to Cloudinary using a Promise
    Promise.all(
        req.files.map((file) => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader
                    .upload_stream(
                        { resource_type: "auto" }, // auto handles images and other media types
                        (error, result) => {
                            if (error) {
                                reject(error); // If there's an error, reject the promise
                            } else {
                                imageUrls.push(result.secure_url); // Push the image URL to the array
                                resolve();
                            }
                        }
                    )
                    .end(file.buffer); // Upload the file buffer to Cloudinary
            });
        })
    )
    .then(() => {
        // Once all images are uploaded, send the URLs in the response
        res.json({ imageUrls });
    })
    .catch((err) => {
        console.error("Error uploading images:", err);
        res.status(500).json({ error: "Image upload failed" });
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