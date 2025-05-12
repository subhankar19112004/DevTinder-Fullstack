const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 250,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Invalid given password " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Invalid gender");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://d2u4q3iydaupsp.cloudfront.net/a9uAQu8AMFXIHukvIFkEfjpdYVQ88rwk0lECazSqIHZVAICdd6MSTKvzxCF2r1HKDA9sCalszOaLwOckoYgQZuORNkyDrwF3orGl5H2ogCS174Y7cilQYwVBOw6aFwqL",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo URL " + value);
        }
      },
    },
    about: {
      type: String,
      default:
        "Add your description here to show case your developing profile.",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {  
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "DEV@TINDER123", {
    expiresIn: "1h",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    user.password
  );
  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
