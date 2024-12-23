// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes'); // Import the routes
const cors = require('cors')
require('dotenv').config();


const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());
const corsOptions = {

    origin: ['http://localhost:5173'], // Allow only the frontend origin
    methods: ['GET', 'POST','PUT'], // Allowed methods

    
    allowedHeaders: ['Content-Type','Authorization'], // Allowed headers
  };
  app.use(cors(corsOptions));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Use the admin routes
app.use('/api', router);

// Start the server
app.listen(8000, () => {
  console.log('Backend is running on port 8000');
});
