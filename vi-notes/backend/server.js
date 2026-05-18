const express =require("express")
const cors= require("cors")
const app=express() 
const mongoose =require("mongoose")
require("dotenv").config();
const note=require("./models/note")
const user = require("./models/user");
const auth = require("./middleware/auth");
const port=process.env.PORT
const bcrypt = require("bcrypt");  //password hashing
const jwt = require("jsonwebtoken");  //login token
// const user = require("./models/user")

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

//just for checking that backend is running or not
app.get('/',(req,res)=>{
    res.send("API is running...")
})

//to store the note data in dbms----------------------------------------------------------------------------------------------
app.post('/api/save-note',auth,async(req,res)=>{
    console.log(req.body)
    try{
        const {context,keystrokes,paste}=req.body

        // const token = req.headers.authorization?.split(" ")[1];
        // const decoded = jwt.verify(token, "secretkey");
        // const userId = decoded.userId;

        const newnote =new note({
            context,
            keystrokes,
            paste,
            userId:req.userId,
        })

        await newnote.save()

        res.json({
            success:true,
            message:"Recieved successfully"
        })
    }catch(error){
        console.log(error)
        res.status(500).json({ error: "Server error" });
    }
})

//api for user registration---------------------------------------------------------------------------------------------------
app.post('/api/register',async (req,res)=>{
    // console.log(req.body)
    try{
        const{email,password}=req.body

        //checking if user exist
        const ifuserexist=await user.findOne({email})
        if(ifuserexist){
            return res.json({message:"user already exists"})
        }

        //password hash
        const hashedpassword=await bcrypt.hash(password,10)

        const newuser=new user({
            email,
            password:hashedpassword,
        })

        await newuser.save()

        res.json({message:"user registered successfully"})

    }catch(error){
        res.status(500).json({error:"Server error"})
    }
})

//api for login user-----------------------------------------------------------------------------------------------------
app.post('/api/login',async (req,res)=>{
    try{
        const {email,password}=req.body

        //checking if user exist or not
        const ifuser = await user.findOne({email})

        if(!ifuser){
            return res.json({message:"user not found"})
        }

        //compare password
        const ismatch=await bcrypt.compare(password,ifuser.password)

        if(!ismatch){
            return res.json({message:"Invalid Credentials"})
        }

        //create token
        const token =jwt.sign(
            {userId:ifuser._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )

        res.json({
            message:"Login successfully",
            token,
        })

    }catch(error){
        res.status(500).json({error:"Server error"})
    }
})


app.listen(port,()=>{
    console.log(`Server Running On PORT ${port}`)
})