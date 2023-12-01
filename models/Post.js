const { Schema, model } = require( "mongoose");

const PostSchema = new Schema(
  {
    title: { type: String, required: false },
    caption: { type: String, required: false },
    slug: { type: String, required: true, unique: true },
    body: { type: Object, required: false },
    photo: { type: String, required: false },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    tags: { type: [String] },
    categories: [{ type: Schema.Types.ObjectId, ref: "PostCategories" }],
    instructions: { type: [String], required: false }, 
    ingredients: { type: [String], required: false }, 
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

PostSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
});

const Post = model("Post", PostSchema);
module.exports = Post;