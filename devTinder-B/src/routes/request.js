const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const user = require("../models/user");
const requestRouter = express.Router();

//sending-request
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status type" });
      }

      const touser = await user.findById(toUserId);
      if (!touser) {
        return res.status(400).json({ message: "User not found" });
      }

      //if there is an existing ConnectionRequest
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId }, // check for reverse connection request
        ],
      });

      if (existingConnectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection request already exists" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();
      res.json({
        message: req.user.firstName + " " + status + " in " + "  " + touser.firstName ,
        connectionRequest: data,
      });
    } catch (error) {
      return res.status(400).send("ERROR: " + error.message);
    }
  }
);

//review and accpet/reject
requestRouter.post(
  '/request/review/:status/:requestId',
  userAuth,
  async (req, res) => {
    try {
      // user(loggedIn)
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = [ "accepted", "rejected" ];
      if(!allowedStatus.includes(status)){
        return res.status(400).json({ message: "Invalid status type" });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id:requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if(!connectionRequest){
        return res.status(400).json({ message: "Connection request not found" });
      }

      // accept/reject
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({
        message: req.user.firstName + " " + status + "  " + "connection Reques",
        connectionRequest: data,
      })
    } catch (error) {
      res.status(400).send("ERROR: " + error.message);
    }
  }
)



module.exports = requestRouter;
