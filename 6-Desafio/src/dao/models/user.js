import mongoose from "mongoose";

const UsersCollection = 'users'

const UsersSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        // required: true
    },
    age: {
        type: Number,
        // required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    avatar: {
        type: String
    }
})

export const userModel = mongoose.model(UsersCollection, UsersSchema)