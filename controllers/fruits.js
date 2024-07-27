const Fruit = require('../models/fruit.js');


// GET '/fruits' - displays all fruits
const index = async (req, res) => {
    const allFruits = await Fruit.find()
    console.log(allFruits)

    res.render('fruits/index.ejs', { 
        fruits: allFruits 
    });
}

// GET ''/fruits/:fruitId' - renders show page for fruit id
const show =  async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render('fruits/show.ejs', {
        fruit: foundFruit,
    });
}

// GET '/fruits/new' - create new fruit
const newFruit = (req, res) => {
    res.render('fruits/new.ejs')
}

// POST '/fruits' - getting new fruit data
const add = async (req, res) => {
    if (req.body.isReadyToEat === 'on') {
        req.body.isReadyToEat = true
    } else {
        req.body.isReadyToEat = false
    }
    res.redirect('/fruits')

    await Fruit.create(req.body) 
}

// DELETE '/fruits/:fruitId' - delete fruit
const deleteFruit = async (req, res) => {
    await Fruit.findByIdAndDelete(req.params.fruitId); 
    res.redirect('/fruits')
}

// GET '/fruits/:fruitId/edit' - edit fruit properties
const editFruit = async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render('fruits/edit.ejs', {
        fruit: foundFruit,
    });

}

// PUT '/fruits/:fruitId' - update route
const updateFruit = async (req, res) => {
    if (req.body.isReadyToEat === 'on'){
        req.body.isReadyToEat = true;
    } else{
        req.body.isReadyToEat = false;
    }
    
    await Fruit.findByIdAndUpdate(req.params.fruitId, req.body)
    res.redirect(`/fruits/${req.params.fruitId}`)
}

module.exports = {
    index, 
    new: newFruit, 
    show,
    add,
    deleteFruit,
    editFruit,
    updateFruit
}