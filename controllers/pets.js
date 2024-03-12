const express = require('express');
const router = express.Router();

const Pet = require('../models/pet.js');

// CREATE - POST - /pets
router.post('/', async (req, res) => {
    try {
        const pet = await Pet.create(req.body);
        res.json({ pet });
    } catch (error) {
        res.json({ error: error.message });
    }
});

// READ - GET - /pets
router.get('/', async (req, res) => {
    try {
        const foundPets = await Pet.find();
        res.json({ pets: foundPets });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// READ - GET - /pets/:petId
router.get('/:petId', async (req, res) => {
    try {
        const foundPet = await Pet.findById(req.params.petId);
        if (!foundPet) {
            res.status(404);
            throw new Error('Pet not found.');
        }
        res.json({ pet: foundPet });
    } catch (error) {
        if (res.statusCode === 404) {
            res.json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

// DELETE - DELETE - /pets/:petId
router.delete('/:petId', async (req, res) => {
    try {
        const foundPet = await Pet.findByIdAndDelete(req.params.petId);
        if (!foundPet) {
            res.status(404);
            throw new Error('Pet not found.');
        }
        res.status(204).end();
    } catch (error) {
        if (res.statusCode === 404) {
            res.json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

// UPDATE - PUT - /pets/:petId
router.put('/:petId', async (req, res) => {
    try {
        const foundPet = await Pet.findByIdAndUpdate(req.params.petId, req.body, { new: true });
        if (!foundPet) {
            res.status(404);
            throw new Error('Pet not found.');
        }
        res.json({ pet: foundPet });
    } catch (error) {
        if (res.statusCode === 404) {
            res.json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

module.exports = router;