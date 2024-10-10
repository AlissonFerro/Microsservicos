import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    createdAt: {
        type: Number,
        default: Date.now()
    },
    updatedAt: {
        type: Number
    },
    deletedAt: {
        type: Number
    }
});

export const UserModel = mongoose.model('User', userSchema);