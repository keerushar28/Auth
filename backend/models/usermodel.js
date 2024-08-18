import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    lastlogin: {
        type: Date,
        default: Date.now

    },
    verificationToken: {
        type: String,
        default: null,

    },
    verificationTokenExpiresAt: {
        type: Date,
    },
    resetToken: {
        type: String,
    },
    resetTokenExpiresAt: {
        type: Date,
    },


},
    { timestamps: true })

const User = mongoose.model('User', userSchema);
export default User;