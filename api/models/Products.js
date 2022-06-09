const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema({
    id: String,
    title: String,
    description: String,
    price: String,
    discountPercentage: String,
    rating: String,
    stock: String,
    brand: String,
    category: String,
    thumbnail: String,
    images: [String]
});

mongoose.model("products", productSchema);