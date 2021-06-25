import mongoose from "mongoose";



const mentorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
      sparse: true,
    },
    password: { type: String, required: true },
    mobilenumber: { type: String, required: true },
    companyName: { type: String, required: true },
    employeeIDNumber: { type: String, required: true },
    address: { type: String, required: true },
    employeeIDimage: { type: String, required: false },
    governmentIDimage: { type: String, required: false },
    verificationstatus:{ type: Boolean, required:false},
    isAdmin : { type : Boolean , required:false}
  },
  {
    timestamps: true,
  }
);
const Mentor = mongoose.model("Mentor", mentorSchema);
export default Mentor;

