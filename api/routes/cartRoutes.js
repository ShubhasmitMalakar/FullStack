const express = require("express");
const mongoose = require("mongoose");

const Cart = mongoose.model("carts");
const Product = mongoose.model("products");

module.exports = (router) => {
  // =======================
  // ==== GET CART DATA ====
  // =======================
  router.get("/api/cart", async (req, res) => {
    console.log("=== GET CART DATA ===\n Date: ", new Date());
    try {
      const cartData = await Cart.find().populate("products._productId");
      return res.json(cartData);
    } catch (err) {
      console.log("=== ERROR  GET CART DATA ====\n", err.message);
      res.status(500).send("Server Error");
    }
  });

  // =====================
  // ==== ADD TO CART ====
  // =====================
  router.get("/api/cart/add/:productId", async (req, res) => {
    console.log("=== ADD TO CART ===\n Date: ", new Date());
    const productId = req.params.productId;
    console.log("PRODUCT ID:", productId);
    try {
      let cart = await Cart.findOne();
      if (cart) {
        cart.products.push({ _productId: productId });
        cart = await cart.save();
        return res.json(cart);
      } else {
        const newCart = Cart({
          products: [{ _productId: productId }],
        });
        cart = newCart.save();
        return res.json(cart);
      }
    } catch (err) {
      console.log("=== ERROR  ADD TO CART ====\n", err.message);
      res.status(500).send("Server Error");
    }
  });

  // ==========================
  // ==== REMOVE FROM CART ====
  // ==========================
  router.get("/api/cart/remove/:productId", async (req, res) => {
    console.log("=== REMOVE FROM CART ===\n Date: ", new Date());
    const productId = req.params.productId;
    console.log("PRODUCT ID:", productId);
    try {
      let cart = await Cart.findOne();
      if (cart) {
        const tempItem = cart.products.filter(
          (product) => product._productId != productId
        );
        console.log("TEMP DATA: ", tempItem);
        cart.products = tempItem;
        cart = await cart.save();
        return res.json(cart);
      } else {
        return res.status(500).json({ error: "EMPTY_CART" });
      }
    } catch (err) {
      console.log("=== ERROR REMOVE FROM CART ====\n", err.message);
      res.status(500).send("Server Error");
    }
  });
};
