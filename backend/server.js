const express = require('express')
const dotenv = require('dotenv');
const connectDB = require('./config');

const app = express();
dotenv.config()

connectDB()

const PORT = process.env.PORT

app.listen(PORT, console.log("server is running on the port 5000"))