const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  _productId: { type: Schema.Types.ObjectId, ref: "products" },
  price: Number,
});

const orderSchema = new Schema({
  _userId: { type: Schema.Types.ObjectId, ref: "users" },
  products: [productSchema],
  orderId: String,
  paymentId: String,
  totalPrice: Number,
  paymentStatus: { type: String, default: "PENDING" },
});
mongoose.model("orders", orderSchema);
