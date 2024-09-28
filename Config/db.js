const mongoose = require('mongoose');

const connectDB = async () => { // Fix: Change the function name to match the import
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(`Error in MongoDB: ${error.message}`); // Improved error logging
    }
};

module.exports = connectDB;
