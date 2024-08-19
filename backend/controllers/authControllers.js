import User from '../models/usermodel.js'
import bcrypt from 'bcryptjs'
import { Token } from '../utils/verificationToken.js';
import { generatecookie } from '../utils/cookie.js';
export const signUp = async (req, res) => {
    try {
        const { name, email, password, } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All Fields are required" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Token();
        const user = new User({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        });
        await user.save();

        //jwt sign
        generatecookie(res, user._id);

        res.status(201).json({
            message: "User Created Successfully",
            user: {
                ...user._doc,
                password: null
            }

        })
    } catch (error) {
        console.error("Error During registration", error.message);
        res.status(500).json({ message: "Server Error" })
    }
}

export const login = async (req, res) => {
    try {
       const {email,password}= req.body;
       const user = await User.findOne({ email });
       if (!user) {
        return res.status(400).json({ message: "Invalid Email" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: "Invalid Password"})
            }
            if(!user.isVerified)
            {
                return res.status(400).json({message: "Email is not verified"})
            }


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" })
    }
}

export const logout = async (req, res) => {
    try {
        res.send("Logout routes")

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" })
    }
}