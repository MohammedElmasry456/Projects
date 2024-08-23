const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 8,
    validate(val) {
      var strongRegex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"
      );
      if (!strongRegex.test(val)) {
        throw new Error("It's A Weak Password");
      }
    },
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validate(val) {
      if (!validator.isEmail(val)) {
        throw new Error("It's Not Email");
      }
    },
  },
  age: {
    type: Number,
    default: 18,
    validate(val) {
      if (val <= 0) {
        throw new Error("The Age Must Be Larger Than Zero");
      }
    },
  },
  city: {
    type: String,
    trim: true,
  },
  tokens: [
    {
      type: String,
      required: true,
    },
  ],
});

//create Token
userSchema.methods.createToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "elmasry456");
  user.tokens = user.tokens.concat(token);
  await user.save();
  return token;
};

//Hashing password
userSchema.pre("save", async function () {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcryptjs.hash(user.password, 8);
  }
});

//hiding password and tokens
userSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.tokens;
  return userObj;
};

//login
userSchema.statics.loginFun = async (em, pass) => {
  const user = await User.findOne({ email: em });
  if (!user) {
    throw new Error("There Are Problem In Email");
  }
  const isMatch = await bcryptjs.compare(pass, user.password);
  if (!isMatch) {
    throw new Error("There Are Problem In Password");
  }
  return user;
};
const User = mongoose.model("user", userSchema);
module.exports = User;
