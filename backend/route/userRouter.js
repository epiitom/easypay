const express = require("express");
const zod = require("zod");
const router = express.Router();
const { JWT_SECRET } = require("./cong");
const jwt = require("jsonwebtoken");
const User = require("./models/User"); // Assuming you have a User model

// ✅ Sign-up Schema
const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
});

// ✅ Sign-in Schema
const signinSchema = zod.object({
    username: zod.string(),
    password: zod.string()
});

// ✅ Sign-up Route
router.post("/signup", async (req, res) => {
    const body = req.body;
    const { success } = signupSchema.safeParse(body);

    if (!success) {
        return res.status(400).json({ message: "Invalid input data" });
    }

    const existingUser = await User.findOne({ username: body.username });

    if (existingUser) {
        return res.status(409).json({ message: "Email already taken" });
    }

    const user = await User.create({
        username: body.username,
        password: body.password,
        firstName: body.firstName,
        lastName: body.lastName
    });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    });
});

// ✅ Sign-in Route
router.post("/signin", async (req, res) => {
    const body = req.body;
    const { success } = signinSchema.safeParse(body);

    if (!success) {
        return res.status(400).json({ message: "Invalid input data" });
    }

    const user = await User.findOne({ username: body.username });

    if (!user || user.password !== body.password) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    res.json({
        message: "Sign-in successful",
        token: token
    });
});

module.exports = router;
