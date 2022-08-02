require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const newToken = (user) => {
  return jwt.sign({ user: user }, "sdfbasdfbasewffgsgfe", {
    expiresIn: 60 * 60 * 5,
  });
};

const register = async (req, res) => {
  try {

    let user = await User.findOne({ email: req.body.email }).lean().exec();
    if (user) {
      return res.status(400).send({ message: "Email already in use" });
    }
    user = await User.create(req.body);

    const token = newToken(user);
    return res.status(201).send({ user, token });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//login
const login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .send({ message: "Either email or password is not correct" });
    }
  console.log(user)
    
    const match = user.checkPassword(req.body.password);
   
    if (match) {
      const token = newToken(user);

      return res.status(201).send({ user, token });
    }
    return res.status(400).send({ message: "Wrong Password" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { register, login };

