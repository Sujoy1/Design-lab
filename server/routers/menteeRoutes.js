import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import data from "../data.js";
import Mentee from "../models/menteeModel.js";
import { generateToken, isAdmin, isAuth } from "../utils.js";

const menteeRouter = express.Router();

// Push Dummy Data ( Use this route only once)

menteeRouter.get(
  "/seed-mentee",
  expressAsyncHandler(async (req, res) => {
    await Mentee.remove({});
    const createdMentee = await Mentee.insertMany(data.users_mentee);
    res.send({ createdMentee });
  })
);

// Sign in Route  for Mentees

menteeRouter.post(
  "/signin-mentee",
  expressAsyncHandler(async (req, res) => {
    const user = await Mentee.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          password: user.password,
          isAdmin: user.isAdmin,
          mobilenumber: user.mobilenumber,
          instituteName: user.instituteName,
          enrollmentNumber: user.enrollmentNumber,
          address: user.address,
          // token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

// Registration Route  for Mentees

menteeRouter.post(
  "/register-mentee",
  expressAsyncHandler(async (req, res) => {
    const user = new Mentee({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      mobilenumber: req.body.mobilenumber,
      instituteName: req.body.instituteName,
      enrollmentNumber: req.body.enrollmentNumber,
      address: req.body.address,
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      password: createdUser.password,
      mobilenumber: createdUser.mobilenumber,
      instituteName: createdUser.instituteName,
      enrollmentNumber: createdUser.enrollmentNumber,
      address: createdUser.address,
      // token: generateToken(createdUser),
      
    });
  })
);

// Route to fetch any Mentee by Mentee ID


menteeRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await Mentee.findById(req.body._id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "Mentee Not Found" });
    }
  })
);

// Route for any Mentee to update his/her profile information

menteeRouter.put(
  "/update-profile",
    expressAsyncHandler(async (req, res) => {
    const user = await Mentee.findById(req.body._id);
    if (user) {

      // update all details
          user.name = req.body.name,
          user.email= req.body.email,
          user.password =req.body.password,
          user.isAdmin =req.body.isAdmin,
          user.mobilenumber = req.body.mobilenumber,
          user.instituteName = req.body.instituteName,
          user.enrollmentNumber = req.body.enrollmentNumber,
          user.address= req.body.address

      const updatedUser = await user.save();

      res.send({
      message: "Mentee profile has been successfully updated !",
        _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      password: updatedUser.password,
      isAdmin: updatedUser.isAdmin,
      mmobileNumber: updatedUser.mobileNumber,
      instituteName: updatedUser.instituteName,
      enrollmentNumber: updatedUser.enrollmentNumber,
      address: updatedUser.address,
      //  token: generateToken(updatedUser),
      });
    }
  })
);




// Route for any Admin to remove a Mentee . Only Admins can remove other people (including other Admins)

menteeRouter.delete(
  "/delete-mentee",
  
  expressAsyncHandler(async (req, res) => {
    const mentee = await Mentee.findById(req.body._id);
    if (mentee) {
      const deleteMentee = await mentee.remove();
      res.send({ message: "Mentee Record Removed", product: deleteMentee });
    } else {
      res.status(404).send({ message: "Mentee Not Found" });
    }
  })
);

export default menteeRouter