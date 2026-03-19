const mongoose = require("mongoose");
const ObjectId = mongoose.ObjectId;
const Schema = mongoose.Schema;
const user = new Schema({
    username: {type: String, unique: true},
    password: String,
    name: String
})

const todo = new Schema({
    title: String,
    done: Boolean,
    userId: ObjectId
})

const UserModel = mongoose.model('user', user);
const TodoModel = mongoose.model('todo', todo);

module.exports = {
    UserModel,
    TodoModel
}