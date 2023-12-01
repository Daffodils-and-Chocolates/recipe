const express = require("express");

const router = express.Router();
const {
	createPost,
	deletePost,
	getAllPosts,
	getPost,
	updatePost,
} = require("../controllers/postControllers");
const {
	authGuard,
	adminGuard,
	checkPostOwnership,
} = require("../middleware/authMiddleware");

router.route("/").post(authGuard, createPost).get(getAllPosts);
router
	.route("/:slug")
	.put(authGuard, checkPostOwnership, updatePost)
	.delete(authGuard, checkPostOwnership, deletePost)
	.get(getPost);

module.exports = router;
