const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // Read the token from the req cookies
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedObj = await jwt.verify(token, "DEV@TINDER123");

    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      return res
        .status(400)
        .send("please try something or feel free to get help from us");
    }
    req.user = user;
    // console.log("Logged in user id: " + _id);
    next();
  } catch (error) {
    return res.status(500).json({ message: "it's not you it's us" });
  }
};

module.exports = {
  userAuth,
};
