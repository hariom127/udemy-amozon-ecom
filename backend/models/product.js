const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxlength: [100, 'Product name can not exceed 100 characters'],
    },
    price: {
        type:Number,
        required: [true, 'Please enter product price'],
        trim: true,
        maxlength: [5, 'Product price can not exceed 5 characters'],
        default : 0.0
    },
    description: {
        type:String,
        required: [true, 'Please enter product description']
    },
    ratings: {
        type:Number,
        default:0
    },
    images: [
        {    
           public_id: {
               type:String,
               required: true
           },
           url: {
               type:String,
               required: true
           }
        }
    ],
    category: {
        type:String,
        required: [true, 'Please enter product category'],
        enum: {
            values: [
                'Elecronics',
                'Cameras',
                'Accessories',
                'Headphone',
                'Food',
                'Books',
                'Cloths/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home',
            ],
            message: 'Please select valied category for product'
        }
    },
    seller: {
        type: String,
        required: [true, 'Please enter product seller'] 
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        maxlength: [5, 'Product stock can not exceed 5'],
        default:0
    },
    numOfReviews: {
        type: Number,
        default:0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            }
            
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Product", productSchema);