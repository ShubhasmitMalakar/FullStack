const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  _productId: { type: Schema.Types.ObjectId, ref: "products" },
});

const cartSchema = new Schema({
  _userId: { type: Schema.Types.ObjectId, ref: "users" },
  products: [productSchema],
});
mongoose.model("carts", cartSchema);
