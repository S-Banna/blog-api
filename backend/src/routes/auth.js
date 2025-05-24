const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const prisma = require("../lib/prisma");

const router = express.Router();

router.post("/register", async (req, res) => {
	const { username, password } = req.body;
	try {
		const hashed = await bcrypt.hash(password, 10);
		const user = await prisma.user.create({
			data: { username, password: hashed },
		});
		res.status(201).json({ message: "User created", userId: user.id });
	} catch (err) {
		res.status(400).json({ error: "Username may already exist" });
	}
});

router.post("/login", (req, res, next) => {
	passport.authenticate("local", { session: false }, (err, user) => {
		if (err || !user)
			return res.status(401).json({ message: "Invalid credentials" });

		const token = jwt.sign(
			{ id: user.id, username: user.username },
			process.env.JWT_SECRET
		);
		res.json({ token });
	})(req, res, next);
});

module.exports = router;
