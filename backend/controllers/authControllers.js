import User from '../models/usermodel.js'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { Token } from '../utils/verificationToken.js';
import { generatecookie } from '../utils/cookie.js';
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from '../mail/email.js';
import { error } from 'console';
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
            verificationTokenExpiresAt: Date.now() + 60 * 60 * 1000
        });
        await user.save();

        //jwt sign
        generatecookie(res, user._id);
        await sendVerificationEmail(user.email, verificationToken);


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

export const verifyemail = async (req, res) => {
    try {
        const { code } = req.body
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })
        if (!user) {
            return res.status(400).json({ message: "Invalid Verification Code or Expired" })
        }
        user.isVerified = true
        user.verificationToken = null
        user.verificationTokenExpiresAt = null
        await user.save()
        res.status(200).json({ message: "Email Verified Successfully" })
        await sendWelcomeEmail(user.email, user.name)
    } catch (error) {
        console.error("Error During Verification", error.message);
        res.status(500).json({ message: "Server Error" })
    }

}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Email" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password" })
        }
        if (!user.isVerified) {
            return res.status(400).json({ message: "Email is not verified" })
        }
        generatecookie(res, user._id);
        user.lastlogin = new Date();
        await user.save();
        res.status(200).json({ message: "Logged in Successfully" })




    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logged Out Successfully" })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" })
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Email" });
        }
        const passwordToken = crypto.randomBytes(20).toString("hex");
        user.resetToken = passwordToken;
        const passwordTokenExpiresAt = Date.now() + 60 * 60 * 1000 //1hour
        user.resetTokenExpiresAt = passwordTokenExpiresAt;
        await user.save();
        //const url = `http://localhost:3000/reset-password/${passwordToken}`


        //send email
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT}/reset-password/${passwordToken}`)
        res.status(200).json({
            message: "Password Reset Email Sent",
            passwordToken
        })



    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" })


    }
}
export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiresAt: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(400).json({ message: "Invalid Token" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiresAt = undefined;
        await user.save();
        await sendResetSuccessEmail(user.email);
        res.status(201).json({ message: "Password Reset Successfully" })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" })

    }
}
export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userID).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};