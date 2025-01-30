const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/medicalDB')
    .then(() => {
        console.log("GOT CONNECTION")
    })
    .catch((error) => console.log("oh on falied", error));
const userschema = {
    userid: String,
    userName: String,
    contactNum: Number,
    email: String,
    category: String
}
const User = mongoose.model("User", userschema)
module.exports = User