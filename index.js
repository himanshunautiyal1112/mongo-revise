const express = require("express");
const { UserModel } = require("./db");
const jwt = require('jsonwebtoken');
const { mongoose } = require("mongoose");
const JWT_SECRATE = "12345ABCE"
const { auth }  = require('./middelware');

mongoose.connect("mongodb://localhost:27017/mydb")

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

    await UserModel.create({
        username: username,
        password: password,
        name: name
    })

    res.json({
        message: "you are logged in"
    })
})

app.post("/signin", async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await UserModel.findOne({
        username: username,
        password: password
    })

    if(!user) {
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