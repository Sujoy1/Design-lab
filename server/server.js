import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import mentorRouter from "./routers/mentorRoutes.js";
import menteeRouter from "./routers/menteeRoutes.js";
import sessionRouter from "./routers/sessionRoutes.js";
import uploadRouter from "./routers/uploadRoutes.js"
import path from "path";
import http from "http";
import { Server } from "socket.io";
import Razorpay from "razorpay";
import bodyParser from 'body-parser';

// Razor Pay Credentials

let instance = new Razorpay({
  key_id: 'rzp_test_mCBbmxqLmw2kpT', // your `KEY_ID`
  key_secret: 'C3z1CpAXLY09RHFRAe0Vrh6J' // your `KEY_SECRET`
})

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const connection_url ="mongodb+srv://SujoySeal:bKWb09V1uBbMMhJb@post-boxcluster-sujoy.i9ean.mongodb.net/Design-lab?retryWrites=true&w=majority" ;

mongoose.connect(
  connection_url,

  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => {
    console.log("Successfully connected to Sujoy's Cluster at Mongodb Atlas !");
  }
);


app.use("/api/uploads", uploadRouter);
app.use("/api/mentor", mentorRouter);
app.use("/api/mentee", menteeRouter);
app.use("/api/session", sessionRouter);

// Razor Pay Payment Gateway API 

app.use("/web", express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.post("/api/payment/order",(req,res)=>{
params=req.body;
instance.orders.create(params).then((data) => {
       res.send({"sub":data,"status":"success"});
}).catch((error) => {
       res.send({"sub":error,"status":"failed"});
})
});




app.post("/api/payment/verify",(req,res)=>{
body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
var crypto = require("crypto");
var expectedSignature = crypto.createHmac('sha256', '<your secret>')
                                .update(body.toString())
                                .digest('hex');
                                console.log("sig"+req.body.razorpay_signature);
                                console.log("sig"+expectedSignature);
var response = {"status":"failure"}
if(expectedSignature === req.body.razorpay_signature)
 response={"status":"success"}
    res.send(response);
});

// End of Razorpay payment Gateway Routes


// for showing uploaded image from upload folder to the ui and database
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.static(path.join(__dirname, "/client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

// if(process.env.NODE_ENV === 'production'){
//   app.use(express.static(path.join(__dirname, 'client/build')));
//   app.get('*', function(req,res){
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//   });
// };

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

const httpServer = http.Server(app);


httpServer.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});

