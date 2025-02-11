require("dotenv").config({ path: '.env.local' });                     // Load env variables
const express = require('express');             // create the server
const fs = require('fs');                       // for reading and writing files
const path = require('path');                   // for working with files and directory paths
const cors = require('cors');
const sqlite3 = require("sqlite3").verbose();   // sqlite3 database
const dbPath = path.resolve(__dirname, '../data/database.db'); // Adjust 'database.db' as needed

const multer = require("multer");
const { Readable } = require("stream");
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
    console.log("---------------------------------------");
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

    // Create a 'user_images' table to store the image URLs
    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS user_images (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                image_url TEXT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `, (err) => {
                if (err) {
                    console.error("Error creating user_images table:", err.message);
                } else {
                    console.log("user_images table created or already exists.");
                }
        });
    });

    // Create a 'user_likes' table to keep track of the user_ids that were liked by a user
    db.serialize(() => {
        db.run(
            `CREATE TABLE IF NOT EXISTS user_likes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            liked_user_id INTEGER NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (liked_user_id) REFERENCES users(id),
            UNIQUE (user_id, liked_user_id)
            )`,
            (err) => {
                if (err) {
                    console.error("Error creating user_likes table:", err);
                } else {
                    console.log("user_likes table created or already exists.");
                }
            }
        )
    });

    // db.serialize(() => {
    //     db.run(
    //         `DROP TABLE user_likes`,
    //         (err) => {
    //             if (err) {
    //                 console.error("Error dropping user_likes table:", err);
    //             } else {
    //                 console.log("user_likes table dropped.");
    //             }
    //         }
    //     )
    // })
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

// Function to upload a single image to Cloudinary using a Promise
const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "user_images" }, // Cloudinary folder
            (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url); // Return Cloudinary URL
            }
        );
        Readable.from(fileBuffer).pipe(uploadStream); // Convert buffer to stream and upload
    });
};

// API endpoint to handle multiple image uploads (to Cloudinary and database)
app.post("/upload-to-cloud", upload.array("images", 3), async (req, res) => {
    try {
        const files = req.files;            // Get uploaded files from request
        const userId = req.body.userId;     // Assume user ID is sent in request body

        if (!files || files.length === 0) {
            return res.status(400).json({ error: "No files uploaded" });
        }

        // Upload all images to Cloudinary in parallel
        const imageUrls = await Promise.all(files.map(file => uploadToCloudinary(file.buffer)));

        // Insert uploaded image URLs into SQLite
        const insertQuery = `INSERT INTO user_images (user_id, image_url) VALUES (?, ?)`;

        db.serialize(() => {
            const stmt = db.prepare(insertQuery);
            imageUrls.forEach(url => {
                stmt.run(userId, url);
            });
            stmt.finalize();
        });

        res.json({ message: "Images uploaded successfully", imageUrls });
    } catch (error) {
        console.error("Error uploading images:", error);
        res.status(500).json({ error: "Image upload failed" });
    }
});

// returns all the data (firstName, lastName, bio, hobbies) about the currently logged in user
app.get('/:user_id/data', (req, res) => {
    const userId = req.params.user_id;

    if (!userId) {
        return res.status(400).json({ error: 'Missing user id.' });
    }

    const query = 'SELECT firstName, lastName, bio, hobbies FROM users WHERE id = ?';

    db.get(query, [userId], (err, row) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ error: "Unable to retrieve user data." });
        }

        if (!row) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ userData: row, message: 'Successfully retrieved user data.' });
    })
})

// returns all the imageUrls uploaded by the currently logged in user
app.get('/:user_id/data-imageUrls', (req, res) => {
    const userId = req.params.user_id;

    if (!userId) {
        return res.status(400).json({ error: 'Missing user id.' });
    }

    const query = 'SELECT image_url FROM user_images WHERE user_id = ?';

    db.all(query, [userId], (err, rows) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ error: "Unable to retrieve user image urls." });
        }

        if (!rows) {
            return res.status(404).json({ error: "User not found" });
        }

        // Extract just the image URLs from the result set
        const imageUrls = rows.map(row => row.image_url);

        res.status(200).json({ imageUrls: imageUrls, message: 'Successfully retrieved user image urls.' });
    })
})

// returns all user ids in the database
app.get('/all-userIds', (req, res) => {
    const query = "SELECT * FROM users";

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error("Error retrieving user IDs:", err);
            return res.status(500).json({ error: "Database error." });
        }

        // Extract just the ids from the result set
        const rowIds = rows.map(row => row.id);

        // Respond with all user ids as JSON
        res.status(200).json({ userIds: rowIds });
    })
})

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

// returns all uploaded images of particular user
app.get('/images/:userId', (req, res) => {
    const userId = req.params.userId;

    db.all(
        'SELECT * FROM user_images WHERE user_id = ?',
        [userId],
        (err, rows) => {
            if (err) {
                console.error("Error fetching images:", err.message);
                return res.status(500).json({ error: "Error fetching images" });
            }
            res.json({ images: rows });
        }
    );
})

// to delete all the images (in database) for currently logged in user
app.delete('/delete-all-images', (req, res) => {
    const { currentUser } = req.body;

    if (!currentUser) {
        return res.status(400).json({ error:"User not logged in" });
    }

    const query = 'DELETE FROM user_images WHERE user_id = ?';

    db.run(query, [currentUser.id], function (err) {
        if (err) {
            console.error("Error deleting images:", err);
            return res.status(500).json({ error: "Database error." });
        }
    
        res.status(200).json({
            message: "Images deleted successfully!",
        });
    })
})

// for creating fake accounts, by fetching images directly from Cloudinary and inserting into database
app.post('/get-from-cloud', (req, res) => {
    const { currentUser, cloudImageUrls } = req.body;

    if (!currentUser) {
        return res.status(400).json({ error:"User not logged in" });
    }
    if (!cloudImageUrls) {
        return res.status(400).json({ error:"No cloud urls." });
    }

    const userId = currentUser.id;

     // Insert uploaded image URLs into SQLite
     const insertQuery = 'INSERT INTO user_images (user_id, image_url) VALUES (?, ?)';

     db.serialize(() => {
        const stmt = db.prepare(insertQuery);
        cloudImageUrls.forEach(url => {
            stmt.run(userId, url);
        });
        stmt.finalize();
    });

    return res.status(200).json({ message: "Images uploaded (fake) successfully", cloudImageUrls });
})

// adds likedUserId to the list of liked user ids of the current user
app.post('/like-user', (req, res) => {
    const { currentUser, likedUserId } = req.body;

    if (!currentUser) {
        return res.status(400).json({ error:"User not logged in" });
    }
    if (!likedUserId) {
        return res.status(400).json({ error:"No liked user id." });
    }

    const query = 'INSERT INTO user_likes (user_id, liked_user_id) VALUES (?, ?)'

    db.run(query, [currentUser.id, likedUserId], function (err) {
        if (err.code === "SQLITE_CONSTRAINT") {
            return res.status(400).json({ error: `userId: ${likedUserId} already liked by ${currentUser.username}` });
        }
        if (err) {
            console.error("Error adding liked_used_id to user_likes:", err);
            return res.status(500).json({ error: "Database error." });
        }
    
        res.status(200).json({
            message: "Successfully added likedUserId to currentUser's list.",
        });
    })
})

// gets all the liked user ids of a user
app.get('/:userId/liked-users', (req, res) => {
    const userId = req.params.userId;

    if (!userId) {
        return res.status(400).json({ error: 'Missing user id.' });
    }

    const query = 'SELECT liked_user_id FROM user_likes WHERE user_id = ?';

    db.all(query, [userId], function (err, rows) {
        if (err) {
            console.error(`Error retrieving liked_used_ids for userId: ${userId}:`, err);
            return res.status(500).json({ error: "Database error." });
        }
    
        res.status(200).json({
            userId: userId,
            likedUserIds: rows
        });
    })
})

// delete the list of liked user ids from logged in user, for debugging
app.delete('/:userId/delete-liked-users', (req, res) => {
    const userId = req.params.userId;

    if (!userId) {
        return res.status(400).json({ error: 'Missing user id.' });
    }

    const query = 'DELETE FROM user_likes WHERE user_id = ?';

    db.run(query, [userId], function (err) {
        if (err) {
            console.error("Error deleting liked user ids:", err);
            return res.status(500).json({ error: "Database error." });
        }
    
        res.status(200).json({
            message: "Liked user ids deleted successfully!",
        });
    })
})


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log("---------------------------------------");
});