const express = require("express");
const prisma = require("../lib/prisma");
const { ensureAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.post("/:postId", ensureAuthenticated, async (req, res) => {
	const postId = parseInt(req.params.postId);
	try {
		await prisma.postLike.create({
			data: {
				user: { connect: { id: req.user.id } },
				post: { connect: { id: postId } },
			},
		});
		res.status(201).json({ message: "Liked" });
	} catch {
		res.status(400).json({ message: "Already liked or error occurred" });
	}
});

router.delete("/:postId", ensureAuthenticated, async (req, res) => {
	const postId = parseInt(req.params.postId);

	if (isNaN(postId)) {
		return res.status(400).json({ message: "Invalid post ID" });
	}

	try {
		const existingLike = await prisma.postLike.findUnique({
			where: {
				postId_userId: {
					userId: req.user.id,
					postId: postId,
				},
			},
		});

		if (!existingLike) {
			return res.status(404).json({ message: "Like not found" });
		}

		await prisma.postLike.delete({
			where: {
				postId_userId: {
					userId: req.user.id,
					postId: postId,
				},
			},
		});

		return res.status(200).json({ message: "Unliked successfully" });
	} catch (error) {
		console.error("Unlike error:", error);
		return res.status(500).json({
			message: "Internal server error",
			error: error.message,
		});
	}
});

module.exports = router;
