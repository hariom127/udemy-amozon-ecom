const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, autherizeRoles } = require('../middleware/auth');

const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/productController');

router.route('/products').get(getProducts);

router.route('/admin/product/new').post(isAuthenticatedUser, autherizeRoles('admin'), newProduct);

router.route('/product/:id').get(getSingleProduct);
router.route('/admin/product/:id')
                            .put(isAuthenticatedUser, autherizeRoles('admin'), updateProduct)
                            .delete(isAuthenticatedUser, autherizeRoles('admin'), deleteProduct);


module.exports = router;