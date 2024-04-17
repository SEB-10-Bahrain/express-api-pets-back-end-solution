const express = require('express');
const router = express.Router();

const Pet = require('../models/pet.js');

// CREATE - POST - /pets
router.post('/', async (req, res) => {
    try {
        const createdPet = await Pet.create(req.body);
        res.json(createdPet);
    } catch (error) {
        console.log(error.message);
    }
});

// READ - GET - /pets
router.get('/', async (req, res) => {
    try {
        const foundPets = await Pet.find();
        res.json(foundPets);
    } catch (error) {
        console.log(error.message);
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
        res.json(foundPet);
    } catch (error) {
        console.log(error.message)
    }
});

// DELETE - DELETE - /pets/:petId
router.delete('/:petId', async (req, res) => {
    try {
        const deletedPet = await Pet.findByIdAndDelete(req.params.petId);
        if (!foundPet) {
            res.status(404);
            throw new Error('Pet not found.');
        }
        res.json(deletedPet);
    } catch (error) {
        console.log(error.message)
    }
});

// UPDATE - PUT - /pets/:petId
router.put('/:petId', async (req, res) => {
    try {
        const updatedPet = await Pet.findByIdAndUpdate(req.params.petId, req.body, { new: true });
        if (!foundPet) {
            res.status(404);
            throw new Error('Pet not found.');
        }
        res.json(updatedPet);
    } catch (error) {
        console.log(error.message)
    }
});

module.exports = router;
