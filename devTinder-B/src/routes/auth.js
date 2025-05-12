const express = require ('express');
const authRouter = express.Router();

const { validateSignupData } = require("../utils/validation.js");
const bcrypt = require("bcrypt");
const User = require('../models/user');

//signUp
authRouter.post("/signup", async (req, res) => { 
    try {
      // validation of data
      validateSignupData(req);
  
      const {
        firstName,
        lastName,
        emailId,
        age,
        gender,
        photoUrl,
         about,
        skills,
        password,
      } = req.body;
  
      //Encrypt the password
      const passwordHash = await bcrypt.hash(password, 10);
      // console.log(passwordHash);
  
      // Creating a new instance of the User model
      const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
        age,
        gender,
        photoUrl,
        about,
        skills,
      });
  
      //saving the details and error handling
      await user.save();
      res.send("User created successfully");
    } catch (error) {
      res.status(400).send("Error saving the user: " + error.message);
    }
  });

authRouter.post("/login", async (req, res) => {
    try {
      const { emailId, password } = req.body;
      const user = await User.findOne({ emailId: emailId });
      if (!user) {
        return res
          .status(400)
          .send("invalid credentials or something error happened");
      }
  
      const isPasswordValid = await user.validatePassword(password);
  
      if (isPasswordValid) { 
        // Create a JWT token
  
        const token = await user.getJWT();
  
        //Add the token to cookie and send the response back to the server
  
        res.cookie("token", token, {
          expires: new Date(Date.now() + 8 + 36000000),
        });
  
        res.send("User logged in successfully");
      } else {
        return res.status(400).send("try passing the correct credentials");
      }
    } catch (error) {
      res.status(400).send("Error logging in: " + error.message);
    }
  });

authRouter.post('/logout', (req, res) => {
   res.cookie('token', null, {
    expires: new Date(Date.now()),
   });
    res.send('Ok see you later! 🤞, or may we know the reson of logout🤦‍♂️');
})


  module.exports = authRouter;