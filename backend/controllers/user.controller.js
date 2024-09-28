import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import 'dotenv/config'


// register

const createToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET)
}

const registerUser = async (req, res) => {

   const { name, password, email } = req.body
   try {
      // checking is user already exists
      const exists = await userModel.findOne({ email });
      if (exists) {
         return res.status(422).json({ success: false, messgae: "user alreaday exists" })
      }
      // validating email format & strong password
      if (!validator.isEmail(email)) {
         return res.status(400).json({ success: false, messgae: "please enter a valid email" })
      }
      if (!validator.isStrongPassword(password)) {
         return res.status(400).json({ success: false, messgae: "please enter a strong password" })
      }

      // hashing user password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = userModel({
         name: name,
         email: email,
         password: hashedPassword
      });

      const user = await newUser.save()
      const token = createToken(user._id)
      return res.status(200).json({ success: true, token })
   } catch (error) {
      console.log(error)
      return res.status(500).json({ success: false, messgae: "Error" })
   }
}

// login user
const loginUser = async (req, res) => {
   const { email, password, id } = req.body
   try {
      const user = await userModel.findOne({ email });

      if (!user) {
         return res.status(401).json({ success: false, messgae: " User Doesn't exist" })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
         return res.status(401).json({ success: false, messgae: "Invalid Password" })
      }
      const token = createToken(user._id)
      return res.status(200).json({ success: true, token })
   } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, messgae: "Error" })
   }
}

export { loginUser, registerUser }
