const next = require("next");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport")
const cookieSession = require("cookie-session")
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const keys = require("./api/config/keys");

const dev = process.env.NODE_ENV !== "production";

//==== IMPORT MODELS ====
require("./api/models/Products");
require("./api/models/Users");


const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(bodyParser.json());

    mongoose.connect(keys.mongoURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })

    server.use(
      cookieSession({
          maxAge: 30 * 24 * 60 * 60 * 1000,
          keys: [keys.cookieKey],
      })
  );

    require("./api/services/passport");

    server.use(passport.initialize());
    server.use(passport.session());

    require("./api/routes/authRoutes")(server);
    require("./api/routes/productRoutes")(server);


    server.get("*", (req, res) => {
      return handle(req, res);
    });
    server.listen(process.env.port || 3000, (err) => {
      if (err) throw err;
      console.log("server ready!!!");
    });
  })
  .catch((er) => {
    console.error(er.stack);
    process.exit(1);
  });
