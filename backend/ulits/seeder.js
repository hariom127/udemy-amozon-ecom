const Product = require('../models/product');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const products = require('../data/products.json');
dotenv.config({path:'backend/config/config.env'});

connectDatabase();

const seedProduct = async () => {
    try {
        await Product.deleteMany();
        console.log('product deleted');

        await Product.insertMany(products);
        console.log('product inserted');
        process.exit();

    } catch (err) {
        console.log(err.message);
        process.exit();
    }
}

seedProduct();