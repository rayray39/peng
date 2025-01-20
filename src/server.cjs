const express = require('express');             // create the server
const fs = require('fs');                       // for reading and writing files
const path = require('path');                   // for working with files and directory paths
const cors = require('cors');

const app = express();
const PORT = 5000;

// middleware for CORS (cross origin resource sharing)
app.use(cors());

// Middleware
app.use(express.json());



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});