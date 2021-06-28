import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import data from "../data.js";
import Mentor from "../models/mentorModel.js";
import { generateToken, isAdmin, isAuth } from "../utils.js";

const mentorRouter = express.Router();

// Push Dummy Data ( Use this route only once)

mentorRouter.get(
  "/seed-mentor",
  expressAsyncHandler(async (req, res) => {
    await Mentor.remove({});
    const createdMentors = await Mentor.insertMany(data.users_mentor);
    res.send({ createdMentors });
  })
);

// Sign in Route  for Mentors

mentorRouter.post(
  "/signin-mentor",
  expressAsyncHandler(async (req, res) => {
    const user = await Mentor.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
           _id: user._id,
          name: user.name,
          email: user.email,
          password: user.password,
          
          mobilenumber: user.mobilenumber,
          companyName: user.comapanyName,
          employeeIDNumber: user.employeeIDNumber,
          address: user.address,
          employeeIDimage: user.employeeIDimage,
          governmentIDimage: user.governmentIDimage,
          verificationstatus: user.verificationstatus,
          isAdmin : user.isAdmin
          // token: generateToken(user),
          
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

// Registration Route  for Mentors

mentorRouter.post(
  "/register-mentor",
  expressAsyncHandler(async (req, res) => {
    const user = new Mentor({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      mobilenumber: req.body.mobilenumber,
      companyName: req.body.companyName,
      employeeIDNumber: req.body.employeeIDNumber,
      address: req.body.address,
      employeeIDimage: req.body.employeeIDimage,
      governmentIDimage: req.body.governmentIDimage,
      verificationstatus: false,
      isAdmin : false
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      password: createdUser.password,
      
      mobilenumber: createdUser.mobilenumber,
      companyName: createdUser.companyName,
      employeeIDNumber: createdUser.employeeIDNumber,
      address: createdUser.address,
      employeeIDimage: createdUser.employeeIDimage,
      governmentIDimage: createdUser.governmentIDimage,
      verificationstatus: false,
      isAdmin : false
       /* 
       token: generateToken(createdUser),
       */
      
    });
  })
);
 


// Route to fetch any Mentor

mentorRouter.get(
  "mentordetails/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await Mentor.findById(req.body.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "Mentor Not Found" });
    }
  })
);

// Route to update data for any mentor

mentorRouter.put(
  "/update-profile",
  
  expressAsyncHandler(async (req, res) => {
    const user = await Mentor.findById(req.body._id);
    if (user) {
      
      // update all details
      user.name= req.body.name,
      user.email= req.body.email,
      user.password= req.body.password,
      user.mobilenumber= req.body.mobilenumber,
      user.companyName= req.body.companyName,
      user.employeeIDNumber= req.body.employeeIDNumber,
      user.address= req.body.address,
      user.employeeIDimage= req.body.employeeIDimage,
      user.governmentIDimage= req.body.governmentIDimage,
      user.verificationstatus= req.body.verificationstatus,
      user.isAdmin = req.body.isAdmin

      const updatedUser = await user.save();
      res.send({
      message: "Mentor profile has been successfully updated !",
        _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      password: updatedUser.password,
      mobilenumber: updatedUser.mobilenumber,
      companyName: updatedUser.companyName,
      employeeIDNumber: updatedUser.employeeIDNumber,
      address: updatedUser.address,
      employeeIDimage: updatedUser.employeeIDimage,
      governmentIDimage: updatedUser.governmentIDimage,
      verificationstatus: updatedUser.verificationstatus,
      isAdmin: updatedUser.isAdmin
     //   token: generateToken(updatedUser),
      });
    }
    else
    {
      res.status(404).send({ message: "Mentor Not Found" });
    }
    })
);

// Route to verify Mentor profie . Authenticate Mentor ID cards .

mentorRouter.put(
  "/approve-mentor",
    expressAsyncHandler(async (req, res) => {
    const userID = req.body._id;
    const mentor = await Mentor.findById(userID);
    if (mentor) {
       
      mentor.verificationstatus = true
      const updatedProfile = await mentor.save();
      res.send({ message: "Mentor profile has been successfully approved !", mentor: updatedProfile });
    } else {
      res.status(404).send({ message: "Mentor Not Found" });
    }
  })
);

// Make any mentor Admin . Only an admin can make another mentor Admin 

mentorRouter.put(
  "/make-mentor-admin",
  expressAsyncHandler(async (req, res) => {
    const userID = req.body._id;
    const mentor = await Mentor.findById(userID);
    if (mentor) {
      
      mentor.isAdmin = true

      const updatedProfile = await mentor.save();
      res.send({ message: "This Mentor is now an Admin !", mentor: updatedProfile });
    } else {
      res.status(404).send({ message: "Mentor Not Found" });
    }
  })
);

// Route for any Admin to remove a Mentor . Only Admins can remove other people (including other Admins)

mentorRouter.delete(
  "/delete-mentor",
  
  expressAsyncHandler(async (req, res) => {
    const mentor = await Mentor.findById(req.body._id);
    if (mentor) {
      const deleteMentor = await mentor.remove();
      res.send({ message: "Mentor Record Removed", product: deleteMentor });
    } else {
      res.status(404).send({ message: "Mentor Not Found" });
    }
  })
);

// beginining of Shuvro's Routes : Integration for below routes is complete.

// getting mentor list

mentorRouter.get(
  `/mentorlist`,
  // isAuth,
  expressAsyncHandler(async (req, res) => {
    const userMentor = await Mentor.find({});
    if (userMentor) {
      res.send(userMentor);
    } else {
      res.status(404).send({ message: "Mentor Not Found" });
    }
  })
);

// fetching Mentor using Mentor email 

mentorRouter.get(
  "/mentordetailsemail",

  expressAsyncHandler(async (req, res) => {
    const mentors = await Mentor.find({ user: req.body._id });
    if (user) {
      res.send(mentorprofile);
    } else {
      res.status(404).send({ message: "Mentor Not Found" });
    }
  })
);

// Fetch detils for a mentor using their ID

mentorRouter.get(
  `/mentorlist/:id`,
  // isAuth,
  expressAsyncHandler(async (req, res) => {
    const userMentor = await Mentor.findById(req.params.id);
    if (userMentor) {
      res.send(userMentor);
    } else {
      res.status(404).send({ message: "Mentor Not Found" });
    }
  })
);

// edit mentor using their ID

mentorRouter.put(
  "/mentorlist/:id",

  expressAsyncHandler(async (req, res) => {
    const mentor = await Mentor.findById(req.params.id);
    if (mentor) {
      mentor.name = req.body.name || mentor.name;
      mentor.email = req.body.email || mentor.email;
      mentor.mobilenumber = req.body.mobilenumber || mentor.mobilenumber;
      mentor.companyName = req.body.companyName || mentor.companyName;
      mentor.employeeIDNumber =
        req.body.employeeIDNumber || mentor.employeeIDNumber;
      mentor.address = req.body.address || mentor.address;
      mentor.isAdmin = Boolean(req.body.isAdmin);
      mentor.verificationstatus = Boolean(req.body.verificationstatus);
      const updatedMentor = await mentor.save();
      res.send({ message: "Mentor Updated", mentor: updatedMentor });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

// Delete Mentor Route : In this case admins can't be deleted

mentorRouter.delete(
  "/mentorlist/:id",

  expressAsyncHandler(async (req, res) => {
    const user = await Mentor.findById(req.params.id);
    if (user) {
      if (
        user.email === "shuvro@admin.com" ||
        (user.email === "tester@admin.com" && user.isAdmin === true)
      ) {
        res.status(400).send({ message: "Can Not Delete Admin User" });
        return;
      }
      if (user.email === "owner@admin.com" && user.isAdmin === true) {
        res.send(400).send({ message: "Can Not Delete Admin User" });
      }
      const deleteUser = await user.remove();
      res.send({ message: "Mentor Deleted", deleteUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

// End of Shuvro's routes

export default mentorRouter