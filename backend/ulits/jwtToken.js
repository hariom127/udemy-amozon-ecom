// create, send and save token in the cookie
const sendToken = (user, statusCode, res) => {
    //  create Jwt token
    const token = user.getJwtToken();

    // options for the cookie
    const options = {
        expires : new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000  // covert to millisecond
        ),
        // if that cookie is not httpOnly can be accessed by using JS code or in other word it not secure 
        httpOnly : true
    }
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user
    })

}
module.exports = sendToken;