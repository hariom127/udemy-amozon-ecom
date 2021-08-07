
const app = require('./app');
const connectDatabase = require('./config/database');
const dotenv = require('dotenv');
dotenv.config({path:'backend/config/config.env'});

// ----handel Uncaught exceptions------
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('shuting down server due to uncaughtException');;
    process.exit(1);
    
})

//-------connect to db-------
connectDatabase();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || PRODUCTION;


//---import mongoose db object----
//const mongoose = require('mongoose');



const server = app.listen(PORT, () => {
    console.log(`Server start on ${PORT} in ${process.env.NODE_ENV} MODE`)
})

// handel unhandel promise rejection
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('sutting down the server due to unhandledRejection promise');
    server.close(() => {
        process.exit(1);
    });
})
 