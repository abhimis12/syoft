const express = require('express');

const app = express();

app.use(express.json());

const { register, login } = require("./controllers/auth.controller");

const postController = require('./controllers/post.controller');

const userController = require('./controllers/user.controller')

app.use("/post", postController);

app.use("/user", userController);

app.use("/signup", register)

app.use("/signin", login)


module.exports = app;

