require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db.js');
const methodOverride = require('method-override');
const useroutes = require('./routes/useroutes.js')


const app = express();

app.set('view engine', 'ejs');
// app.use(express.urlencoded({ extended: true })); // To handle form data
app.use(methodOverride('_method')); 

app.use(express.json());

// Connect to MongoDB
connectDB();

// Use user routes
app.use('/', useroutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
