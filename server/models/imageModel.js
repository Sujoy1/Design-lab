import mongoose from "mongoose";

var imgSchema = mongoose.Schema({
    userID: { type: String, required: true },
    imageType : { type : Number , required : true},
    img:{data:Buffer,contentType: String}
});

var Image = mongoose.model("image",imgSchema);
export default Image;

