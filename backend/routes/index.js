const express=require("express");
const userRouter=express.Router("./user")
const  router=express.Router();
app.use("/user",userRouter);
module.exports=router;