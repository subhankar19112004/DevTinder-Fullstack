const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: "{VALUE} is not a valid status type",
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create a compound index to ensure unique connection requests between two users

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });

connectionRequestSchema.pre('save', function(next){
  const connectionRequest = this;
  // check if the fromUserId is same as toUserId
  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error("Am I not your friend, then why are you sending me a request?");
  }
  next();
})


const ConnectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequestModel;
