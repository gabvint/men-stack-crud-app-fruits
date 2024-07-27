// import modules and connection to database

const dotenv = require('dotenv'); // requiring package
dotenv.config(); // loads the environments variables from .env file
const express = require('express');
const mongoose = require('mongoose'); 
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');

const app = express();

// connect to MongoDB using the connection string in the .env file 
mongoose.connect(process.env.MONGO_URI);

// log connection status to the terminal on start
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

// import the fruit model
const Fruit = require('./models/fruit.js');

// import controller function
const fruitsController = require('./controllers/fruits.js')

// middleware 
app.use(express.urlencoded({ extended: false}));
app.use(methodOverride("_method"));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "public")));

// GET '/' - Homepage 
app.get('/', (req, res) => {
    res.render('index.ejs')
});


app.get('/fruits', fruitsController.index);

app.get('/fruits/new', fruitsController.new);

app.get('/fruits/:fruitId', fruitsController.show);

app.post('/fruits', fruitsController.add);

app.delete('/fruits/:fruitId', fruitsController.deleteFruit);

app.get('/fruits/:fruitId/edit', fruitsController.editFruit);

app.put('/fruits/:fruitId', fruitsController.updateFruit);

app.listen(3000, () => {
    console.log("Listening on port 3000")
});