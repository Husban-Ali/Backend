require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const connectDB = require('./config/db.js');
const useroutes = require('./routes/useroutes.js')
// const path = require('path')

const app = express();
app.set('view engine', 'ejs');

// app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

// Connect to MongoDB
connectDB();

// Use user routes
app.use('/', useroutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
