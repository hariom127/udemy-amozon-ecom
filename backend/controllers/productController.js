const Product = require('../models/product');
const ErrorHandler = require('../ulits/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../ulits/apiFeatures');


/*
| get all product form products
| /api/v1/products?keyword=apple
*/
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
    // return next(new ErrorHandler('my error', 400))
    const resultPerPage = 4;
    const productsCount = await Product.countDocuments();
    const apiFeatures = new ApiFeatures(Product.find(), req.query)
                        .search()
                        .filter()
                        .pagination(resultPerPage);

    const products = await apiFeatures.query;
  
    res.status(200).json({
        success:true,
        message: "data get successfully.",
        productsCount,
        products,
        "resPerPage": resultPerPage
    })
  
    
}),

exports.newProduct = catchAsyncErrors(async (req,res,next) => {
    
    req.body.user = req.user.id;
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
}),

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if(!product){
       return next(new ErrorHandler('Product not found', 404))
    }else{
        res.status(200).json({
            success:true,
            message: "get data successfully",
            product
        })
    }    
}),

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if(!product){
       return res.status(404).json({
            success:false,
            message: "not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success:true,
        message: "updated successfully",
        product
    })
}),

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
       return res.status(404).json({
            success:false,
            message: "not found"
        })
    }
    await product.remove();
    return res.status(200).json({
        success:true,
        message: "Deleted Successfully"
    })
})

