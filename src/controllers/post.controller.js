const express = require("express");

const Post = require("../models/post.model");

const authentication = require("../middlewares/authentication");

const router = express.Router();

router.get("", authentication, async (req, res) => {
  try {
    const post = await Post.find().lean().exec();
    return res.status(200).send(post);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post("", async (req, res) => {
  try {
    const post = await Post.create(req.body);
    return res.status(200).send(post);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
