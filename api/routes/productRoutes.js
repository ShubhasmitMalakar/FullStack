const mongoose = require("mongoose");

const Product = mongoose.model("products");

module.exports = (router) => {
    router.get('/api/products', async (req, res) => {
        console.log("GET PRODUCTS")
        const response = await Product.find();

        return res.send(response);
    });

    router.get('/api/product/:productID', async (req, res) => {
        console.log("GET PRODUCT")
  
        const response = await Product.findById(req.params.productID);

        console.log(response)
        return res.send(response);
    });
}
