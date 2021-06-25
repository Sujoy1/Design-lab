import multer from "multer";
import express from "express";
import { isAdmin, isAuth } from "../utils.js";
import expressAsyncHandler from "express-async-handler";
import Mentor from "../models/mentorModel.js";
import Image from "../models/imageModel.js"

const uploadRouter = express.Router();
const maxSize = 1 * 1024 * 1024; // 1 mb

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },

  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: maxSize,
  },
});

// Route to upload Government ID proof : Type = 0

uploadRouter.post("/upload-mentor-govid",upload.single("governmentimage"),
expressAsyncHandler(async (req, res) => {
  const userID = req.body._id;
  const type = req.body.image_type;
  
  var img = fs.readFileSync(req.file.path);
  var encode_img = img.toString('base64');
  var final_img = {
      contentType:req.file.mimetype,
      image:new Buffer(encode_img,'base64')
  };
  Image.create(userID,type ,final_img,function(err,result){
      if(err){
          console.log(err);
      }else{
          console.log(result.img.Buffer);
          console.log("Government ID proof succeesfully uploaded !");
          res.contentType(final_img.contentType);
          res.send(final_img.image);
      }
  })
})
);


// Route to upload Comapany ID proof : Type = 1 

uploadRouter.post("/upload-mentor-compid",upload.single("companyimage"),
expressAsyncHandler(async (req, res) => {
  const userID = req.body._id;
  const type = req.body.image_type;
  
  var img = fs.readFileSync(req.file.path);
  var encode_img = img.toString('base64');
  var final_img = {
      contentType:req.file.mimetype,
      image:new Buffer(encode_img,'base64')
  };
  Image.create(userID,type ,final_img,function(err,result){
      if(err){
          console.log(err);
      }else{
          console.log(result.img.Buffer);
          console.log("Comapany ID proof succeesfully uploaded !");
          res.contentType(final_img.contentType);
          res.send(final_img.image);
      }
  })
})
);



export default uploadRouter;






