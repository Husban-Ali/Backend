const User = require('../models/user.js');
const nodemailer = require('nodemailer');

// Generate sequential token and save user info
exports.getTokenAndSaveUser = async (req, res) => {
    const { firstName, lastName, email, description } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use.' });
        }

        // Get the current count of users to create a token
        const userCount = await User.countDocuments();
        const token = userCount + 1; // Sequential token

        // Save user info to the database
        const newUser = new User({ firstName, lastName, email, description, token });
        await newUser.save();

        // Send email with token
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL, // Use environment variable
                pass: process.env.EMAIL_PASSWORD,  // Use environment variable
            },
        });

        const mailOptions = {
            from: process.env.EMAIL, // Use environment variable
            to: email,
            subject: 'Your Token',
            text: `Thank you for your response. Your token number is: ${token}. We will contact you in 24 hours.`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Token generated and email sent!', token });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get all users for the admin panel
exports.getAllUsers = async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json(users);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
};

module.exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;  // Extract the ID from the request parameters

        // Find the user by ID
        const user = await User.findById(id);

        // If user doesn't exist, return 404
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete the user from the database
        await User.findByIdAndDelete(id);

        // Send success response
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};