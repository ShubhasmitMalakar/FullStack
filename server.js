const next = require("next");
const express = require("express");
const axios = require("axios")

const bodyParser = require("body-parser");

const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(bodyParser.json());

    server.get('/api/products', async (req,res) => {
        const response = await axios.get('https://dummyjson.com/products');

        return res.send(response.data)
    })

    server.get("*", (req, res) => {
      return handle(req, res);
    });
    server.listen(3000, (err) => {
      if (err) throw err;
      console.log("server ready!!!");
    });
  })
  .catch((er) => {
    console.error(er.stack);
    process.exit(1);
  });
