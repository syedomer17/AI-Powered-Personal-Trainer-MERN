import express from "express";
import config from "config";
import bcrypt from "bcrypt";
import userModel from "../../models/User/User.js";
import sendSMS from "../../utils/sendSMS.js";
import sendMail from "../../utils/sendEmail.js";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = config.get("JWT_SECRET");
const URL = config.get("SERVER_URL");

router.post("/signup", async (req, res) => {
  try {
    const { userName, age, email, password } = req.body;
    console.log(userName, age, email, password);

   
    if(userName.length > 20){
      return res.status(409).json({ message: "username is too long." });
    }
    if(userName < 2){
      console.log("hello");
      return res.status(409).json({message:"username is too short."})
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const dupUserName = await userModel.findOne({ userName });
    if (dupUserName) {
      return res.status(409).json({ message: "userName already exists" });
    }

    const checkAge = req.body.age
    if(checkAge > 70){
      return res.status(409).json({message:"You are over Age."})
    }
    if(checkAge < 10){
      return res.status(409).json({message:"You are under Age."})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const emailToken = Math.random().toString(36).substring(2);

    // Create user Object
    const newUser = {
      userName,
      age,
      email,
      password: hashedPassword,
      userVerifiedToken: {
        email: emailToken
      },
    };
    await userModel.create(newUser);

    await sendMail({
      subject: "Email Verification",
      to: email,
      html: `
      <!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Email Verification</title>
  </head>
  <body
    style="
      font-family: Arial, sans-serif;
      background-color: #f3f4f6;
      margin: 0;
      padding: 0;
    "
  >
    <table
      role="presentation"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      border="0"
      style="max-width: 600px; margin: auto; background-color: #ffffff"
    >
      <tr>
        <td style="padding: 20px; text-align: center; background-color: #1e3a8a">
          <h2 style="color: #ffffff; margin: 0">Verify Your Email</h2>
        </td>
      </tr>
      <tr>
        <td style="padding: 20px; text-align: center">
          <p style="font-size: 16px; color: #374151">
            Click the button below to verify your email address and activate
            your account.
          </p>
          <a
            href="${URL}/api/public/emailverify/${emailToken}"
            style="
              display: inline-block;
              padding: 12px 24px;
              margin-top: 12px;
              background-color: #1e3a8a;
              color: #ffffff;
              text-decoration: none;
              font-size: 16px;
              border-radius: 6px;
            "
          >
            Verify Email
          </a>
          <p style="margin-top: 20px; font-size: 14px; color: #6b7280">
            If the button doesn't work, copy and paste this URL:
          </p>
          <p
            style="
              font-size: 14px;
              color: #1e3a8a;
              word-break: break-all;
              text-align: center;
            "
          >
            ${URL}/api/public/emailverify/${emailToken}
          </p>
        </td>
      </tr>
      <tr>
        <td
          style="padding: 20px; text-align: center; background-color: #f3f4f6"
        >
          <p style="font-size: 12px; color: #6b7280">
            If you didn't request this email, you can safely ignore it.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`,
    });
    console.log(`${URL}/api/public/emailverify/${emailToken}`);

    res.status(201).json({
      msg: "User registered successfully. Please verify your email .",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    console.log(user);
    console.log(email, password);

    // Check if email is verified
    if (!user.userVerified.email) {
      return res
        .status(400)
        .json({ msg: "Please verify your email before logging in" });
    }

    // Check password validity
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1hr" });
    console.log(token);

    res.status(200).json({
      msg: "User Logged In Successfully",
      token,
      id: user._id,
      email,
      userVerified: user.userVerified,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Email verification Route
router.get("/emailverify/:token", async (req, res) => {
  try {
    const { token } = req.params;
    console.log(token);
    const user = await userModel.findOne({ "userVerifiedToken.email": token });
    console.log(user);
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email verification token" });
    }
    // Mark email as verified
    user.userVerified.email = true;
    user.userVerifiedToken.email = null;
    await user.save();
    res.status(200).json({ message: "Email Verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/resetpassword", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Please provide an email." });
    }
    const user = await userModel.findOne({ email });
    console.log(user);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found. Please register." });
    }
    let newPassword = Math.random().toString(36).slice(-8);
    console.log(newPassword);
    let hashPass = await bcrypt.hash(newPassword, 10);
    console.log(hashPass);
    user.password = hashPass;
    await user.save();

    console.log(user);

    let emailData = {
      to: email,
      subject: "Password Reset Request",
      html: `<p>Your new password is: <strong>${newPassword}</strong></p>`,
    };
    await sendMail(emailData);

    return res
      .status(200)
      .json({ message: "New password sent to your email." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/sendplan", async (req, res) => {
  try {
    const { email, plan } = req.body;
    if (!email || !plan) {
      return res.status(400).json({ message: "Plan not found" });
    }

    // Convert line breaks into HTML paragraphs or line breaks
    let formattedPlan = plan
      .split("\n")
      .map((line) => (line.trim() ? `<p>${line}</p>` : "<br>"))
      .join("");

    let planData = {
      to: email,
      subject: "Your Workout Plan",
      html: `
        <div style="font-size: 16px; line-height: 1.6; font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #007bff;">Your Personalized Workout Plan</h2>
          ${formattedPlan}
        </div>
      `,
    };

    await sendMail(planData);
    res.status(200).json({ message: "Plan sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
