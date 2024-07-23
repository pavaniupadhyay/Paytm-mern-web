const express=require("express");
const zod=require("zod");
const { User } = require("../db");
const { authMiddleware } = require("./middleware");
const app=express();
const router=express.Router();

const signupScema=zod.object({
  username: zod.string(),
  firstName: zod.string(),
  lastName:zod.string(),
  password: zod.string()
})

app.post("/signup", async (req,res)=>{
      const body=req.body;
      const {result}=signupScema.safeParse(body);
      if(!result){
        res.status(411).json({
          message: "Email already taken / Incorrect inputs"
        })
      }
      const existingUser=await User.findOne( {
        username:req.body.username 
      })
      if(existingUser){
        res.status(411).json({
          message: "Email already taken / Incorrect inputs"
        })
      }
      const user=User.create({
        username:req.body.username,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password
      })
      const userId=user._id;
      const token=jwt.sign({
        userId:userId
      },JWT_SECRET);
      res.json({
        
          message: "User created successfully",
          token: "jwt"
      
      })
} )
const signinScema=zod.object({
  username: zod.string(),
  password: zod.string()
})
app.post("/signin",async(req,res)=>{
  const body=req.body;
  const {result}=signinScema.safeParse(body);
  if(!result){
    res.status(411).json({
      message:"Error while logging in"
    })
  }
  const existingUser=await User.findOne( {
    username:req.body.username 
  })
  if(existingUser){
    res.status(411).json({
      message: "Error while logging in"
    })
  }
  const user=User.create({
    username:req.body.username,
    password:req.body.password
  })
  if (user) {
    const token = jwt.sign({
        userId: user._id
    }, JWT_SECRET);

    res.json({
        token: token
    })
    return;
  }
res.status(411).json({
    message: "Error while logging in"
  })
  const updatebody=zod.object({
    password: zod.string().optional(),
	firstName: zod.string().optional(),
	lastName: zod.string().optional(),
  
  })
  app.put("/",authMiddleware,async (req,res)=>{
    const body=req.body;
    const {result}=updatebody.safeParse(body);
    if(!result){
      res.status(411).json({
        message:"Error while updating information"
        })
        await User.updateOne({
           _id: req.userId }, req.body);
	
        res.json({
            message: "Updated successfully"
        })
}})
router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
      $or: [{
          firstName: {
              "$regex": filter
          }
      }, {
          lastName: {
              "$regex": filter
          }
      }]
  })
  res.json({
    user: users.map(user => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id
    }))
  })
})
})
module.exports=router;