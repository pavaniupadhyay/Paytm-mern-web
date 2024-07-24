const express=require("express");
const cors=require("cors");
const app=express();
app.use(cors());
app.use(express.json());
const mainRouter=require("./routes/index");
const userRouter=require("./routes/user");
const accountRouter=require("./routes/account")



app.use("/api/v1",mainRouter);
app.use("/api/v1/user",userRouter);
app.use("/api/v1/account",accountRouter);
app.listen(3000);