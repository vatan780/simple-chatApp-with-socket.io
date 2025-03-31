const express = require('express')
const dotenv = require('dotenv');
const connectDB = require('./config/db');


const userRoutes = require('./routes/userRoutes');
const chatRoutes = require("./routes/chatRoutes")
const { notFound, errorHandler } = require('./middleware/errorMiddleWare');

const app = express();
dotenv.config()

connectDB()

app.use(express.json())


const PORT = process.env.PORT

// app.use(morgan('combined'));
// app.use((req, res, next) => {
//     console.log(`Method: ${req.method}`);
//     console.log(`URL: ${req.url}`);
//     // console.log('Headers:', req.headers);
//     // Collect request body data if needed
//     let body = [];
//     req.on('data', chunk => {
//       body.push(chunk);
//     }).on('end', () => {
//       body = Buffer.concat(body).toString();
//       console.log('Body:', body);
//       next();
//     });
//   });
app.use("/api/user",userRoutes)
app.use("/api/chat",chatRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, console.log("server is running on the port 5000"))