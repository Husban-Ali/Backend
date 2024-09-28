const TeamMember = require('../models/teammember.js');

exports.getAllTeamMembers = async (req, res) => {
    try {
        const teamMembers = await TeamMember.find(); // Fetch all team members from the database
        res.render('teammember', { teamMembers }); // Render the team member view with data
    } catch (err) {
        console.error('Error fetching team members:', err);
        res.status(500).json({ message: 'Error fetching team members', error: err.message });
    }
};

exports.addTeamMember = async (req, res) => {
    const { name, email, expertise } = req.body; 
    
    try {
        // Validate presence of fields
        if (!name || !email || !expertise) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newTeamMember = new TeamMember({ name, email, expertise });
        await newTeamMember.save(); 
        
        // Redirect to the team member page after adding
        res.redirect('/admin/teammember'); 
    } catch (err) {
        console.error('Error adding team member:', err);
        res.status(500).json({ message: 'Error adding team member', error: err.message });
    }
};

exports.deleteTeamMember = async (req, res) => {
    const { id } = req.params; // Get the team member ID from the request parameters

    try {
        const teamMember = await TeamMember.findById(id); // Find the team member by ID
        
        // Check if the team member exists
        if (!teamMember) {
            return res.status(404).json({ message: 'Team member not found' });
        }

        // Delete the team member from the database
        await TeamMember.findByIdAndDelete(id);
        
        // Redirect back to the team member page after deletion
        return res.redirect('/admin/teammember'); 
    } catch (err) {
        console.error('Error deleting team member:', err);
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};
