const express = require("express");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

// find all your pending/interested request from others
userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "age",
      "gender",
      "photoUrl",
      "about",
      "skills",
    ]);

    res.json({
      message:
        "Hey " +
        loggedInUser?.firstName +
        " you have recieved Connection requests from the data of users shown below",
      data: connectionRequests,
    });
  } catch (error) {
    res.status(400).send("Error getting the profile: " + error.message);
  }
});

// find all your connections
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", [
        "firstName",
        "lastName",
        "age",
        "gender",
        "photoUrl",
        "about",
        "skills",
      ])
      .populate("toUserId", [
        "firstName",
        "lastName",
        "age",
        "gender",
        "photoUrl",
        "about",
        "skills",
      ]);

    const data = connectionRequests.map((row) => {
      if (row.fromUserId.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      } else {
        return row.fromUserId;
      }
    });
    res.json({
      message:
        "Hey " +
        loggedInUser?.firstName +
        " you have " +
        connectionRequests.length +
        " connections",
      data: data,
    });
  } catch (error) {
    res.status(400).send("Error getting the connections: " + error.message);
  }
});

//Gets you the profiles of other users on platform
userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    //find all connection requests (sent + recieved) of the logged in user
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ toUserId: loggedInUser._id }, { fromUserId: loggedInUser._id }],
    }).select("fromUserId  toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select("firstName lastName age gender photoUrl about skills")
      .skip(skip)
      .limit(limit);

    res.json({
      message:
        "Hey " +
        loggedInUser?.firstName +
        " you have " +
        users.length +
        " users in your feed",
      data: users,
    });
  } catch (error) {
    res.status(400).send("Error getting the feed: " + error.message);
  }
});

module.exports = userRouter;
