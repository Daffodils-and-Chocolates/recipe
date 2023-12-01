const express = require('express');

const router = express.Router();
const {
  createComment,
  deleteComment,
  updateComment,
} = require( "../controllers/commentControllers");
const { authGuard } = require( "../middleware/authMiddleware");

router.post("/", authGuard, createComment);
router
  .route("/:commentId")
  .put(authGuard, updateComment)
  .delete(authGuard, deleteComment);

module.exports = router;