const  mongoose  = require("mongoose");
const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://subhankar19:LS8MUNvPRzwNEASG@cluster0.ads8xcu.mongodb.net/devTinder"
    );
};
module.exports = connectDB;

