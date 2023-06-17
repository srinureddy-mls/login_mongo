const express = require('express');
const router = express.Router();
const multer = require('multer');
const controller = require('../collectors/prod');
const path = require('path');



// Store the file in the given path
const storage = multer.diskStorage({
  destination: './login/public/Product_images/',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Image file upload
const upload = multer({
  storage: storage,
});

router.get('/products', controller.products);
router.post('/createproducts', upload.single('Product_image'), controller.createProduct);
router.delete('/deleteProduct/:id', controller.deleteProduct);

module.exports = router;
