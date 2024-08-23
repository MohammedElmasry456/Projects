const jwt = require("jsonwebtoken");
const User = require("../models/user");
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decode = jwt.verify(token, "elmasry456");
    const user = await User.findOne({ _id: decode._id, tokens: token });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(500).send({ error: "Not authenticate" });
  }
};

module.exports = auth;
