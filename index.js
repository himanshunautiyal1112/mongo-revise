const express = require("express");
const bycrypt = require("bcrypt");
const { UserModel } = require("./db");
const jwt = require('jsonwebtoken');
const { mongoose } = require("mongoose");
const JWT_SECRATE = "12345ABCE"
const { auth }  = require('./middelware');
const { SignupSchema, SigninSchema } = require("./types");

mongoose.connect("mongodb://localhost:27017/mydb")

const app = express();
app.use(express.json());

app.post("/signup", async(req, res) => {

    const parsedData = SignupSchema.safeParse(req.body);
    if(!parsedData.success) {
        return res.json({
            message: "Incorrect format",
            error: parsedData.error
        })
    }
    const { username, password, name } = req.body;
    const hashpass = await bycrypt.hash(password, 10);
    await UserModel.create({
        username: username,
        password: hashpass,
        name: name
    })

    res.json({
        message: "you are logged in"
    })
})

app.post("/signin", async(req, res) => {
    const parsedData = SigninSchema.safeParse(req.body);

    if(!parsedData.success) {
        return res.status(403).json({
            message: "wrong inputs",
            error: parsedData.error
        })
    }
    const { username, password } = req.body;

    const user = await UserModel.findOne({
        username: username
    })

    const response = await bycrypt.compare(password, user.password);

    if(!response) {
        res.status(403).json({
            message: "Incorrect credetials"
        })
    }
    const token = jwt.sign({
        id: user._id.toString()
    }, JWT_SECRATE)

    res.json({
        token: token
    })

})

app.post("/todo", auth, (req, res) => {
    // const title = req.body.title;
    // const done = req.body.done;
    const userId = req.body.userId;

    res.json({
        userId
    })

})

app.get("/todos", auth, (req, res) => {
    const userId = req.userId;

    res.json({
        userId
    })
})

app.listen(3000);