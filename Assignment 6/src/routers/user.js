const express = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const auth = require("../middleware/auth");
const router = express.Router();

//create new User
router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

//get users
router.get("/users", auth, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

//get one User
router.get("/users/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findOne({ _id: _id, tokens: req.token });
    if (!user) {
      return res.status(404).send("Not Found Or That's Belongs To You");
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

//update user
router.patch("/users/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const keys = Object.keys(req.body);
    const user = await User.findOne({ _id: _id, tokens: req.token });
    if (!user) {
      return res.status(404).send("Not Found Or That's Belongs To You");
    }
    keys.forEach((e) => {
      if (e !== "password") {
        user[e] = req.body[e];
      }
    });

    if (req.body.password) {
      const isMatch = await bcryptjs.compare(req.body.password, user.password);
      if (!isMatch) {
        user.password = req.body.password;
      }
    }
    await user.save();
    res.status(200).send(user); // show data
  } catch (e) {
    res.status(500).send(e.message);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.loginFun(req.body.email, req.body.password);
    if (!user) {
      return res.status(404).send("Not Found");
    }
    const token = await user.createToken();
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

//delete
router.delete("/users/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.deleteOne({ _id: _id, tokens: req.token });
    if (!user.deletedCount) {
      return res.status(404).send("Not Found Or That's Belongs To You");
    }
    res.status(200).send();
  } catch (e) {
    res.status(500).send(e.message);
  }
});

//profile
router.get("/profile", auth, (req, res) => {
  res.status(200).send(req.user);
});

//logout
router.delete("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((e) => e != req.token);
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send(e.message);
  }
});

//logoutAll
router.delete("/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
