const express = require("express");
const {
  getAllBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
  getBlog,
  getMyBlog,
} = require("../controllers/blogController");
const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.patch("/update/:id", updateBlog);
blogRouter.get("/:id", getBlog);
blogRouter.delete("/:id", deleteBlog);
blogRouter.get("/:id/myblogs",getMyBlog);
module.exports = blogRouter;
