const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Fruit = require('./models/fruit.js');

app.use(express.json());

// CREATE - POST - /fruits
app.post('/fruits', async (req, res) => {
    try {
        const fruit = await Fruit.create(req.body);
        res.json({ fruit });
    } catch (error) {
        res.json({ error: error.message });
    }
});

// READ - GET - /fruits
app.get('/fruits', async (req, res) => {
    try {
        const foundFruits = await Fruit.find();
        res.json({ fruits: foundFruits });
    } catch (error) {
        res.json({ error: error.message });
    }
});

// READ - GET - /fruits/:fruitId
app.get('/fruits/:fruitId', async (req, res) => {
    try {
        const foundFruit = await Fruit.findById(req.params.fruitId);
        if (!foundFruit) {
            res.status(404);
            throw new Error('Fruit not found.');
        }
        res.json({ fruit: foundFruit });
    } catch (error) {
        res.json({ error: error.message });
    }
});

// DELETE - DELETE - /fruits/:fruitId
app.delete('/fruits/:fruitId', async (req, res) => {
    try {
        const foundFruit = await Fruit.findByIdAndDelete(req.params.fruitId);
        if (!foundFruit) {
            res.status(404);
            throw new Error('Fruit not found.');
        }
        res.status(204).end();
    } catch (error) {
        res.json({ error: error.message });
    }
});

// UPDATE - PUT - /fruits/:fruitId
app.put('/fruits/:fruitId', async (req, res) => {
    try {
        const foundFruit = await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);
        if (!foundFruit) {
            res.status(404);
            throw new Error('Fruit not found.');
        }
        const updatedFruit = await Fruit.findById(req.params.fruitId);
        res.json({ fruit: updatedFruit });
    } catch (error) {
        res.json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('The express app is ready!');
});