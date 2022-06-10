const axios = require("axios");
const express = require("express");
const mongoose = require("mongoose");
const RazorPay = require("razorpay");
const CryptoJS = require("crypto-js");

// ==== IMPORT MODELS ====
const Cart = mongoose.model("carts");
const Order = mongoose.model("orders");
const Product = mongoose.model("products");

const keys = require("../config/keys");

module.exports = (router) => {
  // ====================
  // ==== GET ORDERS ====
  // ====================
  router.get("/api/orders", async (req, res) => {
    console.log("=== GET ORDERS ===\n Date: ", new Date());
    try {
      const orderData = await Order.find().populate("products._productId");
      return res.json(orderData);
    } catch (err) {
      console.log("=== ERROR  GET ORDERS ====\n", err.message);
      res.status(500).send("Server Error");
    }
  });

  // =======================
  // ==== ADD NEW ORDER ====
  // =======================
  router.get("/api/add/order", async (req, res) => {
    console.log("=== ADD ORDERS ===\n Date: ", new Date());
    // const { cartId } = req.body;
    const sum = (previous, current) => previous + current.price;
    try {
      const cartData = await Cart.findOne().populate("products._productId");
      console.log("CARTDATA:", cartData);
      const orderItems = cartData.products.map((data, i) => ({
        _productId: data._productId._id,
        price: parseFloat(data._productId.price),
      }));
      console.log("ORDERITEMS: ", orderItems);

      const newOrder = Order({
        products: orderItems,
        totalPrice: orderItems.reduce(sum, 0),
      });

      const order = await newOrder.save();

      // FIRE RAZORPAY ORDERS API TO GET ORDER_ID
      var instance = new RazorPay({
        key_id: keys.razorPayApiKey,
        key_secret: keys.razorPaySecretKey,
      });
      var options = {
        amount: (newOrder.totalPrice * 100).toFixed(0), // amount in the smallest currency unit
        currency: "INR",
      };

      instance.orders.create(options, async function (err, data) {
        console.log("ORDER: ", data);
        orderFields = {};
        orderFields.orderId = data.id;
        console.log(orderFields);
        const finalOrder = await Order.findOneAndUpdate(
          { _id: order._id },
          { $set: orderFields },
          { new: true }
        );
        console.log(finalOrder);
        return res.status(200).json({
          orderId: finalOrder.orderId,
          totalPrice: finalOrder.totalPrice,
        });
      });
    } catch (err) {
      console.log("=== ERROR  ADD ORDERS ====\n", err.message);
      res.status(500).send("Server Error");
    }
  });

  //==========================
  //==== PAYMENT COMPLETE ====
  //==========================
  router.post("/api/order/paymentComplete", async (req, res) => {
    console.log(chalk.cyan("=== PAYMENT COMPLETE ===\n Date: ", new Date()));

    const { paymentId, orderId, signature } = req.body;
    const generated_signature = CryptoJS.HmacSHA256(
      orderId + "|" + paymentId,
      keys.razorPaySecretKey
    ).toString();
    console.log("GENE_SIG: ", generated_signature);
    if (generated_signature == signature) {
      //payment is successful
      const orderFields = {};
      orderFields.paymentStatus = "PAID";
      orderFields.paymentId = paymentId;
      const orderUpdate = await Order.findOneAndUpdate(
        { orderId },
        { $set: orderFields },
        { new: true }
      );
      console.log("PAYMENT COMPLETE");
      res.send("PAYMENT_COMPLETE");
      const order = await Order.findOne({ orderId });

      //DELECT CART
      const cart = await Cart.findOneAndDelete();
    }
  });
};
