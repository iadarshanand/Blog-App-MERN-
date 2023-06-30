const Blog = require("../models/blog");
const User = require("../models/user");

const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find().populate("user");
  } catch (e) {
    return console.log(e.message);
  }

  if (!blogs) {
    return res.status(404).json({
      message: "UnExpected Error there",
    });
  }

  //otherwise
  return res.status(200).json({ blogs });
};

const getMyBlog = async (req, res, next) => {
  let blogs;
  const id = req.params.id;
  try {
    blogs = await User.findById(id).populate("blogs");
  } catch (e) {
    return console.log(e.message);
  }
  if (!blogs) {
    return res.status(404).json({
      message: "UnExpected Error there",
    });
  }
  const myBlogs = blogs.blogs;
  return res.status(200).json({ myBlogs });
};

const addBlog = async (req, res, next) => {
  const { title, description, img, user } = req.body;
  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (e) {
    return console.log(e.message);
  }
  if (!existingUser)
    return res.status(400).json({ message: "Unable to find this user Id" });

  const newBlog = new Blog({
    title,
    description,
    img,
    user,
  });

  try {
    await newBlog.save();
    console.log(existingUser);
    existingUser.blogs.push(newBlog);
    await existingUser.save();
  } catch (e) {
    return console.log(e.message);
  }
  return res.status(200).json({ newBlog });
};

const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const id = req.params.id;
  console.log(title, description, id);
  let updatedBlog;
  try {
    updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },
      { new: true }
    );
  } catch (e) {
    return console.log(e.message);
  }

  if (!updatedBlog)
    return res.status(404).json({ message: "Unable to update blog" });
  return res.status(200).json({ updatedBlog });
};

const getBlog = async (req, res, next) => {
  const id = req.params.id;
  // console.log(id);
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (e) {
    return console.log(e.message);
  }

  if (!blog)
    return res.status(404).json({
      message: "Unable to get blog",
    });

  return res.status(200).json({
    blog,
  });
};

const deleteBlog = async (req, res, next) => {
  const id = req.params.id;

  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (e) {
    return console.log(e.message);
  }

  const userId = blog.user;
  const uId = userId.toString();
  console.log(userId);
  console.log(uId);
  let existingUser;
  try {
    existingUser = await User.findById(uId);
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }

  if (existingUser) {
    try {
      await existingUser.blogs.pull(blog.toObject());
      await existingUser.save();
    } catch (e) {
      return res.status(404).json({ message: e.message });
    }
  }

  let deletedBlog;
  try {
    deletedBlog = await Blog.findByIdAndDelete(id);
  } catch (e) {
    return console.log(e.message);
  }

  if (!deletedBlog)
    return res.status(404).json({
      message: "Unable to delete blog",
    });

  if (!existingUser) {
    console.log("Owner of this blog doesn't exist");
  }

  return res.status(200).json({
    success: "true",
    message: "Deleted Succesfully",
  });
};

module.exports = {
  getAllBlogs,
  addBlog,
  updateBlog,
  getBlog,
  deleteBlog,
  getMyBlog,
};
