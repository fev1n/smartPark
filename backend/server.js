const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./config/key").MONGODB_URI;
const passport = require("passport");
const users = require("./routes/api/user");

const app = express();

// Bodyparser Middlewares
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => console.log(error));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

// Server listening check
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}!!`)
);
