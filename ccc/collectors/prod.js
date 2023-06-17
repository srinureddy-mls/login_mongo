// Corrected import statement for Product model
const Product = require('./product'); // Provide the correct path to the product.js file




// Display products
const products = async (req, res, next) => {
  try {
    const products = await Product.find();
    // Add this line to check the retrieved products in the backend console
    if (products.length === 0) {
      return res.send({
        status: "success",
        message: "No products found",
        data: []
      });
    }
    return res.send({
      status: "success",
      message: "Successfully got list of products",
      data: products
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "An error occurred while fetching products",
      error: error.message
    });
  }
};


// Create new product
const createProduct = async (req, res, next) => {
  try {
    const { Product_Name, Product_cost, Person_age, Order_date } = req.body;
    const newProduct = new Product({
      Product_Name,
      Product_cost,
      Person_age,
      Order_date,
      Product_image: req.file.filename
    });

    await newProduct.save();
    res.json({
      message: "Successfully created product",
      status: "success"
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error: error.message // Send the error message in the response
    });
  }
};

// Delete product
const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Product.findByIdAndRemove(id);
    res.send({
      message: "Success"
    });
  } catch (error) {
    res.send({
      message: "An error occurred"
    });
  }
};

module.exports = { products, createProduct, deleteProduct };
