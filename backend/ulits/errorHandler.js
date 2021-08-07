class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    //  Error.captureStackTrace is node js defauld error handling method
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;
