// In a MongoDB record, you can only store upto 4MB of data.
const mongoose = require("mongoose");
const { Schema } = mongoose; // This is same as writing "const Schema = mongoose.Schema;"

const userSchema = new Schema({
  googleId: String,
  email: String,
  name: String,
});

mongoose.model("users", userSchema); //Using this, we are saying that we want to load a new model named 'users' into mongoose
