const express = require('express');
const { userAuth } = require('../middlewares/auth');
const { validsateEditProfileData, validateEditPassworData } = require('../utils/validation');
const bcrypt = require("bcrypt");
const profileRouter = express.Router();


//profile
profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
      //find the user in the database
      const user = req.user;
  
      res.send(user);
    } catch (error) {
      res.status(400).send("Error getting the profile: " + error.message);
    }
  });

//update profile
profileRouter.patch('/profile/edit', userAuth, async(req, res) => {
  try {
    if( !validsateEditProfileData(req)){
      return res.status(400).send("Invalid fields in the request body");
    }
    const loggedInser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInser[key] = req.body[key]));

    await loggedInser.save();

    res.send(`${loggedInser.firstName} ${loggedInser.lastName}'s profile updated successfully`);

  } catch (error) {
    res.status(400).send("Error updating the profile: " + error.message);
  }
});

//update password
profileRouter.patch('/profile/password', userAuth, async(req, res)=> {
  try {
    if(!validateEditPassworData(req)){
      return res.status(400).send("Invalid fields in the request body");
    }
    const loggedInUser = req.user;
    //Encrypt the password
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    loggedInUser.password = passwordHash;
    await loggedInUser.save();
    res.send("Password updated successfully");
  } catch (error) {
    res.status(400).send("Error updating the password: " + error.message);
    
  }
})


 

  module.exports = profileRouter;
  