// import modules and connection to database

const dotenv = require('dotenv'); // requiring package
dotenv.config(); // loads the environments variables from .env file
const express = require('express');
const mongoose = require('mongoose'); 

const app = express();

// connect to MongoDB using the connection string in the .env file 
mongoose.connect(process.env.MONGO_URI);

// log connection status to the terminal on start
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

app.get('/', async (req, res) => {
    res.render('index.ejs')
});

app.listen(3000, () => {
    console.log("Listening on port 3000")
});