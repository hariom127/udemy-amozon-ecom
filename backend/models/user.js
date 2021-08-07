const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'Please enter name'],
        trim: true,
        maxlength: [30, 'Name can not exceed 30 characters'],
    },
    email: {
        type:String,
        required: [true, 'Please enter email'],
        trim: true,
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email'],
    },
    password: {
        type:String,
        required: [true, 'Please enter password'],
        trim: true,
        minlength: [6, 'Password must have at least 6 characters'],
        select:false,
    },
    avatar: {
        public_id: {
            type:String,
            required: true
        },
        url: {
            type:String,
            required: true
        }
    },
    role: {
        type:String,
        default:'user'
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    
},{
    timestamps: true
})

// Encript Password before save
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
})

// Return JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({id: this.id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE_TIME})
}

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// generate reset password token
userSchema.methods.getResetPasswordToken = function () {
    // generate token 
    const resetToken = crypto.randomBytes(20).toString('hex');
    //has and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // set token expire timestamps
    this.resetPasswordExpire = Date.now() + 30*60*1000; //30min

    return resetToken;

}

module.exports = mongoose.model('User', userSchema);