const mongoose=require("mongoose")
mongoose.connect('mongodb+srv://pavani:pavani@cluster0.x7thalr.mongodb.net/paytm-db?retryWrites=true&w=majority&appName=Cluster0')
const userSchema=mongoose.Schema({
  firstname:String,
  lastname:String,
  email:String,
  password:String
});
const User=mongoose.model('User',userSchema);
module.exports={
  User
}
