import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    //console.log(req.body)
    const { fullName, emailId, password } = req.body;
    if (!fullName || !emailId || !password) {
      return res.status(403).json({
        success: false,
        error: true,
        message: "All fields are required",
      });
    }
    const user = await User.findOne({ emailId });
    if (user) {
      return res.status(403).json({
        success: false,
        error: true,
        message: "User already registered",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // create user
    await User.create({
      fullName: fullName,
      emailId: emailId,
      password: hashedPassword,
    });
    return res.status(200).json({
      success: true,
      error: false,
      message: "User registered successfully",
    });
  } catch (err) {
    console.log(" Error in registering the application " + err);
    return res.status(500).json({
      success: false,
      error: true,
      message: `Error : ${err}`,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!emailId || !password) {
      return res.status(403).json({
        success: false,
        error: true,
        message: "All fields are required",
      });
    }
    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(403).json({
        success: false,
        error: true,
        message: "User does not exist.",
      });
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.status(403).json({
        success: false,
        error: true,
        message: "Incorrect Password",
      });
    }
    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "strict",
      })
      .json({
        success: true,
        error: false,
        message: "User logged in.",
      });
  } catch (err) {
    console.log(" Error in login of the application " + err);
    return res.status(500).json({
      success: false,
      error: true,
      message: `Error : ${err}`,
    });
  }
};
export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
      })
      .json({
        success: true,
        error: false,
        message: "User logged out",
      });
  } catch (err) {
    console.log(" Error in logout of the application " + err);
    return res.status(500).json({
      success: false,
      error: true,
      message: `Error : ${err}`,
    });
  }
};
