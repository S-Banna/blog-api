const express = require("express");
const prisma = require("../lib/prisma");
const { ensureAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.post("/:postId", ensureAuthenticated, async (req, res) => {
	const postId = parseInt(req.params.postId);
	try {
		await prisma.like.create({
			data: {
				userId: req.user.id,
				postId,
			},
		});
		res.status(201).json({ message: "Liked" });
	} catch {
		res.status(400).json({ message: "Already liked or error occurred" });
	}
});

router.delete("/:postId", ensureAuthenticated, async (req, res) => {
	const postId = parseInt(req.params.postId);
	try {
		await prisma.like.delete({
			where: {
				userId_postId: {
					userId: req.user.id,
					postId,
				},
			},
		});
		res.status(200).json({ message: "Unliked" });
	} catch {
		res.status(400).json({ message: "Like not found" });
	}
});

module.exports = router;
