const express = require("express");
const prisma = require("../lib/prisma");
const { ensureAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.post("/:postId", ensureAuthenticated, async (req, res) => {
	const postId = parseInt(req.params.postId);
	const { content } = req.body;

	const comment = await prisma.comment.create({
		data: {
			content,
			postId,
			userId: req.user.id,
		},
	});
	res.status(201).json(comment);
});

router.get("/:postId", async (req, res) => {
	const postId = parseInt(req.params.postId);

	const comments = await prisma.comment.findMany({
		where: { postId },
		orderBy: { createdAt: "asc" },
		include: {
			user: { select: { username: true } },
		},
	});
	res.json(comments);
});

module.exports = router;
