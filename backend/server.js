const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const note = require("./models/note");
const user = require("./models/user");
const auth = require("./middleware/auth");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected Successfully"))
.catch((err) => console.log("Database Connection Error:", err));


// Home Route
app.get('/', (req, res) => {
    res.send("VI Notes Backend Server Running");
});


// Save Notes API
app.post('/api/save-note', auth, async (req, res) => {
    try {

        const { context, keystrokes, paste } = req.body;

        const newnote = new note({
            context,
            keystrokes,
            paste,
            userId: req.userId,
        });

        await newnote.save();

        res.json({
            success: true,
            message: "Received successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Server Error"
        });
    }
});


// Register API
app.post('/api/register', async (req, res) => {

    try {

        const { email, password } = req.body;

        // validation
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        // user exists check
        const ifuserexist = await user.findOne({ email });

        if (ifuserexist) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // hash password
        const hashedpassword = await bcrypt.hash(password, 10);

        const newuser = new user({
            email,
            password: hashedpassword,
        });

        await newuser.save();

        res.json({
            success: true,
            message: "User registered successfully"
        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Server Error"
        });
    }

});


// Login API
app.post('/api/login', async (req, res) => {

    try {

        const { email, password } = req.body;

        // validation
        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter all fields"
            });
        }

        // check user
        const ifuser = await user.findOne({ email });

        if (!ifuser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // compare password
        const ismatch = await bcrypt.compare(
            password,
            ifuser.password
        );

        if (!ismatch) {
            return res.status(401).json({
                message: "Invalid Credentials"
            });
        }

        // generate token
        const token = jwt.sign(
            { userId: ifuser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            success: true,
            message: "Login successful",
            token,
        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Server Error"
        });
    }

});


app.listen(port, () => {
    console.log(`Server Running On PORT ${port}`);
});