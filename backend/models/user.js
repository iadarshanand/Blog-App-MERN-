const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
  },
  blogs: [{ type: mongoose.Types.ObjectId, ref: "Blog" }],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
