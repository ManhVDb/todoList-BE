const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var app = express();
const dotenv = require("dotenv");
const db = require("../src/app/db");
const routerRoot = require("./routers/routerRoot")
var morgan = require("morgan");
app.use(cors());
dotenv.config();
db.connect();

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Header",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization,applicatio n/x-www-form-urlencoded"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methoads", "PUT, POST, PUT, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
// start server
routerRoot(app);
let port = process.env.PORT || 2408;
app.listen(port, () => {
  console.log(`server listening at port ${port}`);
});