// Import Mongoose module
const mongoose = require('mongoose');

// Connect to MongoDB (Make sure MongoDB is running on your local machine)
mongoose.connect("mongodb://127.0.0.1:27017/testapp1", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected successfully"))
.catch((error) => console.error("MongoDB connection failed:", error));

// Define the schema for the User collection
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },   // Name of the user (required field)
    email: { type: String, required: true },  // Email of the user (required field)
    image: { type: String }                   // URL or path to the user's image (optional field)
});

// Export the model based on the schema
module.exports = mongoose.model('User', UserSchema);
