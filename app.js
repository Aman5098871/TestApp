// Import necessary modules
const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user'); // Import user model

// Set up the view engine to use EJS
app.set("view engine", 'ejs');

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for rendering the home page
app.get('/', (req, res) => {
    res.render("index"); // Render the 'index' view
});

// Route for reading and displaying all users
app.get('/read', async (req, res) => {
    try {
        let users = await userModel.find(); // Fetch all users from the database
        res.render("read", { users }); // Render 'read' view and pass users data
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Error fetching users"); // Send error response
    }
});

// Route for editing a user by ID
app.get('/edit/:userid', async (req, res) => {
    try {
        let user = await userModel.findOne({ _id: req.params.userid }); // Fetch user by ID

        // Check if user was found
        if (!user) {
            return res.status(404).send("User not found"); // Send 404 response if user not found
        }

        res.render("edit", { user }); // Render 'edit' view and pass user data
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).send("Error fetching user"); // Send error response
    }
});

// Route for updating a user by ID
app.post('/update/:userid', async (req, res) => {
    try {
        let { name, email, image } = req.body; // Destructure data from request body
        let user = await userModel.findOneAndUpdate(
            { _id: req.params.userid },
            { name, email, image },
            { new: true }
        ); // Update user data

        // Check if user was updated
        if (!user) {
            return res.status(404).send("User not found"); // Send 404 response if user not found
        }

        res.redirect("/read"); // Redirect to 'read' page after successful update
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Error updating user"); // Send error response
    }
});

// Route for deleting a user by ID
app.get('/delete/:id', async (req, res) => {
    try {
        let user = await userModel.findOneAndDelete({ _id: req.params.id }); // Find and delete user by ID

        // Check if user was deleted
        if (!user) {
            return res.status(404).send("User not found"); // Send 404 response if user not found
        }

        res.redirect("/read"); // Redirect to 'read' page after successful deletion
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send("Error deleting user"); // Send error response
    }
});

// Route for creating a new user
app.post('/create', async (req, res) => {
    try {
        let { name, email, image } = req.body; // Destructure data from request body
        await userModel.create({ name, email, image }); // Create a new user in the database
        res.redirect('/read'); // Redirect to 'read' page after successful creation
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user"); // Send error response
    }
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log("Server running on Port 3000"); // Log message indicating server is running
});
 