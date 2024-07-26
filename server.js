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

// middleware 
app.use(express.urlencoded({ extended: false}));
app.use(methodOverride("_method"));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "public")));

// GET '/' - Homepage 
app.get('/', (req, res) => {
    res.render('index.ejs')
});

// GET '/fruits' - displays all fruits
app.get('/fruits', async (req, res) => {
    const allFruits = await Fruit.find()
    console.log(allFruits)

    res.render('fruits/index.ejs', { 
        fruits: allFruits 
    });
});

// GET '/fruits/new' - create new fruit
app.get('/fruits/new', (req, res) => {
    res.render('fruits/new.ejs')
});

// GET ''/fruits/:fruitId' - renders show page for fruit id
app.get('/fruits/:fruitId', async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render('fruits/show.ejs', {
        fruit: foundFruit,
    });
});


// POST '/fruits' - getting new fruit data
app.post('/fruits', async (req, res) => {
    if (req.body.isReadyToEat === 'on') {
        req.body.isReadyToEat = true
    } else {
        req.body.isReadyToEat = false
    }
    res.redirect('/fruits')

    await Fruit.create(req.body) 
});

// DELETE '/fruits/:fruitId' - delete fruit
app.delete('/fruits/:fruitId', async (req, res) => {
    await Fruit.findByIdAndDelete(req.params.fruitId); 
    res.redirect('/fruits')
});

// GET '/fruits/:fruitId/edit' - edit fruit properties
app.get('/fruits/:fruitId/edit', async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render('fruits/edit.ejs', {
        fruit: foundFruit,
    });

});

// PUT '/fruits/:fruitId' - update route
app.put('/fruits/:fruitId', async (req, res) => {
    if (req.body.isReadyToEat === 'on'){
        req.body.isReadyToEat = true;
    } else{
        req.body.isReadyToEat = false;
    }
    
    await Fruit.findByIdAndUpdate(req.params.fruitId, req.body)
    res.redirect(`/fruits/${req.params.fruitId}`)
});

app.listen(3000, () => {
    console.log("Listening on port 3000")
});