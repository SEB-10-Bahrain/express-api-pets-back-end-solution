const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors')
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan')


const petRouter = require('./controllers/pets.js');

mongoose.connect(process.env.DATABASE_URL);

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))

app.use('/pets', petRouter);

app.listen(3000, () => {
    console.log('The express app is ready!');
});