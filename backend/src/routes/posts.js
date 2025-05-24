const express = require("express");
const prisma = require("../lib/prisma");
const { ensureAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
	const sort = req.query.sort || "new";
	const orderBy =
		sort === "top" ? { likes: { _count: "desc" } } : { createdAt: "desc" };

	const posts = await prisma.post.findMany({
		orderBy,
		include: {
			_count: { select: { likes: true } },
		},
	});
	res.json(posts);
});

router.get("/:id", async (req, res) => {
	const post = await prisma.post.findUnique({
		where: { id: parseInt(req.params.id) },
		include: { likes: true },
	});
	if (!post) return res.status(404).json({ error: "Not found" });
	res.json(post);
});

router.post("/", ensureAuthenticated, async (req, res) => {
	if (req.user.username !== "Sari")
		return res.status(403).json({ message: "Forbidden" });

	const { title, content } = req.body;
	const post = await prisma.post.create({
		data: { title, content, user: { connect: { id: req.user.id } } },
	});
	res.status(201).json(post);
});

module.exports = router;
