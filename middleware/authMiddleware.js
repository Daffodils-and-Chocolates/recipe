const {verify} = require("jsonwebtoken")
const User = require('../models/user');
const Post = require('../models/Post');

const authGuard = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const { id } = verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(id).select("-password");
      next();
    } catch (error) {
      let err = new Error("Not authorized, Token failed");
      err.statusCode = 401;
      next(err);
    }
  } else {
    let error = new Error("Not authorized, No token");
    error.statusCode = 401;
    next(error);
  }
};

const adminGuard = (req, res, next) => {
  if (req.user && req.user.admin) {
    next();
  } else {
    let error = new Error("Not authorized as an admn");
    error.statusCode = 401;
    next(error);
  }
};

const checkPostOwnership = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) {
      const error = new Error("Post not found");
      error.status = 404;
      throw error;
    }

    // Check if the logged-in user is the owner of the post
    if (post.user.equals(req.user._id)) {
      // The user is the owner, proceed to the next middleware
      next();
    } else {
      // The user is not the owner, throw an error
      const error = new Error("You are not authorized to edit or delete this post");
      error.status = 403; // Forbidden
      throw error;
    }
  } catch (error) {
    next(error);
  }
};


module.exports = {authGuard, adminGuard , checkPostOwnership};