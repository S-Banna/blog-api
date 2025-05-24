const express = require("express");
const passport = require("passport");
const cors = require("cors");
require("./lib/passport");

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/auth", require("./routes/auth"));
app.use("/posts", require("./routes/posts"));
app.use("/comments", require("./routes/comments"));
app.use("/likes", require("./routes/likes"));

module.exports = app;
