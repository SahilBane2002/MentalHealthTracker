const express = require('express');
const connectDB = require('./config/database');
require('dotenv').config();

connectDB();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes

app.get('/', (req, res) => {
    res.send('Mental Health App API is Running');
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`MongoDB URI: ${process.env.MONGO_URI}`);
});

