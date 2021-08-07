const ErrorHandler = require('../ulits/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal server error';

    if(process.env.NODE_ENV == 'DEVELOPMENT')
    {
        res.status(err.statusCode).json({
            success: false,
            errorMessage: err.message,
            error: err,
            stack: err.stack
        })   
    }
    if(process.env.NODE_ENV == 'PRODUCTION'){
        let error = { ...err }
        error.message = err.message;

        // wrong mongo object id error
        if(err.name == 'CastError'){
            const message = `Resource not found. Invalid: ${err.path}`;
            error = new ErrorHandler(message, 400)
        }

        // Handling mongoose validation error
        if(err.name == 'ValidationError'){
            const message = Object.values(err.errors).map(value => value.message);
            error = new ErrorHandler(message, 400)
        }

         // Handling mongoose duplicate key error
         if(err.code == 1100){
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
            error = new ErrorHandler(message, 400)
        }

        // Handling wrong JWT token
         if(err.name == 'JsonWebTokenError'){
            const message = 'JWT is Invalied, try again!';
            error = new ErrorHandler(message, 400)
        }

        // Handling Expired JWT token
        if(err.name == 'JsonExpiredError'){
            const message = 'JWT is Expired, try again!';
            error = new ErrorHandler(message, 400)
        }

        res.status(error.statusCode).json({
            success: false,
            error: error.message || 'Internal Server Error'
        })
    }


    
}
