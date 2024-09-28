const express = require('express');
const router = express.Router();
const { getTokenAndSaveUser, getAllUsers, deleteUser } = require('../Controllers/usecontroler.js');
const { addTeamMember, getAllTeamMembers, deleteTeamMember } = require('../Controllers/teammembercontroller.js');

const User = require('../models/user.js'); // Make sure User is imported correctly

// Route to generate token and save user info
router.post('/get-token', getTokenAndSaveUser);

// Route to fetch users for admin panel
router.get('/admin/users', getAllUsers);

// Route to delete a user
router.delete('/admin/users/:id', deleteUser); 

// Route to show all team members
router.get('/admin/teammember', getAllTeamMembers);

// Route to add a new team member (POST request through Postman)
router.post('/admin/teammember', addTeamMember);

// Route to delete a team member
router.delete('/admin/teammember/:id', deleteTeamMember);

// Admin route
router.get('/admin', async (req, res) => {
    try {
        const users = await User.find(); // Fetch users from the database
        console.log('Fetched Users:', users); // Log the fetched users to the console
        res.render('admin', { users }); // Render the admin view with user data
    } catch (err) {
        console.error('Error fetching user data:', err.message); // Log the error message
        res.status(500).send('Error fetching user data'); // Send error response
    }
});

module.exports = router;
