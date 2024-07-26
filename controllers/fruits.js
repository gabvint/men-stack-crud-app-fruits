const Fruit = require('../models/fruit.js');

const index = async (req, res) => {
    const allFruits = await Fruit.find()
    console.log(allFruits)

    res.render('fruits/index.ejs', { 
        fruits: allFruits 
    });
}

const show =  async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render('fruits/show.ejs', {
        fruit: foundFruit,
    });
}

const newFruit = (req, res) => {
    res.render('fruits/new.ejs')
}

module.exports = {
    index, 
    new: newFruit, 
    show,
}