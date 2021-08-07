// checks if user is authenticated or not
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../ulits/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  // get tokren from cookie
  const { token } = req.cookies;
  // console.log(token);
  if (!token) {
    return next(new ErrorHandler("Login first to access this"));
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decode.id);

  next();
});

// handling Roles
exports.autherizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    return next();
  };
};
